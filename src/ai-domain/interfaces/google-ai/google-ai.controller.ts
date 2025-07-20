import { Body, Controller, Post } from '@nestjs/common';
import { GenerateContentUseCase } from '../../application/google-ai/generate-content.usecase';

@Controller('google-ai')
export class GoogleAiController {
    constructor(private readonly generateContentUseCase: GenerateContentUseCase) {}

    @Post('contents')
    async generateContent(@Body('text') text: string) {
        return await this.generateContentUseCase.execute(text);
    }
}
