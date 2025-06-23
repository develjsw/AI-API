import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiService {
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
    ) {}

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
}
