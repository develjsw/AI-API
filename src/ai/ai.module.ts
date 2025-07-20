import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { GoogleAiController } from './presentation/controllers/google-ai.controller';
import { OpenAiController } from './presentation/controllers/open-ai.controller';

import { GenerateContentUseCase } from './application/use-cases/google-ai/generate-content.use-case';
import { SummarizeTextUseCase } from './application/use-cases/open-ai/summarize-text.use-case';
import { AskQuestionUseCase } from './application/use-cases/open-ai/ask-question.use-case';

import { GoogleAiProvider } from './infrastructure/providers/google-ai.provider';
import { OpenAiProvider } from './infrastructure/providers/open-ai.provider';

@Module({
    imports: [HttpModule, ConfigModule],
    controllers: [GoogleAiController, OpenAiController],
    providers: [
        GenerateContentUseCase,
        SummarizeTextUseCase,
        AskQuestionUseCase,
        {
            provide: 'GoogleAiRepository',
            useClass: GoogleAiProvider,
        },
        {
            provide: 'OpenAiRepository',
            useClass: OpenAiProvider,
        },
    ],
})
export class AiModule {}