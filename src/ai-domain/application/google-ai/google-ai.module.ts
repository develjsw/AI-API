import { Module } from '@nestjs/common';
import { GoogleAiController } from '../../interfaces/google-ai/google-ai.controller';
import { GenerateContentUseCase } from './generate-content.usecase';
import { GoogleGenAiProvider } from '../../infrastructure/google-ai/google-genai.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    controllers: [GoogleAiController],
    providers: [GenerateContentUseCase, GoogleGenAiProvider],
})
export class GoogleAiModule {}
