import { Test, TestingModule } from '@nestjs/testing'
import { FileViewerController } from '../controller/file-viewer.controller'
import { FileViewerService } from '../services/file-viewer.service'

describe('FileViewerController', () => {
    let fileViewerController: FileViewerController

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [FileViewerController],
            providers: [FileViewerService],
        }).compile()

        fileViewerController = app.get<FileViewerController>(FileViewerController)
    })

    describe('root', () => {
        it.skip('should return "Hello World!"', () => {
           
        });
    })
})
