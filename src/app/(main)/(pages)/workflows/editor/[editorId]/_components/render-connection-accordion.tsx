import {Connection} from "@/lib/types";
import {EditorState} from "@/providers/editor-provider";
import {useNodeConnections} from "@/providers/connections-provider";
import {useFuzzieStore} from "@/store";
import {AccordionContent} from "@/components/ui/accordion";
import ConnectionCard from "@/app/(main)/(pages)/connections/_components/connection-card";
import MultipleSelector from "@/components/ui/multiple-selector";

type RenderConnectionAccordionProps = {
    state: EditorState;
    connection: Connection;
    key: string;
}

const RenderConnectionAccordion = ({ state, connection , key} : RenderConnectionAccordionProps) => {
    const {
        title,
        description,
        image,
        connectionKey,
        accessTokenKey,
        alwaysTrue,
        slackSpecial,
    } = connection;

    const {nodeConnection} = useNodeConnections();
    const {slackChannels, selectedSlackChannels, setSelectedSlackChannels} = useFuzzieStore();
    const connectionData = (nodeConnection as any)[connectionKey];
    const isConnected = alwaysTrue || (nodeConnection[connectionKey] && accessTokenKey && connectionData[accessTokenKey!]);
    return <AccordionContent key={title} className={'mx-1 -pb-0.5'}>
        {state.editor.selectedNode.data.title === title && (
            <>
                <ConnectionCard
                    title={title}
                    icon={image}
                    description={description}
                    type={title}
                    connected={{ [title]: isConnected }}
                />
                {slackSpecial && isConnected && (
                    <div className="p-3">
                        {slackChannels?.length ? (
                            <>
                                <div className="mb-4 ml-1">
                                    Select the slack channels to send notification and messages:
                                </div>
                                <MultipleSelector
                                    value={selectedSlackChannels}
                                    onChange={setSelectedSlackChannels}
                                    defaultOptions={slackChannels}
                                    placeholder="Select channels"
                                    emptyIndicator={
                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                            no results found.
                                        </p>
                                    }
                                />
                            </>
                        ) : (
                            'No Slack channels found. Please add your Slack bot to your Slack channel'
                        )}
                    </div>
                )}
            </>
        )}
    </AccordionContent>
}

export default RenderConnectionAccordion;