import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAiApplicationService } from '../application/googleai-application.service';

@Controller('google-ai')
export class GoogleAiController {
    constructor(private readonly googleAiApplicationService: GoogleAiApplicationService) {}

    @Post('contents')
    async generateContent(@Body('text') text: string) {
        return await this.googleAiApplicationService.generateContent(text);
    }
}
