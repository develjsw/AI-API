import { ApiProperty } from '@nestjs/swagger';
import { JobStatus } from '../../shared/enums/status.enum';

export class JobResponseDto {
    @ApiProperty({ description: '채용공고 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '채용공고 제목', example: '백엔드 개발자 모집' })
    title: string;

    @ApiProperty({
        description: '채용공고 상세 설명',
        example: 'Node.js 백엔드 개발자를 모집합니다.',
    })
    description: string;

    @ApiProperty({ description: '요구사항', example: 'Node.js 3년 이상 경험', required: false })
    requirements?: string;

    @ApiProperty({ description: '근무지', example: '서울시 강남구', required: false })
    location?: string;

    @ApiProperty({ description: '급여', example: '연봉 4000만원~6000만원', required: false })
    salary?: string;

    @ApiProperty({ description: '고용형태', example: '정규직', required: false })
    employmentType?: string;

    @ApiProperty({ description: '상태', enum: JobStatus, example: JobStatus.ACTIVE })
    status: JobStatus;

    @ApiProperty({ description: '마감일', example: '2024-12-31T23:59:59Z', required: false })
    deadline?: Date;

    @ApiProperty({ description: '회사 ID', example: 1 })
    companyId: number;

    @ApiProperty({ description: '회사 정보', required: false })
    company?: {
        id: number;
        name: string;
        description?: string;
    };

    @ApiProperty({ description: '생성일', example: '2024-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
    updatedAt: Date;
}
