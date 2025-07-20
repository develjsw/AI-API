import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { setDefaultOpenAIKey } from '@openai/agents';
import { SummarizeTextUseCase } from '../../application/use-cases/open-ai/summarize-text.use-case';
import { AskQuestionUseCase } from '../../application/use-cases/open-ai/ask-question.use-case';
import { AskQuestionDto, SummarizeTextDto } from '../dtos/ask-question.dto';

@Controller('open-ai')
export class OpenAiController implements OnModuleInit {
    constructor(
        private readonly summarizeTextUseCase: SummarizeTextUseCase,
        private readonly askQuestionUseCase: AskQuestionUseCase,
    ) {}

    onModuleInit() {
        setDefaultOpenAIKey(process.env.OPEN_AI_API_KEY);
    }

    @Post('summarize')
    async summarizeText(@Body() { text }: SummarizeTextDto): Promise<string> {
        return await this.summarizeTextUseCase.execute(text);
    }

    @Post('ask')
    async askQuestion(@Body() { question }: AskQuestionDto): Promise<string> {
        return await this.askQuestionUseCase.execute(question);
    }
}
