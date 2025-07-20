import { AiRequest, AiResponse } from '../entities/ai-request.entity';

export interface GoogleAiRepository {
    generateContent(request: AiRequest): Promise<AiResponse>;
}

export interface OpenAiRepository {
    summarizeText(request: AiRequest): Promise<AiResponse>;
    askQuestion(request: AiRequest): Promise<AiResponse>;
}