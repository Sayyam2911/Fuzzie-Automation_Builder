import React from "react";
import {CONNECTIONS} from "@/lib/constant";
import ConnectionCard from "@/app/(main)/(pages)/connections/_components/connection-card";
import {currentUser} from "@clerk/nextjs/server";
import {onDiscordConnect} from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import {onNotionConnect} from "@/app/(main)/(pages)/connections/_actions/notion-connections";
import {onSlackConnect} from "@/app/(main)/(pages)/connections/_actions/slack-connections";
import {getUserData} from "@/app/(main)/(pages)/connections/_actions/get-user";
//import onDiscordConnect from "@/app/(main)/(pages)/connections/_actions/discord-connection";

type ConnectionsProps = {
    searchParams ?: {[key : string] : string | undefined}
}

const Connections = async (props : ConnectionsProps) => {

    const {
        webhook_id,
        webhook_name,
        webhook_url,
        guild_id,
        guild_name,
        channel_id,
        access_token,
        workspace_name,
        workspace_icon,
        workspace_id,
        database_id,
        app_id,
        authed_user_id,
        authed_user_token,
        slack_access_token,
        bot_user_id,
        team_id,
        team_name,
    } = props.searchParams ?? {
        webhook_id: '',
        webhook_name: '',
        webhook_url: '',
        guild_id: '',
        guild_name: '',
        channel_id: '',
        access_token: '',
        workspace_name: '',
        workspace_icon: '',
        workspace_id: '',
        database_id: '',
        app_id: '',
        authed_user_id: '',
        authed_user_token: '',
        slack_access_token: '',
        bot_user_id: '',
        team_id: '',
        team_name: '',
    }

    const user = await currentUser()
    if(!user) return null;

    const onUserConnections = async () => {
        console.log(database_id)
        await onDiscordConnect(
            channel_id!,
            webhook_id!,
            webhook_name!,
            webhook_url!,
            user.id,
            guild_name!,
            guild_id!
        )
        await onNotionConnect(
            access_token!,
            workspace_id!,
            workspace_icon!,
            workspace_name!,
            database_id!,
            user.id
        )

        await onSlackConnect(
            app_id!,
            authed_user_id!,
            authed_user_token!,
            slack_access_token!,
            bot_user_id!,
            team_id!,
            team_name!,
            user.id
        )

        const connections :any = {}
        const user_info = await getUserData(user.id)

        //Remaining Connections through User Database
        user_info?.connections.map((connection) => {
            connections[connection.type] = true
            return (connections[connection.type] = true)
        })

        //Google Drive Connection
        return {...connections, 'Google Drive' : true}
    }

    const connections = await onUserConnections()

    return <div className="flex flex-col gap-4 relative">
        <h1 className="text-2xl sticky top-0 z-[10] p-3.5 bg-background/50 backdrop-blur-lg flex items-center border-b">
            Connections
        </h1>
        <div className={"relative flex flex-col gap-6"}>
            <section className={"flex gap-5 py-3 px-4 text-muted-foreground flex-wrap"}>
                Connect all your apps directly from here. You may need to connect
                these apps regularly to refresh verification
                {CONNECTIONS.map((connection, index) => {
                    return <ConnectionCard title={connection.title}
                                           icon={connection.image}
                                           description={connection.description}
                                           key={connection.title}
                                           type={connection.title}
                                           connected={connections}
                    />
                })}
            </section>
        </div>
    </div>
}

export default Connections