import { Injectable } from '@nestjs/common';
import { OpenAiDomainService } from '../domain/services';
import { OpenAiInfrastructureService } from '../infrastructure/openai-infrastructure.service';

@Injectable()
export class OpenAiApplicationService implements OpenAiDomainService {
    constructor(private readonly openAiInfrastructureService: OpenAiInfrastructureService) {}

    async summarizeText(text: string): Promise<string> {
        return this.openAiInfrastructureService.summarizeText(text);
    }

    async askOpenAi(question: string): Promise<string> {
        return this.openAiInfrastructureService.askOpenAi(question);
    }
}
