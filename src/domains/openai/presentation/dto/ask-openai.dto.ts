import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AskOpenAiDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 1000)
    question: string;
}
