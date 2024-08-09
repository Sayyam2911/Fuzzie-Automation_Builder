import {EditorState} from "@/providers/editor-provider";
import {ConnectionProviderProps} from "@/providers/connections-provider";
import {useFuzzieStore} from "@/store";
import ContentBasedOnTitle from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/content-based-on-title";

type RenderOutputAccordionProps = {
    state: EditorState;
    nodeConnection: ConnectionProviderProps;
}

const RenderOutputAccordion = ({ state, nodeConnection } : RenderOutputAccordionProps) => {
    const {
        googleFile,
        setGoogleFile,
        selectedSlackChannels,
        setSelectedSlackChannels,
    } = useFuzzieStore()
    return <ContentBasedOnTitle
        nodeConnection={nodeConnection}
        newState={state}
        file={googleFile}
        setFile={setGoogleFile}
        selectedSlackChannels={selectedSlackChannels}
        setSelectedSlackChannels={setSelectedSlackChannels}
    />
}

export default RenderOutputAccordion