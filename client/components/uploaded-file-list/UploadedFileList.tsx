import React, { Dispatch, MouseEvent } from 'react'

import { FileDocument } from 'types/'
import { UploadedFileItemContainer } from 'components/uploaded-file-list/'

interface UploadedFileListProps {
    fileDocuments: FileDocument[]
    currentFile: FileDocument | null
    setCurrentFile: Dispatch<FileDocument | null>
}

function UploadedFileList({
    fileDocuments,
    currentFile,
    setCurrentFile,
}: UploadedFileListProps) {
    const selectFile = (event: MouseEvent<HTMLElement>) => {
        const selectedFileId = Number(
            event.currentTarget.getAttribute('data-id'),
        )
        const selectedFile =
            fileDocuments.find(({ id }) => id == selectedFileId) || null
        setCurrentFile(selectedFile)
    }

    return (
        <div
            id="file-list"
            className="w-full lg:h-screen h-full mt-10 m-b-3 overscroll-y-contain overflow-y-auto "
        >
            <ul data-testid="file-list" className="list-none">
                {fileDocuments.map(({ originalName, id }) => (
                    <UploadedFileItemContainer
                        key={id}
                        itemId={id}
                        current={id === currentFile?.id}
                        selectFile={selectFile}
                    >
                        <span>{originalName}</span>
                    </UploadedFileItemContainer>
                ))}
            </ul>
        </div>
    )
}

export default UploadedFileList
