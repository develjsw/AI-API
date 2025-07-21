import { ApiProperty } from '@nestjs/swagger';

export class ResumeResponseDto {
    @ApiProperty({ description: '이력서 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '이력서 제목', example: '백엔드 개발자 이력서' })
    title: string;

    @ApiProperty({ description: '이력서 내용', example: '안녕하세요. 백엔드 개발자를 희망합니다.' })
    content: string;

    @ApiProperty({
        description: '기술 스택',
        example: 'Node.js, TypeScript, NestJS',
        required: false,
    })
    skills?: string;

    @ApiProperty({ description: '경력 사항', example: '3년 백엔드 개발 경험', required: false })
    experience?: string;

    @ApiProperty({ description: '학력', example: '컴퓨터공학과 학사', required: false })
    education?: string;

    @ApiProperty({ description: '지원자 ID', example: 1 })
    applicantId: number;

    @ApiProperty({ description: '지원자 정보', required: false })
    applicant?: {
        id: number;
        name: string;
        email: string;
    };

    @ApiProperty({ description: '생성일', example: '2024-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
    updatedAt: Date;
}
