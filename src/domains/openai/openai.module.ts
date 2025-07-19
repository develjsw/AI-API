import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenAiController } from './presentation/openai.controller';
import { OpenAiApplicationService } from './application/openai-application.service';
import { OpenAiInfrastructureService } from './infrastructure/openai-infrastructure.service';

@Module({
    imports: [HttpModule],
    controllers: [OpenAiController],
    providers: [OpenAiApplicationService, OpenAiInfrastructureService],
    exports: [OpenAiApplicationService],
})
export class OpenAiModule {}
