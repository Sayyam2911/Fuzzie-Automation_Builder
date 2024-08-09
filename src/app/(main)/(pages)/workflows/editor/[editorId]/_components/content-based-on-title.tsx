import {ConnectionProviderProps} from "@/providers/connections-provider";
import {EditorState} from "@/providers/editor-provider";
import {nodeMapper} from "@/lib/types";
import {Option} from "@/store";
import {AccordionContent} from "@/components/ui/accordion";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {onContentChange} from "@/lib/editor-utils";
import GoogleFileDetails from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/google-file-details";
import GoogleDriveFiles from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/google-drive-files";
import ActionButton from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/action-button";

type ContentBasedOnTitleProps = {
    nodeConnection: ConnectionProviderProps,
    newState : EditorState,
    file : any,
    setFile : (file : any) => void,
    selectedSlackChannels : Option[],
    setSelectedSlackChannels : (selectedSlackChannels : Option[]) => void
}

const ContentBasedOnTitle = ({ nodeConnection, newState, file, setFile, selectedSlackChannels, setSelectedSlackChannels } : ContentBasedOnTitleProps) => {
    const selectedNode = newState.editor.selectedNode;
    const title = selectedNode.data.title;

    // @ts-ignore
    const nodeConnectionType : any = nodeConnection[nodeMapper[title]];
    if(!nodeConnectionType) return <div>Not Connected</div>

    const isConnected =
        title === 'Google Drive'
            ? !nodeConnection.isLoading
            : !!nodeConnectionType[
                `${
                    title === 'Slack'
                        ? 'slackAccessToken'
                        : title === 'Discord'
                            ? 'webhookURL'
                            : title === 'Notion'
                                ? 'accessToken'
                                : ''
                }`
                ]

    if(!isConnected) return <div>Not Connected</div>

    return  <AccordionContent>
        <Card>
            {title === 'Discord' && (
                <CardHeader>
                    <CardTitle>{nodeConnectionType.webhookName}</CardTitle>
                    <CardDescription>{nodeConnectionType.guildName}</CardDescription>
                </CardHeader>
            )}
            <div className="flex flex-col gap-3 px-6 py-3 pb-20">
                <p>{title === 'Notion' ? 'Values to be stored' : 'Message'}</p>
                {title === 'Discord' || title === 'Slack' ? (
                    <Input
                        type="text"
                        value={nodeConnectionType.content}
                        onChange={(event) => onContentChange(nodeConnection, title, event)}
                    />
                ) : null}
                {JSON.stringify(file) !== '{}' && title !== 'Google Drive' && (
                    <Card className="w-full">
                        <CardContent className="px-2 py-3">
                            <div className="flex flex-col gap-4">
                                <CardDescription>Drive File</CardDescription>
                                <div className="flex flex-wrap gap-2">
                                    <GoogleFileDetails
                                        nodeConnection={nodeConnection}
                                        title={title}
                                        gFile={file}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
                {title === 'Google Drive' && <GoogleDriveFiles />}
                <ActionButton
                    currentService={title}
                    nodeConnection={nodeConnection}
                    channels={selectedSlackChannels}
                    setChannels={setSelectedSlackChannels}
                />
            </div>
        </Card>
    </AccordionContent>
}

export default ContentBasedOnTitle