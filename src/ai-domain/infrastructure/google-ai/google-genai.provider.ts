import { Provider } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { ConfigService } from '@nestjs/config';

export const GoogleGenAiProvider: Provider = {
    provide: GoogleGenAI,
    useFactory: (configService: ConfigService) => {
        return new GoogleGenAI({
            apiKey: configService.get<string>('GOOGLE_AI_API_KEY'),
        });
    },
    inject: [ConfigService],
};
