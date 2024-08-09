import {ConnectionProviderProps} from "@/providers/connections-provider";
import React from "react";
import {Option} from "@/store";

type ActionButtonProps = {
    currentService: string
    nodeConnection: ConnectionProviderProps
    channels: Option[]
    setChannels: (channels: Option[]) => void
}

const ActionButton = ({ currentService, nodeConnection, channels, setChannels }: ActionButtonProps) => {
    return <div>Action Button</div>
}
export default ActionButton