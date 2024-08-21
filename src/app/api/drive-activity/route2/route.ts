import { google } from 'googleapis'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.OAUTH2_REDIRECT_URI
    )

    // Hardcode userId for testing
    const userId = 'user_2kqXqjxq0YTJCwTVoU8h9dRYx11'
    console.log('userId:', userId) // Add logging to check the value of userId
    if (!userId) {
        return NextResponse.json({ message: 'User not found' })
    }

    try {
        const clerkResponse: any = await clerkClient.users.getUserOauthAccessToken(
            userId,
            'oauth_google'
        )
        const accessToken = clerkResponse.data[0].token
        oauth2Client.setCredentials({
            access_token: accessToken,
        })

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client,
        })

        // Fetch all channels from the database
        const channels = await db.user.findMany({
            where: {
                clerkId: userId,
            },
            select: {
                googleResourceId: true,
            },
        })

        // Stop each channel
        for (const channel of channels) {
            await drive.channels.stop({
                requestBody: {
                    id: channel.googleResourceId,
                    resourceId: channel.googleResourceId,
                },
            })
        }

        // Remove all channels from the database
        await db.user.updateMany({
            where: {
                clerkId: userId,
            },
            data: {
                googleResourceId: null,
            },
        })

        console.log("Removal Complete")
        return new NextResponse('All listeners removed')
    } catch (error) {
        console.error('Error:', error.message)
        console.error('Stack:', error.stack)
        return new NextResponse('Error removing listeners', { status: 500 })
    }
}