import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenAiController } from './open-ai.controller';
import { OpenAiService } from './service/open-ai.service';

@Module({
    imports: [HttpModule],
    controllers: [OpenAiController],
    providers: [OpenAiService],
    exports: [],
})
export class OpenAiModule {}
