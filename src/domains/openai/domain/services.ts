export interface OpenAiDomainService {
    summarizeText(text: string): Promise<string>;
    askOpenAi(question: string): Promise<string>;
}
