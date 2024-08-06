import {EditorCanvasCardType} from "@/lib/types";

export const onDragStart = (
    event: any,
    nodeType: EditorCanvasCardType['type']
) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
}