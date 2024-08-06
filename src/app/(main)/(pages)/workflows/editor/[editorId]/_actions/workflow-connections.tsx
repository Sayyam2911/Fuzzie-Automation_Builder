"use server";
import {db} from "@/lib/db";

export const onCreateNodeEdges = async (
    flowId : string,
    nodes : string,
    edges : string,
    flowPath : string
) => {
    const flow = await db.workflows.update({
        where : {
            id : flowId
        },
        data : {
            nodes : nodes,
            edges : edges,
            flowPath : flowPath
        }
    })
    if(flow) return {message : 'Flow Updated Successfully'}
}

export const onFlowPublish = async (flowId : string, status : boolean) => {
    const flow = await db.workflows.update({
        where : {
            id : flowId
        },
        data : {
            publish : status
        }
    })
    if(flow.publish) return {message : 'Workflow Published Successfully'}
    else return {message : 'Workflow Unpublished'}
}