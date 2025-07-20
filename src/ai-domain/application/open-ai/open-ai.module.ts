import { Module } from '@nestjs/common';
import { OpenAiController } from '../../interfaces/open-ai/open-ai.controller';
import { SummarizeTextUseCase } from './summarize-text.usecase';
import { AskOpenAiUseCase } from './ask-open-ai.usecase';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [OpenAiController],
    providers: [SummarizeTextUseCase, AskOpenAiUseCase],
})
export class OpenAiModule {}
