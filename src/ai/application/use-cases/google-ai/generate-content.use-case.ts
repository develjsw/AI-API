import { Injectable, Inject } from '@nestjs/common';
import { AiRequest, AiResponse } from '../../../domain/entities/ai-request.entity';
import { GoogleAiRepository } from '../../../domain/repositories/ai.repository.interface';

@Injectable()
export class GenerateContentUseCase {
    constructor(
        @Inject('GoogleAiRepository')
        private readonly googleAiRepository: GoogleAiRepository,
    ) {}

    async execute(text: string): Promise<string> {
        const request = AiRequest.create(text, 'google');
        const response = await this.googleAiRepository.generateContent(request);
        return response.content;
    }
}