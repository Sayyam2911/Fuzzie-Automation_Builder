import { z } from "zod";
import { ConnectionProviderProps } from "@/providers/connections-provider";
import {element} from "prop-types";

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

export type EditorCanvasType = 'Email' | 'Condition' | 'AI' | 'Slack' | 'Google Drive' | 'Notion' | 'Custom Webhook' | 'Google Calender' | 'Trigger' | 'Action' | 'Wait';

export type EditorCanvasCardType = {
    title : string,
    description : string,
    completed : boolean,
    current : boolean,
    metadata : any,
    type : EditorCanvasType;
}

export type EditorNodeType = {
    id : string;
    type : EditorCanvasCardType['type'];
    position : {
        x : number,
        y : number,
    };
    data : EditorCanvasCardType;
}

export type EditorNode = EditorNodeType;

export type EditorActions =
   | {
        type : 'LOAD_DATA'
            payload : {
                elements : EditorNode[]
                edges : {
                    id : string
                    source : string
                    target : string
                }[]
            }
        }
    | {
       type : 'UPDATE_NODE'
              payload : {
                elements : EditorNode[]
              }
    } | { type : 'REDO'}
    | { type : 'UNDO'}
    | { type : 'SELECTED_ELEMENT'
    payload : { element : EditorNode}
}

