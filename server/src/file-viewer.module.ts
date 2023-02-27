import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { Module } from '@nestjs/common'
import { ProcessFileService } from './services/process-file.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule } from '@nestjs/typeorm'

import { FileViewerController } from './controller/file-viewer.controller'
import { FileViewerService } from './services/file-viewer.service'
import { DatabaseConfiguration } from './database.configuration'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfiguration,
        }),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            serveRoot: '/static/',
            rootPath: join(__dirname, '..', '..', 'server', 'uploads'),
        }),
    ],
    controllers: [FileViewerController],
    providers: [FileViewerService, ProcessFileService],
})
export class FileViewerModule {}
