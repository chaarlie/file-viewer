import { NestFactory } from '@nestjs/core'

import { FileViewerModule } from './file-viewer.module'

async function bootstrap() {
    const app = await NestFactory.create(FileViewerModule)
    app.enableCors({
        origin: [String(process.env.CLIENT_HOST_URL)],
    })
    await app.listen(process.env.SERVER_PORT)
}
bootstrap()
