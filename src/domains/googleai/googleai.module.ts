import { Module } from '@nestjs/common';
import { GoogleAiController } from './presentation/googleai.controller';
import { GoogleAiApplicationService } from './application/googleai-application.service';
import { GoogleAiInfrastructureService } from './infrastructure/googleai-infrastructure.service';

@Module({
    controllers: [GoogleAiController],
    providers: [GoogleAiApplicationService, GoogleAiInfrastructureService],
    exports: [GoogleAiApplicationService],
})
export class GoogleAiModule {}
