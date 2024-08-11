import {EditorCanvasCardType} from "@/lib/types";
import {ConnectionProviderProps} from "@/providers/connections-provider";
import React from "react";
import {EditorState} from "@/providers/editor-provider";
import {getDiscordConnectionUrl} from "@/app/(main)/(pages)/connections/_actions/discord-connection";
import {getNotionConnection, getNotionDatabase} from "@/app/(main)/(pages)/connections/_actions/notion-connections";
import {getSlackConnection, listBotChannels} from "@/app/(main)/(pages)/connections/_actions/slack-connections";
import {Option} from "@/store";

export const onDragStart = (
    event: any,
    nodeType: EditorCanvasCardType['type']
) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
}

export const onSlackContent = (
    nodeConnection : ConnectionProviderProps,
    event : React.ChangeEvent<HTMLInputElement>
) => {
    nodeConnection.setSlackNode((prev : any) => ({
        ...prev,
            content:event.target.value
    }))
}

export const onDiscordContent = (
    nodeConnection : ConnectionProviderProps,
    event : React.ChangeEvent<HTMLInputElement>
) => {
    nodeConnection.setDiscordNode((prev : any) => ({
        ...prev,
        content:event.target.value
    }))
}

export const onContentChange = (
    nodeConnection : ConnectionProviderProps,
    nodeType : string,
    event : React.ChangeEvent<HTMLInputElement>
) => {
    if(nodeType === 'Slack'){
        onSlackContent(nodeConnection, event)
    }
    else if(nodeType === 'Discord'){
        onDiscordContent(nodeConnection,event);
    }
}

export const onAddSlackTemplate = (
    nodeConnection : ConnectionProviderProps,
    template : string
) => {
    nodeConnection.setSlackNode((prev : any) => ({
        ...prev,
        content: `${prev.content} ${template}`
    }))
}

export const onAddDiscordTemplate = (
    nodeConnection : ConnectionProviderProps,
    template : string
) => {
    nodeConnection.setDiscordNode((prev : any) => ({
        ...prev,
        content: `${prev.content} ${template}`
    }))
}

export const onAddTemplate = (
    nodeConnection : ConnectionProviderProps,
    title : string,
    template : string
) => {
    if(title === 'Slack'){
        onAddSlackTemplate(nodeConnection, template)
    }
    else if(title === 'Discord'){
        onAddDiscordTemplate(nodeConnection, template)
    }
}

export const onConnections = async (
    nodeConnection: ConnectionProviderProps,
    editorState: EditorState,
    googleFile: any
) => {
    if (editorState.editor.selectedNode.data.title == 'Discord') {
        const connection = await getDiscordConnectionUrl()
        if (connection) {
            nodeConnection.setDiscordNode({
                webhookURL: connection.url,
                content: '',
                webhookName: connection.name,
                guildName: connection.guildName,
            })
        }
    }
    if (editorState.editor.selectedNode.data.title == 'Notion') {
        const connection = await getNotionConnection()
        if (connection) {
            nodeConnection.setNotionNode({
                accessToken: connection.accessToken,
                databaseId: connection.databaseId,
                workspaceName: connection.workspaceName,
                content: {
                    name: googleFile.name,
                    kind: googleFile.kind,
                    type: googleFile.mimeType,
                },
            })

            if (nodeConnection.notionNode.databaseId !== '') {
                const response = await getNotionDatabase(
                    nodeConnection.notionNode.databaseId,
                    nodeConnection.notionNode.accessToken
                )
            }
        }
    }
    if (editorState.editor.selectedNode.data.title == 'Slack') {
        const connection = await getSlackConnection()
        if (connection) {
            nodeConnection.setSlackNode({
                appId: connection.appId,
                authedUserId: connection.authedUserId,
                authedUserToken: connection.authedUserToken,
                slackAccessToken: connection.slackAccessToken,
                botUserId: connection.botUserId,
                teamId: connection.teamId,
                teamName: connection.teamName,
                userId: connection.userId,
                content: '',
            })
        }
    }
}

export const fetchBotSlackChannels = async (
    token : string,
    setSlackChannels : (slackChannels : Option[]) => void
) => {
    await listBotChannels(token)?.then((channels) => setSlackChannels(channels))
}