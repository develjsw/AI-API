import { Module } from '@nestjs/common';
import { GoogleAiController } from './google-ai.controller';
import { GoogleAiService } from './service/google-ai.service';

@Module({
    imports: [],
    controllers: [GoogleAiController],
    providers: [GoogleAiService],
    exports: [],
})
export class GoogleAiModule {}
