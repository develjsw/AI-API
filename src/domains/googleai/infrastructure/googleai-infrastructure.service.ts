import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { GoogleAiModel } from '../domain/models';

@Injectable()
export class GoogleAiInfrastructureService {
    constructor(private readonly configService: ConfigService) {}

    async generateContent(text: string): Promise<string> {
        const googleAi = new GoogleGenAI({
            apiKey: this.configService.get<string>('GOOGLE_AI_API_KEY'),
        });

        const { candidates = [] } = await googleAi.models.generateContent({
            model: GoogleAiModel.GEMINI_2_5_FLASH,
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
