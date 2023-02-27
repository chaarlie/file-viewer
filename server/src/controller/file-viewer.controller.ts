import {
    Controller,
    FileTypeValidator,
    Get,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'

import { FileViewerService } from '../services/file-viewer.service'
import { FileNameExtractionPipe } from '../pipes/file-name-extraction.pipe'

@Controller()
export class FileViewerController {
    constructor(private readonly fileViewerService: FileViewerService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadDocument(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new FileTypeValidator({ fileType: '^(.*).(pdf|PDF)$' }),
                ],
            }),
            FileNameExtractionPipe,
        )
        file: Express.Multer.File,
        @Res() res: Response,
    ) {
        const fileDocument = await this.fileViewerService.saveFileDocument(file)
        res.json(fileDocument)
    }

    @Get(':id')
    findOneDocument(@Param('id', ParseIntPipe) id: number) {
        return this.fileViewerService.getFileDocumentById(id)
    }

    @Get()
    findAllDocuments() {
        return this.fileViewerService.getAllFileDocuments()
    }
}
