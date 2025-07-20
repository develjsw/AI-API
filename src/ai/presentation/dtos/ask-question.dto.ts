import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AskQuestionDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 1000)
    question: string;
}

export class GenerateContentDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 2000)
    text: string;
}

export class SummarizeTextDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 5000)
    text: string;
}
