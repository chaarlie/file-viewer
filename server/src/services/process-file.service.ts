import pdfParse = require('pdf-parse')
import { fromBuffer } from 'pdf2pic'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { join } from 'path'

@Injectable()
export class ProcessFileService {
    async convertPdfToPng(
        originalName: string,
        fileBuffer: Buffer,
    ): Promise<number> {
        let convertedPages = []
        let parsedPdf
        const savePath = join(__dirname, '..', '..', 'uploads')
        const format = 'png'

        try {
            parsedPdf = await pdfParse(fileBuffer)
        } catch (error) {
            throw new HttpException(
                error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }

        convertedPages = Array.from({ length: parsedPdf.numpages }, () => ({
            name: `${originalName}`,
        }))

        await new Promise((resolve, reject) => {
            resolve(
                Promise.all(
                    convertedPages.map(({ name: saveFilename }, i) => {
                        const options = {
                            density: 100,
                            saveFilename,
                            savePath,
                            format,
                            width: 600,
                            height: 600,
                        }
                        try {
                            const storeAsImage = fromBuffer(fileBuffer, options)
                            const pageToConvertAsImage = i + 1

                            return storeAsImage(pageToConvertAsImage)
                        } catch (error) {
                            reject(
                                new HttpException(
                                    error.message,
                                    HttpStatus.INTERNAL_SERVER_ERROR,
                                ),
                            )
                        }
                    }),
                ),
            )
        })
        return convertedPages.length
    }
}
