// @ts-nocheck

import path from 'path'
import pdf from 'pdf-parse'
import { Request, Response } from 'express'
import { fromBuffer } from 'pdf2pic'

import { AppDataSource } from '../app-data-source'
import { FileDocument } from '../entity/file-document.entity'

export const FileDocumentController = {
    saveFileDocument: async (req: Request, res: Response) => {
        const savePath = path.join(__dirname, '..', '..', '..', 'uploads')

        const regex = /^(.*)\.(pdf|PDF)$/
        const match = String(req.file?.originalname).match(regex) || ''

        if (!match) res.status(400).send('invalid pdf format')

        const fileToken = String(match[1]).toLowerCase().replace(/ /g, '_')

        const format = 'png'
        const fileBuffer = req.file?.buffer
        const data = await pdf(fileBuffer)
        const pages = Array.from({ length: data.numpages }, () => ({
            name: `${fileToken}`,
        }))

        try {
            await new Promise((resolve, reject) => {
                try {
                    const processedPages = Promise.all(
                        pages.map(({ name: saveFilename }, i) => {
                            const options = {
                                density: 100,
                                saveFilename,
                                savePath,
                                format,
                                width: 600,
                                height: 600,
                            }
                            try {
                                if (fileBuffer) {
                                    const storeAsImage = fromBuffer(
                                        fileBuffer,
                                        options,
                                    )
                                    const pageToConvertAsImage = i + 1

                                    return storeAsImage(pageToConvertAsImage)
                                }
                            } catch (error) {
                                console.error(error)
                            }
                        }),
                    )
                    resolve(processedPages)
                } catch (err) {
                    reject(err)
                }
            })
        } catch (error) {
            res.status(500).json(error.message)
        }

        if (req.file) {
            const { encoding: encodingFormat, mimetype: mimeType, size } = req.file || {}

            const savedImage = await AppDataSource.getRepository(FileDocument).save(
                {
                    originalName: fileToken,
                    encodingFormat,
                    mimeType,
                    pageNo: pages.length,
                    size,
                },
            )
            res.json(savedImage)
        }
        res.end()
    },
    getAllFileDocuments: async (_, res: Response) => {
        try {
            const result = await AppDataSource.getRepository(FileDocument).find()
            res.json(result)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    getFileDocumentById: async (req: Request & { params: { id: number } }, res: Response) => {
        try {
            const { id } = req.params
            const found = await AppDataSource.getRepository(
                FileDocument,
            ).findOneBy({ id })

            if (found) {
                res.json(found)
            } else res.status(404).json('id does not exists')
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
}

