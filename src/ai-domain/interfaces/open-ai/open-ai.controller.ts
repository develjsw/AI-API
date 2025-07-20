import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { SummarizeTextUseCase } from '../../application/open-ai/summarize-text.usecase';
import { AskOpenAiUseCase } from '../../application/open-ai/ask-open-ai.usecase';
import { AskOpenAiDto } from './ask-open-ai.dto';
import { setDefaultOpenAIKey } from '@openai/agents';

@Controller('open-ai')
export class OpenAiController implements OnModuleInit {
    constructor(
        private readonly summarizeTextUseCase: SummarizeTextUseCase,
        private readonly askOpenAiUseCase: AskOpenAiUseCase,
    ) {}

    onModuleInit() {
        setDefaultOpenAIKey(process.env.OPEN_AI_API_KEY);
    }

    @Post('summarize')
    async summarizeText(@Body('text') text: string) {
        return await this.summarizeTextUseCase.execute(text);
    }

    @Post('ask')
    async askOpenAi(@Body() { question }: AskOpenAiDto): Promise<string> {
        return await this.askOpenAiUseCase.execute(question);
    }
}
