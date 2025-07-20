export enum GoogleAiModel {
    GEMINI_2_5_PRO = 'gemini-2.5-pro',
    GEMINI_2_5_FLASH = 'gemini-2.5-flash',
    GEMINI_2_5_FLASH_LITE_PREVIEW_06_17 = 'gemini-2.5-flash-lite-preview-06-17',
    GEMINI_2_5_FLASH_PREVIEW_NATIVE_AUDIO_DIALOG = 'gemini-2.5-flash-preview-native-audio-dialog',
    GEMINI_2_5_FLASH_EXP_NATIVE_AUDIO_THINKING_DIALOG = 'gemini-2.5-flash-exp-native-audio-thinking-dialog',
    GEMINI_2_5_FLASH_PREVIEW_TTS = 'gemini-2.5-flash-preview-tts',
    GEMINI_2_5_PRO_PREVIEW_TTS = 'gemini-2.5-pro-preview-tts',
    GEMINI_2_0_FLASH = 'gemini-2.0-flash',
}

export enum OpenAiModel {
    GPT_3_5_TURBO = 'gpt-3.5-turbo',
    GPT_4 = 'gpt-4o',
    GPT_4_TURBO = 'gpt-4-turbo',
}

export enum RoleInstruction {
    HISTORY_TEACHER = '너는 역사 선생님이야. 사용자가 질문하면 대한민국 기준으로 역사에 대한 답변을 해줘.',
    DEVELOPER = '너는 개발자야. 개발용어, 기술적인 내용을 포함해서 질문에 답해줘.',
    DESIGNER = '너는 디자이너야. 디자인 감각을 가지고 내용에 답해줘.',
}

export enum ToneInstruction {
    FRIENDLY = '~해볼까?, ~하는게어때?, ~해보자 등의 말투를 사용해줘.',
    CHIC = '~해, ~하지마, ~안 돼 등의 말투를 사용해줘.',
    POLITE = '~합니다, ~입니다, ~할까요? 등의 말투를 사용해줘.',
}
