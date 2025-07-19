import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { Agent, run } from '@openai/agents';
import { GptAiModel, RoleInstructions, ToneInstructions } from '../domain/models';

@Injectable()
export class OpenAiInfrastructureService {
    private readonly agent: Agent<unknown, 'text'>;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {
        this.agent = new Agent({
            name: 'AgentName1',
            instructions: RoleInstructions.개발자 + ToneInstructions.공손한말투,
            model: GptAiModel.GPT_3_5_TURBO,
        });
    }

    async summarizeText(text: string): Promise<string> {
        const apiUrl = `${this.configService.get<string>('OPEN_AI_API_HOST')}/v1/chat/completions`;

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.configService.get<string>('OPEN_AI_API_KEY')}`,
        };

        const body = {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: '당신은 문서를 요약해주는 전문 요약봇입니다.',
                },
                {
                    role: 'user',
                    content: `다음 문서를 요약해줘:\n\n${text}`,
                },
            ],
            temperature: 0.7,
        };

        const response = await firstValueFrom(this.httpService.post(apiUrl, body, { headers }));

        return response.data.choices[0].message.content.trim();
    }

    async askOpenAi(question: string): Promise<string> {
        try {
            const answer = await run(this.agent as any, question);

            return answer.finalOutput;
        } catch (error) {
            throw new InternalServerErrorException(
                '오픈 AI API 에러가 발생했습니다. 잠시후 다시 시도해주세요.',
            );
        }
    }
}
