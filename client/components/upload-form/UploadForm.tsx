import React, {
    ChangeEvent,
    Dispatch,
    memo,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from 'react'
import axios from 'axios'

import { CancelUploadButton, UploadButton } from 'components/upload-form/'
import { FileDocument } from 'types/'
import { useScrollBottom } from 'hooks/'
import { UploadMessage } from 'enums/'

interface UploadFormProps {
    setFileDocuments: Dispatch<FileDocument[]>
}

function UploadForm({ setFileDocuments }: UploadFormProps) {
    const { setElId } = useScrollBottom()
    const [isCancellable, setIsCancellable] = useState<boolean>()
    const [selectedFile, setSelectedFile] = useState<File>()
    const [uploadStatusMsg, setUploadStatusMsg] = useState(
        UploadMessage.UPLOAD_FORM_SELECT_FILE,
    )
    const [uploadProgress, setUploadProgress] = useState<number>(0)
    const selectFileInput = useRef(null)

    const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.currentTarget

        if (files?.length) {
            setSelectedFile(files[0])
        }
    }

    const handleFormSubmit = async (event: MouseEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (selectedFile) {
            const config = {
                onUploadProgress: (progressEvent: any) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                    )
                    setUploadProgress(percentCompleted)
                },
            }

            const fileToUpload = new FormData()
            fileToUpload.append('file', selectedFile)

            try {
                const uploadResponse = await axios.post(
                    String(process.env.NEXT_PUBLIC_CLIENT_HOST_URL),
                    fileToUpload,
                    config,
                )

                if (
                    uploadResponse.status >= 200 &&
                    uploadResponse.status < 300
                ) {
                    setTimeout(async () => {
                        setUploadStatusMsg(
                            UploadMessage.UPLOAD_FORM_SELECT_FILE,
                        )
                        clearControls()

                        const res = await axios(
                            `${String(
                                process.env.NEXT_PUBLIC_CLIENT_HOST_URL,
                            )}`,
                        )

                        if (res.statusText === 'OK') {
                            setFileDocuments(res.data)
                            setElId('file-list')
                        }
                    }, 3000)
                }
            } catch (error) {
                console.error(error)

                setUploadStatusMsg(UploadMessage.UPLOAD_FORM_SELECT_FILE)
            }
        }
    }

    const clearControls = () => {
        if (isCancellable) {
            //@ts-ignore
            selectFileInput.current.value = ''
        }
    }

    const handleFormCancel = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        clearControls()
    }

    useEffect(() => {
        if (selectFileInput.current) {
            setIsCancellable(true)
        }
    }, [selectFileInput])

    useEffect(() => {
        if (uploadProgress === 100) {
            setTimeout(() => {
                setUploadProgress(0)
                setUploadStatusMsg(UploadMessage.UPLOAD_FORM_UPLOAD_COMPLETE)
            }, 2000)
        }
    }, [uploadProgress])

    useEffect(() => {
        if (uploadStatusMsg == UploadMessage.UPLOAD_FORM_UPLOAD_COMPLETE) {
            setUploadStatusMsg(UploadMessage.UPLOAD_FORM_PROCESSING)
        }
    }, [uploadStatusMsg])

    const isProcessing = uploadStatusMsg == UploadMessage.UPLOAD_FORM_PROCESSING
    return (
        <form className=" mt-16 col-span-2">
            <div className="grid  lg:grid-cols-6 lg:gap-3 lg:mt-40  grid-cols-3 gap-5 place-items-center">
                <div className="col-span-1 lg:mt-36 ">
                    <h2 className="text-sky-400 text-4xl font-extrabold  ">
                        {uploadProgress > 0 ? `${uploadProgress}%` : null}
                    </h2>
                </div>
                <div className="h-fit col-span-2">
                    <img
                        src="/pdf-logo.png"
                        alt="Pdf logo"
                        width={180}
                        height={200}
                    />
                </div>

                <div className="w-80 h-fit self-center col-span-3 grid grid-rows-3 gap-3 md:w-full">
                    <span className="text-3xl font-bold font-rubik  flex block w-d">
                        <p
                            className={
                                isProcessing
                                    ? 'animate-pulse capitalize'
                                    : 'capitalize'
                            }
                        >
                            {uploadStatusMsg}
                        </p>
                    </span>
                    <input
                        ref={selectFileInput}
                        onChange={handleSelectFile}
                        type="file"
                        name="file"
                        accept="application/pdf"
                        className="bg-white px-3 py-2 border shadow-sm  border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block  rounded-lg sm:text-sm focus:ring-1"
                    />
                    <div className="grid grid-cols-2 gap-8 ">
                        <UploadButton handleFormSubmit={handleFormSubmit} />
                        <CancelUploadButton
                            handleFormCancel={handleFormCancel}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default memo(UploadForm)
