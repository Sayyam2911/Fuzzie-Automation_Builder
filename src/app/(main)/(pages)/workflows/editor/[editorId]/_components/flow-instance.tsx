'use client';
import React, {useCallback, useEffect, useState} from 'react'
import {usePathname} from "next/navigation";
import {useNodeConnections} from "@/providers/connections-provider";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {onCreateNodeEdges, onFlowPublish} from "@/app/(main)/(pages)/workflows/editor/[editorId]/_actions/workflow-connections";

type Props = {
    children : React.ReactNode
    nodes : any[],
    edges : any[]
}

const FlowInstance = ({children,nodes,edges}: Props) => {
    const pathName = usePathname()
    const [isFlow, setFlow] = useState([])
    const {nodeConnection} = useNodeConnections()

    const onFlowAutomation = useCallback(async() => {
        const flow = await onCreateNodeEdges(
            pathName.split('/').pop()!,
            JSON.stringify(nodes),
            JSON.stringify(edges),
            JSON.stringify(isFlow)
        )
        if(flow) toast.message(flow.message)
    },[nodeConnection])

    const onPublishWorkflow = useCallback(async() => {
        const response = await onFlowPublish(pathName.split('/').pop()!,true)
        if(response) toast.message(response.message)
    },[])

    const onAutomateFlow = async() => {
        const flow : any = []
        const connectedEdges = edges.map((edge) => edge.target)
        connectedEdges.map((target) => {
            nodes.forEach((node) => {
                if(node.id === target) flow.push(node.type)
            })
        })
        setFlow(flow)
    }

    useEffect(() => {
        onAutomateFlow()
    }, [edges]);

    return <div className={"flow flow-col gap-2"}>
        <div className={"flex gap-3 p-4"}>
            <Button
                onClick={onFlowAutomation}
                disabled={isFlow.length === 0}
            >
                Save
            </Button>
            <Button
                onClick={onPublishWorkflow}
                disabled={isFlow.length === 0}
            >
                Publish
            </Button>
        </div>
        {children}
    </div>
}

export default FlowInstance