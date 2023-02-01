import React, { MouseEventHandler, ReactElement } from 'react'

interface UploadedFileItemProps {
    children: ReactElement
    selectFile: MouseEventHandler<HTMLLIElement>
    current: boolean
    itemId: number
}

function UploadedFileItem({
    children,
    selectFile,
    current,
    itemId,
}: UploadedFileItemProps) {
    return (
        <li
            data-testid="file-list-item" 
            onClick={selectFile}
            data-id={itemId}
            className={`border-slate-200 border-2 active:bg-sky-300 active:text-white ${
                current
                    ? 'bg-sky-400 text-white  hover:bg-sky-400  hover:text-white '
                    : 'bg-zinc-50 text-slate-600  hover:bg-sky-200 hover:text-sky-600 '
            }  border-solid hover:border-2  font-rubik font-bold border-slate-200 w-90 p-5 rounded-lg block mt-4`}
        >
            <div>{children}</div>
        </li>
    )
}

export default UploadedFileItem
