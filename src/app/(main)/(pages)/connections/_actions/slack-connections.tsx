'use server'
import { db } from '@/lib/db'
import {currentUser} from "@clerk/nextjs/server";

export const onSlackConnect = async (
    app_id: string,
    authed_user_id: string,
    authed_user_token: string,
    slack_access_token: string,
    bot_user_id: string,
    team_id: string,
    team_name: string,
    user_id: string
): Promise<void> => {
    if (!slack_access_token) return

    const slackConnection = await db.slack.findFirst({
        where: { slackAccessToken: slack_access_token },
        include: { connections: true },
    })

    if (!slackConnection) {
        await db.slack.create({
            data: {
                userId: user_id,
                appId: app_id,
                authedUserId: authed_user_id,
                authedUserToken: authed_user_token,
                slackAccessToken: slack_access_token,
                botUserId: bot_user_id,
                teamId: team_id,
                teamName: team_name,
                connections: {
                    create: { userId: user_id, type: 'Slack' },
                },
            },
        })
    }
}

export const getSlackConnection = async () => {
    const user = await currentUser()
    if (user) {
        return await db.slack.findFirst({
            where: { userId: user.id },
        })
    }
    return null
}