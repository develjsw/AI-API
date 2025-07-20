import { Body, Controller, Post } from '@nestjs/common';
import { GenerateContentUseCase } from '../../application/use-cases/google-ai/generate-content.use-case';
import { GenerateContentDto } from '../dtos/ask-question.dto';

@Controller('google-ai')
export class GoogleAiController {
    constructor(private readonly generateContentUseCase: GenerateContentUseCase) {}

    @Post('contents')
    async generateContent(@Body() { text }: GenerateContentDto): Promise<string> {
        return await this.generateContentUseCase.execute(text);
    }
}