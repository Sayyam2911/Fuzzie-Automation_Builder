import {ConnectionProviderProps} from "@/providers/connections-provider";
import {Card, CardContent, CardDescription} from "@/components/ui/card";
import {onAddTemplate} from "@/lib/editor-utils";

type GoogleFileDetailsProps = {
    nodeConnection : ConnectionProviderProps,
    title : string,
    gFile : any
}

const isGoogleFileNotEmpty = (gFile : any) : boolean => {
    return Object.keys(gFile).length > 0 && gFile.kind !== '';
}

const GoogleFileDetails = ({nodeConnection,title,gFile} : GoogleFileDetailsProps) => {
    if (!isGoogleFileNotEmpty(gFile)) return null;

    const details = ['kind', 'name', 'mimeType'];
    if (title === 'Google Drive') {
        details.push('id');
    }
    return <div className="flex flex-wrap gap-2">
        <Card>
            <CardContent className="flex flex-wrap gap-2 p-4">
                {details.map((detail) => (
                    <div
                        key={detail}
                        onClick={() =>
                            onAddTemplate(nodeConnection, title, gFile[detail])
                        }
                        className="flex cursor-pointer gap-2 rounded-full bg-white px-3 py-1 text-gray-500"
                    >
                        {detail}:{' '}
                        <CardDescription className="text-black">
                            {gFile[detail]}
                        </CardDescription>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
}

export default GoogleFileDetails;