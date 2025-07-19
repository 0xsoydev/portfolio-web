import { NextResponse } from 'next/server'
import { Octokit } from 'octokit'

// Enhanced event type with metadata for deduplication
type EnhancedEvent = any & {
    _meta?: {
        commitSha: string
        repoName: string
        timestamp: string
    }
}

export async function GET() {
    try {
        // Check if GitHub token is available
        if (!process.env.GITHUB_PAT) {
            return NextResponse.json(
                { error: 'GitHub authentication not configured' },
                { status: 500 }
            )
        }

        // Initialize Octokit with the auth token
        const octokit = new Octokit({
            auth: process.env.GITHUB_PAT
        })

        // Get the authenticated user's username first
        const { data: user } = await octokit.rest.users.getAuthenticated()
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`\n🔄 Fetching GitHub activity for ${user.login}...`)
        }

        // Fetch from multiple sources in parallel for better performance
        const allEvents: EnhancedEvent[] = []

        try {
            // Run all initial API calls in parallel
            const [publicEventsResult, userEventsResult, reposResult] = await Promise.allSettled([
                // 1. Public events (reduced from 100 to 50 for speed)
                octokit.rest.activity.listPublicEventsForUser({
                    username: user.login || '',
                    per_page: 50
                }),
                // 2. User's own events (reduced from 100 to 50 for speed)
                octokit.rest.activity.listEventsForAuthenticatedUser({
                    username: user.login || '',
                    per_page: 50
                }),
                // 3. Get user's repositories (reduced from 20 to 10)
                octokit.rest.repos.listForAuthenticatedUser({
                    sort: 'pushed',
                    per_page: 10,
                    affiliation: 'owner,collaborator'
                })
            ])

            // Process public events
            if (publicEventsResult.status === 'fulfilled') {
                allEvents.push(...publicEventsResult.value.data)
            }

            // Process user events
            if (userEventsResult.status === 'fulfilled') {
                allEvents.push(...userEventsResult.value.data)
            }

            // Process repositories with parallel commit fetching
            if (reposResult.status === 'fulfilled') {
                const repos = reposResult.value.data
                
                if (process.env.NODE_ENV === 'development') {
                    console.log(`📁 Found ${repos.length} repositories, checking top 5 for recent commits...`)
                }

                // Only check top 5 most recently pushed repos in parallel
                const commitPromises = repos.slice(0, 5).map(async (repo) => {
                    try {
                        const { data: commits } = await octokit.rest.repos.listCommits({
                            owner: repo.owner.login,
                            repo: repo.name,
                            author: user.login,
                            per_page: 3, // Reduced from 5 to 3
                            since: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // Last 14 days (reduced from 30)
                        })

                        // Convert commits to event-like objects
                        return commits.map(commit => ({
                            id: `commit-${commit.sha}`,
                            type: 'PushEvent',
                            created_at: commit.commit.author?.date || commit.commit.committer?.date,
                            repo: {
                                name: `${repo.owner.login}/${repo.name}`,
                                url: repo.html_url
                            },
                            payload: {
                                commits: [{
                                    message: commit.commit.message,
                                    sha: commit.sha
                                }]
                            },
                            // Add metadata for better deduplication
                            _meta: {
                                commitSha: commit.sha,
                                repoName: `${repo.owner.login}/${repo.name}`,
                                timestamp: commit.commit.author?.date || commit.commit.committer?.date
                            }
                        }))
                    } catch (error) {
                        // Skip repos we can't access
                        return []
                    }
                })

                // Wait for all commit fetches to complete in parallel
                const commitResults = await Promise.allSettled(commitPromises)
                
                // Add all successful results
                commitResults.forEach(result => {
                    if (result.status === 'fulfilled') {
                        allEvents.push(...result.value)
                    }
                })
            }

        } catch (error) {
            console.error('Error in parallel API calls:', error)
        }

        // Enhanced deduplication logic
        const uniqueEvents = []
        const seenKeys = new Set()
        
        for (const event of allEvents) {
            // Create multiple potential deduplication keys
            let dedupeKey = ''
            
            if (event.type === 'PushEvent') {
                // For push events, try to extract commit info for better deduplication
                const payload = event.payload as any
                const commitSha = event._meta?.commitSha || 
                                 payload?.commits?.[0]?.sha ||
                                 payload?.head
                
                const repoName = event.repo?.name
                const timestamp = event.created_at
                
                if (commitSha && repoName) {
                    // Use commit SHA + repo for deduplication
                    dedupeKey = `push-${commitSha}-${repoName}`
                } else if (timestamp && repoName) {
                    // Fallback to timestamp + repo (rounded to nearest minute to catch near-duplicates)
                    const roundedTime = Math.floor(new Date(timestamp).getTime() / (1000 * 60))
                    dedupeKey = `push-${roundedTime}-${repoName}`
                } else {
                    // Last resort: use event ID
                    dedupeKey = event.id || `fallback-${Date.now()}-${Math.random()}`
                }
            } else {
                // For non-push events, use the original logic
                dedupeKey = event.id || `${event.type}-${event.created_at}-${event.repo?.name}`
            }
            
            if (!seenKeys.has(dedupeKey)) {
                seenKeys.add(dedupeKey)
                // Remove the _meta property before adding to final results
                const cleanEvent = { ...event }
                delete cleanEvent._meta
                uniqueEvents.push(cleanEvent)
            }
        }

        // Sort by date (most recent first)
        const sortedEvents = uniqueEvents.sort((a, b) => {
            const dateA = new Date(a.created_at || 0).getTime()
            const dateB = new Date(b.created_at || 0).getTime()
            return dateB - dateA
        })

        if (process.env.NODE_ENV === 'development') {
            const recentRepos = new Set(sortedEvents.slice(0, 10).map(e => e.repo?.name))
            console.log(`✅ Found ${sortedEvents.length} total events from ${recentRepos.size} repos`)
        }

        // Filter for meaningful contribution types
        const meaningfulEvents = sortedEvents.filter(event => {
            if (!event.type) return false
            
            const includedTypes = [
                'PushEvent', 
                'PullRequestEvent', 
                'IssuesEvent', 
                'CreateEvent', 
                'ReleaseEvent',
                'ForkEvent',
                'WatchEvent',
                'PublicEvent'
            ]
            
            return includedTypes.includes(event.type)
        })

        // Strategy: Show the 5 most recent activities in chronological order
        const finalEvents = meaningfulEvents.slice(0, 5)

        if (process.env.NODE_ENV === 'development') {
            const mostRecent = finalEvents[0]
            if (mostRecent) {
                const timeAgo = Math.round((Date.now() - new Date(mostRecent.created_at || 0).getTime()) / (1000 * 60))
                console.log(`🚀 Returning ${finalEvents.length} events (most recent: ${timeAgo}m ago in ${mostRecent.repo?.name})\n`)
            }
        }

        // Add cache headers to prevent stale data
        const response = NextResponse.json({ contributions: finalEvents })
        response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
        
        return response
    } catch (error) {
        // Log error in development only
        if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching recent contributions:', error)
        }
        
        return NextResponse.json(
            { error: 'Failed to fetch recent contributions' },
            { status: 500 }
        )
    }
} 