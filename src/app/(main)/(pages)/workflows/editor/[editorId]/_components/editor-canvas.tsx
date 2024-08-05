'use client';
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges, Background, Connection, Controls,
    Edge,
    EdgeChange, MiniMap,
    NodeChange,
    ReactFlow,
    ReactFlowInstance
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {EditorCanvasCardType, EditorCanvasType, EditorNodeType} from "@/lib/types";
import {useEditor} from "@/providers/editor-provider";
import {useCallback, useMemo, useState} from "react";
import EditorCanvasCardSingle
    from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/editor-canvas-card-single";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import {toast} from "sonner";
import {usePathname} from "next/navigation";
import {v4} from 'uuid'
import {EditorCanvasDefaultCardTypes} from "@/lib/constant";

const InitialNodes : EditorNodeType[] = []
const InitialEdges : {id : string, source : string, target : string}[] = []

const EditorCanvas = () => {
    const {state,dispatch} = useEditor();
    const [nodes, setNodes] = useState<EditorNodeType[]>(InitialNodes)
    const [edges, setEdges] = useState<{id : string, source : string, target : string}[]>(InitialEdges)
    const [isWorkflowLoading, setIsWorkflowLoading] = useState<boolean>(false)
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>();
    const pathName = usePathname()

    const nodeTypes = useMemo(
        () => ({
            Action: EditorCanvasCardSingle,
            Trigger: EditorCanvasCardSingle,
            Email: EditorCanvasCardSingle,
            Condition: EditorCanvasCardSingle,
            AI: EditorCanvasCardSingle,
            Slack: EditorCanvasCardSingle,
            'Google Drive': EditorCanvasCardSingle,
            Notion: EditorCanvasCardSingle,
            Discord: EditorCanvasCardSingle,
            'Custom Webhook': EditorCanvasCardSingle,
            'Google Calendar': EditorCanvasCardSingle,
            Wait: EditorCanvasCardSingle,
        }),
        []
    );

    const onNodesChange = useCallback((changes : NodeChange[]) => {
        //@ts-ignore
        setNodes((nds) => {applyNodeChanges(changes,nds)})
    },[setNodes])

    const onEdgesChange = useCallback((changes : EdgeChange[]) => {
        //@ts-ignore
        setEdges((eds) => {applyEdgeChanges(changes,eds)})
    },[setEdges])

    const onConnect = useCallback((params: Edge | Connection) => {
        setEdges((eds) => addEdge(params, eds))
    }, [])

    const onDragOver = useCallback((event : any) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
    },[])

    const onDrop = useCallback((event : any) => {
        event.preventDefault()
        const type : EditorCanvasCardType['type'] = event.dataTransfer.getData('application/reactflow')

        if(typeof type === undefined || !type){
            return;
        }

        const triggerAlreadyExists = state.editor.elements.find((node) => node.type === 'Trigger')

        if(type === 'Trigger' && triggerAlreadyExists){
            toast("Only One Trigger Can Be Added To Automations At The Moment")
            return;
        }

        if(!reactFlowInstance) return;
        const position = reactFlowInstance.screenToFlowPosition({
            x : event.clientX,
            y : event.clientY
        })

        const newNode = {
            id : v4(),
            type,
            position,
            data : {
                title : type,
                description : EditorCanvasDefaultCardTypes[type].description,
                completed : false,
                current : false,
                metadata : {},
                type
            }
        }
        //@ts-ignore
        setNodes((nds) => nds.concat(newNode))
    },[reactFlowInstance,state])

    const handleClickCanvas = () => {
        dispatch({
            type : 'SELECTED_ELEMENT',
            payload : {
                element : {
                    data : {
                        completed : false,
                        current : false,
                        description : '',
                        metadata : {},
                        title : '',
                        type : 'Trigger',
                    },
                    id : '',
                    position : {
                        x : 0,
                        y : 0,
                    },
                    type : 'Trigger',
                }
            }
        })
    }

    return <ResizablePanelGroup
        direction={'horizontal'}
        className={'h-full'}
    >
        <ResizablePanel className={"flex h-full items-center justify-center"}>
            <div className={"relative"} style={{width : "100%", height : "100%", paddingBottom:"10px"}}>
                <ReactFlow
                    className="w-[300px]"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodes={state.editor.elements}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onInit={setReactFlowInstance}
                    fitView
                    onClick={handleClickCanvas}
                    nodeTypes={nodeTypes}
                >
                    <Controls position={"top-left"} className={"text-black"}/>
                    <MiniMap position={"bottom-left"} className={"!bg-background"} zoomable pannable/>
                    <Background
                        //@ts-ignore
                        variant={"dots"} gap={12} size={1}/>
                </ReactFlow>
            </div>
        </ResizablePanel>
        <ResizableHandle />
    </ResizablePanelGroup>
}

export default EditorCanvas;