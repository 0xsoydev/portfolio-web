import { NextResponse } from 'next/server'
import { Octokit } from 'octokit'

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
        
        // Fetch recent public events for the user
        const { data: events } = await octokit.rest.activity.listPublicEventsForUser({
            username: user.login || '',
            per_page: 50 // Get more to filter for meaningful contributions
        })

        // Filter for meaningful contribution types and take the 5 most recent
        const meaningfulEvents = events.filter(event => 
            event.type && ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent', 'ReleaseEvent'].includes(event.type)
        ).slice(0, 5)

        return NextResponse.json({ contributions: meaningfulEvents })
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