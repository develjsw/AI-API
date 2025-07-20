export class AiRequest {
    constructor(
        public readonly id: string,
        public readonly text: string,
        public readonly provider: 'google' | 'openai',
        public readonly timestamp: Date = new Date(),
    ) {}

    static create(text: string, provider: 'google' | 'openai'): AiRequest {
        return new AiRequest(
            Math.random().toString(36).substring(2, 15),
            text,
            provider,
            new Date(),
        );
    }
}

export class AiResponse {
    constructor(
        public readonly id: string,
        public readonly requestId: string,
        public readonly content: string,
        public readonly provider: 'google' | 'openai',
        public readonly timestamp: Date = new Date(),
    ) {}

    static create(requestId: string, content: string, provider: 'google' | 'openai'): AiResponse {
        return new AiResponse(
            Math.random().toString(36).substring(2, 15),
            requestId,
            content,
            provider,
            new Date(),
        );
    }
}