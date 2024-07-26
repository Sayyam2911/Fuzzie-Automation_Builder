import React from "react";

export type ConnectionProviderProps = {
    discordNode: {
    }
    setDiscordNode: React.Dispatch<React.SetStateAction<any>>
    googleNode: {}[]
    setGoogleNode: React.Dispatch<React.SetStateAction<any>>
    notionNode: {
    }
    workflowTemplate: {
    }
    setNotionNode: React.Dispatch<React.SetStateAction<any>>
    slackNode: {

    }
    setSlackNode: React.Dispatch<React.SetStateAction<any>>
}