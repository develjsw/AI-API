import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenAiModule } from './open-ai/open-ai.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

let envFile = '.env.local';
switch (process.env.NODE_ENV) {
    case 'production':
        envFile = '.env.production';
        break;
    case 'development':
        envFile = '.env.development';
        break;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [path.resolve(__dirname, `../${envFile}`)],
            isGlobal: true,
            cache: true,
        }),
        OpenAiModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
