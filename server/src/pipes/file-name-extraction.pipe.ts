import { PipeTransform, Injectable } from '@nestjs/common'

@Injectable()
export class FileNameExtractionPipe implements PipeTransform {
    transform(file: Express.Multer.File) {
        const regex = /.*(?=\.)/g
        const fileTokenMatch = file.originalname.match(regex) || ''
        const originalName = fileTokenMatch[0].toLowerCase().replace(/\s/g, '_')

        return { ...file, originalname: originalName }
    }
}
