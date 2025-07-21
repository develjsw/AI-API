import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateApplicationDto {
    @ApiProperty({ description: '채용공고 ID', example: 1 })
    @IsInt()
    jobId: number;

    @ApiProperty({ description: '지원자 ID', example: 1 })
    @IsInt()
    applicantId: number;

    @ApiProperty({ description: '이력서 ID', example: 1, required: false })
    @IsOptional()
    @IsInt()
    resumeId?: number;

    @ApiProperty({
        description: '자기소개서',
        example: '귀하의 회사에 지원하게 된 이유는...',
        required: false,
    })
    @IsOptional()
    @IsString()
    coverLetter?: string;
}
