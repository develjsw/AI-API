import { Body, Controller, Post } from '@nestjs/common';
import { OpenAiService } from './service/open-ai.service';

@Controller('open-ai')
export class OpenAiController {
    constructor(private readonly openAiService: OpenAiService) {}

    @Post('summarize')
    async summarizeText(@Body('text') text: string) {
        return await this.openAiService.summarizeText(text);
    }
}
