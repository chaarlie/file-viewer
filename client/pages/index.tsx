import React, { useState } from 'react'
import type { NextPage } from 'next'
import axios from 'axios'

import { Carousel } from 'components/carousel/'
import { UploadForm } from 'components/upload-form/'
import { UploadedFileList } from 'components/uploaded-file-list'
import { UploadedFileSearchForm } from 'components/uploaded-file-search-form'
import { FileDocument } from 'types'

const Home: NextPage<{ fileDocumentList: FileDocument[] }> = ({
    fileDocumentList,
}) => {
    const [currentFile, setCurrentFile] = useState<FileDocument | null>(null)

    const [fileDocuments, setFileDocuments] =
        useState<FileDocument[]>(fileDocumentList)
    return (
        <div  data-testid="home-container" className="bg-slate-50 p-5 bg-gradient-to-t from-slate-50 to-slate-0 mx-auto bg-white rounded-xl shadow-md overflow-hidden max-w-[90%]  lg:h-screen  h-full">
            <div className="flex-col">
                <Carousel currentFile={currentFile} />
                <div className="mt-10">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-10 md:flex-col">
                        <div className="col-span-1 bg-slate-50 border-8 border-slate-100  bg-slate-50 border-4 border-solid border-slate-200 p-3 rounded-lg  ">
                            <UploadedFileSearchForm />
                            <UploadedFileList
                                fileDocuments={fileDocuments}
                                currentFile={currentFile}
                                setCurrentFile={setCurrentFile}
                            />
                        </div>

                        <div className="col-span-2">
                            <UploadForm setFileDocuments={setFileDocuments} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await axios(String(process.env.NEXT_PUBLIC_SERVER_HOST_URL))
    const fileDocumentList = res.statusText === 'OK' ? res.data : []

    return {
        props: { fileDocumentList },
    }
}

export default Home
