import { z } from "zod";
import { ConnectionProviderProps } from "@/providers/connections-provider";

export const EditUserProfileSchema = z.object({
    name : z.string().min(1,'Required'),
    email : z.string().email('Required'),
})

export const WorkflowFormSchema = z.object({
    name : z.string().min(1,'Required'),
    description : z.string().min(1,'Required'),
})

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
    title : ConnectionTypes,
    description : string,
    image : string,
    connectionKey : keyof ConnectionProviderProps,
    accessTokenKey ?: string,
    alwaysTrue ?: boolean,
    slackSpecial ?: boolean,
}
