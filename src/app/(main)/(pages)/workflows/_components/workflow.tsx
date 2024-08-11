'use client';
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {onFlowPublish} from "../_actions/workflow-connections";
import {toast} from "sonner";

type Props = {
    name : string,
    description : string,
    id : string,
    published : boolean | null
}

const Workflow = ({name,description,id,published} : Props) => {

    const onPublishFlow = async(event : any) => {
        const response = await onFlowPublish(
            id,
            event.target.ariaChecked === 'false'
        )
        if(response) toast.message(response);
    }

    return <Card className={'flex w-full items-center justify-between'}>
        <CardHeader className={'flex flex-col gap-4'}>
            <Link href={`/workflows/editor/${id}`}>
                <div className={'flex flex-row gap-2'}>
                    <Image
                        src="/googleDrive.png"
                        alt="Google Drive"
                        height={30}
                        width={30}
                        className="object-contain"
                    />
                    <Image
                        src="/notion.png"
                        alt="Google Drive"
                        height={30}
                        width={30}
                        className="object-contain"
                    />
                    <Image
                        src="/discord.png"
                        alt="Google Drive"
                        height={30}
                        width={30}
                        className="object-contain"
                    />
                    <Image
                        src="/slack.png"
                        alt="Google Drive"
                        height={30}
                        width={30}
                        className="object-contain"
                    />
                </div>
                <div>
                    <CardTitle className={'text-lg'}>{name}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
            </Link>
        </CardHeader>
        <div className={"flex flex-col items-center gap-2 p-4"}>
            <Label className={"text-muted-foreground"} htmlFor={"airplane-mode"}>
                {published! ? 'On' : 'Off'}
            </Label>
            <Switch id={"airplane-mode"}
                    onClick={onPublishFlow}
                    defaultChecked={published!}
            />
        </div>
    </Card>
}

export default Workflow