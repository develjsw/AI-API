import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Agent, run } from '@openai/agents';
import { AiRequest, AiResponse } from '../../domain/entities/ai-request.entity';
import { OpenAiRepository } from '../../domain/repositories/ai.repository.interface';
import { OpenAiModel, RoleInstruction, ToneInstruction } from '../../domain/value-objects/ai-model.value-object';

@Injectable()
export class OpenAiProvider implements OpenAiRepository {
    private readonly agent = new Agent({
        name: 'AgentName1',
        instructions: RoleInstruction.DEVELOPER + ToneInstruction.POLITE,
        model: OpenAiModel.GPT_3_5_TURBO,
    });

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

    async summarizeText(request: AiRequest): Promise<AiResponse> {
        const apiUrl = `${this.configService.get<string>('OPEN_AI_API_HOST')}/v1/chat/completions`;

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get<string>('OPEN_AI_API_KEY')}`,
        };

        const body = {
            model: OpenAiModel.GPT_3_5_TURBO,
            messages: [
                {
                    role: 'system',
                    content: '당신은 문서를 요약해주는 전문 요약봇입니다.',
                },
                {
                    role: 'user',
                    content: `다음 문서를 요약해줘:\n\n${request.text}`,
                },
            ],
            temperature: 0.7,
        };

        const response = await firstValueFrom(this.httpService.post(apiUrl, body, { headers }));
        const content = response.data.choices[0].message.content.trim();

        return AiResponse.create(request.id, content, 'openai');
    }

    async askQuestion(request: AiRequest): Promise<AiResponse> {
        try {
            const answer = await run(this.agent, request.text);
            return AiResponse.create(request.id, answer.finalOutput, 'openai');
        } catch (error) {
            throw new InternalServerErrorException(
                '오픈 AI API 에러가 발생했습니다. 잠시후 다시 시도해주세요.',
            );
        }
    }
}
