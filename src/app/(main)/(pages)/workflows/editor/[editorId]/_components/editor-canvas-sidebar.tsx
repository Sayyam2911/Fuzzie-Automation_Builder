'use client';
import {EditorCanvasType, EditorNodeType} from "@/lib/types";
import {useEditor} from "@/providers/editor-provider";
import {useNodeConnections} from "@/providers/connections-provider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {CONNECTIONS, EditorCanvasDefaultCardTypes} from "@/lib/constant";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {onDragStart} from "@/lib/editor-utils";
import EditorCanvasCardIconHelper
    from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/editor-canvas-card-icon-helper";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import RenderConnectionAccordion
    from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/render-connection-accordion";

type Props = {
    nodes: EditorNodeType[]
}

const EditorCanvasSidebar = ({nodes}: Props) => {
    const {state} = useEditor();
    const {nodeConnection} = useNodeConnections()

    console.log("EditorCanvasSidebar",nodes);

    return <aside>
        <Tabs defaultValue={"actions"} className={"h-screen overflow-scroll pb-24"}>
            <TabsList className={"bg-transparent"}>
                <TabsTrigger value={"actions"}>Actions</TabsTrigger>
                <TabsTrigger value={"settings"}>Settings</TabsTrigger>
            </TabsList>
            <Separator/>
            <TabsContent value={"actions"} className={"flex flex-col gap-3 px-4 py-3"}>
                {Object.entries(EditorCanvasDefaultCardTypes)
                    .filter(
                        ([_, cardType]) =>
                            (!nodes.length && cardType.type === 'Trigger') ||
                            (nodes.length && cardType.type === 'Action')
                    )
                    .map(([cardKey, cardValue]) => (
                        <Card
                            key={cardKey}
                            draggable
                            className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                            onDragStart={(event) =>
                                onDragStart(event, cardKey as EditorCanvasType)
                            }
                        >
                            <CardHeader className="flex flex-row items-center gap-4 py-3 px-4">
                                <EditorCanvasCardIconHelper type={cardKey as EditorCanvasType} />
                                <CardTitle className="text-sm">
                                    {cardKey}
                                    <CardDescription>{cardValue.description}</CardDescription>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
            </TabsContent>
            <TabsContent value={'settings'} className={'-mt-6'}>
                <div className={"px-2 py-4 text-center text-xl text-bold"}>
                    {state.editor.selectedNode.data.title}
                </div>
                <Accordion type={'multiple'}>
                    <AccordionItem value={'Options'} className={'border-y-[1px] px-2'}>
                        <AccordionTrigger className={'!no-underline'}>
                            Account
                        </AccordionTrigger>
                        <AccordionContent>
                            {CONNECTIONS.map((connection) => (
                               <RenderConnectionAccordion
                                   key={connection.title}
                                   state={state}
                                   connection={connection}
                               />
                            ))}{' '}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </TabsContent>
        </Tabs>
    </aside>
}

export default EditorCanvasSidebar