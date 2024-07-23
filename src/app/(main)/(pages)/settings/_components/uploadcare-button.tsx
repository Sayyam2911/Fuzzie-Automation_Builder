'use client';
import * as LR from '@uploadcare/blocks'
import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";

type UploadcareButtonProps = {
    onUpload : (e: string) => any
}

LR.registerBlocks(LR)

const UploadcareButton = ({onUpload}: UploadcareButtonProps) => {
    const router = useRouter()
    const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null)

    useEffect(() => {
        const handleUpload = async(e : any) => {
            const file = await onUpload(e.detail.cdnUrl)
            if(file){
                router.refresh()
            }
        }
        // @ts-ignore
        ctxProviderRef.current.addEventListener('file-upload-success', handleUpload)
    },[])

    return <div>
        <lr-config
            ctx-name="my-uploader"
            pubkey="85e7d53ba07e524034f9"
        />

        <lr-file-uploader-regular
            ctx-name="my-uploader"
            css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
        />

        <lr-upload-ctx-provider
            ctx-name="my-uploader"
            ref={ctxProviderRef}
        />
    </div>
}

export default UploadcareButton;