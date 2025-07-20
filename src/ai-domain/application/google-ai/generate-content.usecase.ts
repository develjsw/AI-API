import { Injectable } from '@nestjs/common';
import { GoogleAiModelEnum } from '../../domains/google-ai/google-ai-model.enum';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateContentUseCase {
    constructor(private readonly configService: ConfigService) {}

    async execute(text: string): Promise<string> {
        const googleAi = new GoogleGenAI({
            apiKey: this.configService.get<string>('GOOGLE_AI_API_KEY'),
        });

        const { candidates = [] } = await googleAi.models.generateContent({
            model: GoogleAiModelEnum.GEMINI_2_5_FLASH,
            contents: [
                {
                    parts: [{ text }],
                },
            ],
        });

        const contents = candidates
            .flatMap((candidate) => candidate.content?.parts ?? [])
            .map((part) => part.text)
            .filter(Boolean)
            .join('\n');

        return contents || '응답 없음';
    }
}
