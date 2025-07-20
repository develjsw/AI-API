import { Injectable, Inject } from '@nestjs/common';
import { AiRequest, AiResponse } from '../../../domain/entities/ai-request.entity';
import { OpenAiRepository } from '../../../domain/repositories/ai.repository.interface';

@Injectable()
export class SummarizeTextUseCase {
    constructor(
        @Inject('OpenAiRepository')
        private readonly openAiRepository: OpenAiRepository,
    ) {}

    async execute(text: string): Promise<string> {
        const request = AiRequest.create(text, 'openai');
        const response = await this.openAiRepository.summarizeText(request);
        return response.content;
    }
}