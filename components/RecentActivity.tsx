import { useState, useEffect, useRef } from "react"

interface GitHubEvent {
    id: string
    type: string | null
    repo: {
        name: string
        url: string
    }
    created_at: string | null
    payload: {
        commits?: Array<{
            message?: string
        }>
        pull_request?: {
            title?: string
        }
        issue?: {
            title?: string
        }
        action?: string
        ref_type?: string
        ref?: string
        release?: {
            name?: string
            tag_name?: string
        }
    }
}

const RecentActivity = () => {
    const [recentContributions, setRecentContributions] = useState<GitHubEvent[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)
    const isRequestInProgressRef = useRef(false)

    const fetchRecentContributions = async () => {
        // Prevent multiple simultaneous requests
        if (isRequestInProgressRef.current) {
            console.log('Request already in progress, skipping...')
            return
        }

        try {
            // Cancel any existing request
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }

            // Create new abort controller
            abortControllerRef.current = new AbortController()
            isRequestInProgressRef.current = true

            setLoading(true)
            setError(null)
            
            // Add timestamp to prevent caching
            const timestamp = Date.now()
            const response = await fetch(`/api/recent-activity?t=${timestamp}`, {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache'
                },
                signal: abortControllerRef.current.signal
            })
            
            if (!response.ok) {
                throw new Error('Failed to fetch recent contributions')
            }
            
            const data = await response.json()
            
            if (data.error) {
                throw new Error(data.error)
            }
            
            setRecentContributions(data.contributions || [])
        } catch (err) {
            // Don't set error if request was aborted
            if (err instanceof Error && err.name === 'AbortError') {
                console.log('Request was aborted')
                return
            }

            // Log error in development only
            if (process.env.NODE_ENV === 'development') {
                console.error('Error fetching recent contributions:', err)
            }
            setError('Failed to fetch recent contributions')
        } finally {
            setLoading(false)
            isRequestInProgressRef.current = false
        }
    }

    useEffect(() => {
        fetchRecentContributions()

        // Cleanup function to abort any ongoing requests
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
            isRequestInProgressRef.current = false
        }
    }, [])



    const formatEventDescription = (event: GitHubEvent) => {
        if (!event.type) return 'Unknown activity'
        
        switch (event.type) {
            case 'PushEvent':
                const commits = event.payload.commits || []
                if (commits.length > 0) {
                    // Get the most recent commit message
                    const latestCommit = commits[commits.length - 1]
                    const message = latestCommit.message || 'No commit message'
                    // Truncate long commit messages
                    return message.length > 80 ? `${message.substring(0, 80)}...` : message
                }
                return `Pushed ${commits.length} commit${commits.length !== 1 ? 's' : ''}`
            case 'PullRequestEvent':
                const prTitle = event.payload.pull_request?.title
                if (prTitle) {
                    return prTitle.length > 80 ? `${prTitle.substring(0, 80)}...` : prTitle
                }
                return `${event.payload.action} pull request`
            case 'IssuesEvent':
                const issueTitle = event.payload.issue?.title
                if (issueTitle) {
                    return issueTitle.length > 80 ? `${issueTitle.substring(0, 80)}...` : issueTitle
                }
                return `${event.payload.action} issue`
            case 'CreateEvent':
                return `Created ${event.payload.ref_type}${event.payload.ref ? `: ${event.payload.ref}` : ''}`
            case 'ReleaseEvent':
                const releaseName = event.payload.release?.name || event.payload.release?.tag_name
                if (releaseName) {
                    return `Released ${releaseName}`
                }
                return `${event.payload.action} release`
            case 'ForkEvent':
                return `Forked repository`
            case 'WatchEvent':
                return `Starred repository`
            case 'PublicEvent':
                return `Made repository public`
            default:
                return event.type.replace('Event', '')
        }
    }

    if (loading) {
        return (
            <div>
                <h3 className="font-lexend text-lg md:text-2xl mb-6 font-medium text-white">Recent Activity</h3>
                <div className="space-y-3">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="animate-pulse bg-neutral-800 rounded-lg p-4">
                            <div className="h-4 bg-neutral-700 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-neutral-700 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h3 className="font-lexend text-lg md:text-2xl mb-6 font-medium text-white">Recent Activity</h3>
                <p className="text-red-400 text-sm font-lexend">{error}</p>
            </div>
        )
    }

    return (
        <div>
            <h3 className="font-lexend text-lg md:text-2xl mb-6 font-medium">Recent Activity</h3>
            <div className="space-y-3">
                {recentContributions.map((event) => (
                    <div key={event.id} className="bg-neutral-900 rounded-lg p-4 hover:bg-neutral-800 transition-colors">
                        <div className="flex items-center justify-between">
                            <p className="text-xs md:text-sm font-lexend text-neutral-100">
                                {formatEventDescription(event)}
                            </p>
                            <a 
                                href={`https://github.com/${event.repo.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors font-lexend ml-4"
                            >
                                {event.repo.name}
                            </a>
                        </div>
                    </div>
                ))}
                {recentContributions.length === 0 && (
                    <p className="text-neutral-400 text-sm font-lexend">No recent contributions found.</p>
                )}
            </div>
        </div>
    )
}

export default RecentActivity