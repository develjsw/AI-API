import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Agent, run } from '@openai/agents';
import { GptAiModelEnum } from '../../domains/open-ai/gpt-ai-model.enum';
import {
    RoleInstructionsEnum,
    ToneInstructionsEnum,
} from '../../domains/open-ai/instructions.enum';

@Injectable()
export class AskOpenAiUseCase {
    private readonly agent = new Agent({
        name: 'AgentName1',
        instructions: RoleInstructionsEnum.개발자 + ToneInstructionsEnum.공손한말투,
        model: GptAiModelEnum.GPT_3_5_TURBO,
    });

    async execute(question: string): Promise<string> {
        try {
            const answer = await run(this.agent, question);
            return answer.finalOutput;
        } catch (error) {
            throw new InternalServerErrorException(
                '오픈 AI API 에러가 발생했습니다. 잠시후 다시 시도해주세요.',
            );
        }
    }
}
