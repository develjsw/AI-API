import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateResumeDto {
    @ApiProperty({ description: '이력서 제목', example: '백엔드 개발자 이력서' })
    @IsString()
    title: string;

    @ApiProperty({ description: '이력서 내용', example: '안녕하세요. 백엔드 개발자를 희망합니다.' })
    @IsString()
    content: string;

    @ApiProperty({
        description: '기술 스택',
        example: 'Node.js, TypeScript, NestJS',
        required: false,
    })
    @IsOptional()
    @IsString()
    skills?: string;

    @ApiProperty({ description: '경력 사항', example: '3년 백엔드 개발 경험', required: false })
    @IsOptional()
    @IsString()
    experience?: string;

    @ApiProperty({ description: '학력', example: '컴퓨터공학과 학사', required: false })
    @IsOptional()
    @IsString()
    education?: string;

    @ApiProperty({ description: '지원자 ID', example: 1 })
    @IsInt()
    applicantId: number;
}
