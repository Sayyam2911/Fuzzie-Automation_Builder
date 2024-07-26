import React, { useState } from 'react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useRouter } from 'next/navigation';

function UploadCareButton({ onUpload } : any) {
    const [files, setFiles] = useState([]);
    const router = useRouter();

    const handleChangeEvent = async (items : any) => {
        const successfulFiles = items.allEntries.filter((file : any) => file.status === 'success');
        setFiles(successfulFiles);

        for (const file of successfulFiles) {
            const uploadedFile = await onUpload(file.cdnUrl);
            if (uploadedFile) {
                router.refresh();
            }
        }
    };

    return (
        <div>
            <FileUploaderRegular
                onChange={handleChangeEvent}
                pubkey="a9428ff5ff90ae7a64eb"
            />
            <div>
                {files.map((file: any) => (
                    <div key={file.uuid}>
                        <img src={file.cdnUrl} alt={file.fileInfo.originalFilename} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UploadCareButton;