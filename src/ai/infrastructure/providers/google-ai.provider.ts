import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import { AiRequest, AiResponse } from '../../domain/entities/ai-request.entity';
import { GoogleAiRepository } from '../../domain/repositories/ai.repository.interface';
import { GoogleAiModel } from '../../domain/value-objects/ai-model.value-object';

@Injectable()
export class GoogleAiProvider implements GoogleAiRepository {
    constructor(private readonly configService: ConfigService) {}

    async generateContent(request: AiRequest): Promise<AiResponse> {
        const googleAi = new GoogleGenAI({
            apiKey: this.configService.get<string>('GOOGLE_AI_API_KEY'),
        });

        const { candidates = [] } = await googleAi.models.generateContent({
            model: GoogleAiModel.GEMINI_2_5_FLASH,
            contents: [
                {
                    parts: [{ text: request.text }],
                },
            ],
        });

        const content = candidates
            .flatMap((candidate) => candidate.content?.parts ?? [])
            .map((part) => part.text)
            .filter(Boolean)
            .join('\n');

        return AiResponse.create(request.id, content || '응답 없음', 'google');
    }
}
