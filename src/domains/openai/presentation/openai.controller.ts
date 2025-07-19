import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { setDefaultOpenAIKey } from '@openai/agents';
import { AskOpenAiDto } from './dto/ask-openai.dto';
import { OpenAiApplicationService } from '../application/openai-application.service';

@Controller('open-ai')
export class OpenAiController implements OnModuleInit {
    constructor(private readonly openAiApplicationService: OpenAiApplicationService) {}

    onModuleInit() {
        setDefaultOpenAIKey(process.env.OPEN_AI_API_KEY);
    }

    @Post('summarize')
    async summarizeText(@Body('text') text: string) {
        return await this.openAiApplicationService.summarizeText(text);
    }

    @Post('ask')
    async askOpenAi(@Body() { question }: AskOpenAiDto): Promise<string> {
        return await this.openAiApplicationService.askOpenAi(question);
    }
}
