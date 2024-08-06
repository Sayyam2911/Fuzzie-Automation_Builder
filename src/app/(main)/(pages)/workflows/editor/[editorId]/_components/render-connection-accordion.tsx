import {Connection} from "@/lib/types";
import {EditorState} from "@/providers/editor-provider";
import {useNodeConnections} from "@/providers/connections-provider";

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
    return <div>Connections</div>
}

export default RenderConnectionAccordion;