import { Injectable } from '@nestjs/common';
import { GoogleAiDomainService } from '../domain/services';
import { GoogleAiInfrastructureService } from '../infrastructure/googleai-infrastructure.service';

@Injectable()
export class GoogleAiApplicationService implements GoogleAiDomainService {
    constructor(private readonly googleAiInfrastructureService: GoogleAiInfrastructureService) {}

    async generateContent(text: string): Promise<string> {
        return this.googleAiInfrastructureService.generateContent(text);
    }
}
