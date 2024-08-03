import EditorProvider from "@/providers/editor-provider";
import {ConnectionsProvider} from "@/providers/connections-provider";
import EditorCanvas from "@/app/(main)/(pages)/workflows/editor/[editorId]/_components/editor-canvas";

type props = {

}

const Page = (props: props) => {
    return (
        <div className={"h-full"}>
            <EditorProvider>
                <ConnectionsProvider>
                    <EditorCanvas/>
                </ConnectionsProvider>
            </EditorProvider>
        </div>
    )
}

export default Page