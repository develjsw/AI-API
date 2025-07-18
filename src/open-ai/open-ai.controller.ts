import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { OpenAiService } from './service/open-ai.service';
import { setDefaultOpenAIKey } from '@openai/agents';
import { AskOpenAiDto } from './dto/ask-open-ai.dto';

@Controller('open-ai')
export class OpenAiController implements OnModuleInit {
    constructor(private readonly openAiService: OpenAiService) {}

    onModuleInit() {
        setDefaultOpenAIKey(process.env.OPEN_AI_API_KEY);
    }

    @Post('summarize')
    async summarizeText(@Body('text') text: string) {
        return await this.openAiService.summarizeText(text);
    }

    @Post('ask')
    async askOpenAi(@Body() { question }: AskOpenAiDto): Promise<string> {
        return await this.openAiService.askOpenAi(question);
    }
}
