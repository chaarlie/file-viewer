import { DataSource } from 'typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

import { FileDocument } from '../entity/file-document'
import { ProcessFileService } from './process-file.service'

@Injectable()
export class FileViewerService {
    constructor(
        private dataSource: DataSource,
        private processFileService: ProcessFileService,
    ) { }

    async saveFileDocument(file: Express.Multer.File): Promise<FileDocument> {
        const {
            originalname: originalName,
            encoding: encodingFormat,
            mimetype: mimeType,
            size,
            buffer,
        } = file

        return this.dataSource.transaction(async () => {
            const documentPages = await this.processFileService
                .convertPdfToPng(
                    originalName,
                    buffer,
                )

            return this.dataSource.getRepository(FileDocument)
                .save(
                    {
                        originalName,
                        encodingFormat,
                        mimeType,
                        pageNo: documentPages,
                        size,
                    }
                )
        })
    }

    async getAllFileDocuments() {
        return this.dataSource.getRepository(FileDocument).find()
    }

    async getFileDocumentById(id: number) {
        const found = await this.dataSource
            .getRepository(FileDocument)
            .findOneBy({ id })

        if (!found)
            throw new HttpException(
                `document with id ${id} not found`,
                HttpStatus.NOT_FOUND,
            )

        return found
    }
}
