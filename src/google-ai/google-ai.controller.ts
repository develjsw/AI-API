import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAiService } from './service/google-ai.service';

@Controller('google-ai')
export class GoogleAiController {
    constructor(private readonly googleAiService: GoogleAiService) {}

    @Post('contents')
    async generateContent(@Body('text') text: string) {
        return await this.googleAiService.generateContent(text);
    }
}
