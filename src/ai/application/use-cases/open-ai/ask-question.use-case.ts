import { Injectable, Inject } from '@nestjs/common';
import { AiRequest, AiResponse } from '../../../domain/entities/ai-request.entity';
import { OpenAiRepository } from '../../../domain/repositories/ai.repository.interface';

@Injectable()
export class AskQuestionUseCase {
    constructor(
        @Inject('OpenAiRepository')
        private readonly openAiRepository: OpenAiRepository,
    ) {}

    async execute(question: string): Promise<string> {
        const request = AiRequest.create(question, 'openai');
        const response = await this.openAiRepository.askQuestion(request);
        return response.content;
    }
}