import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../shared/enums/status.enum';

export class ApplicationResponseDto {
    @ApiProperty({ description: '지원 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '채용공고 ID', example: 1 })
    jobId: number;

    @ApiProperty({ description: '지원자 ID', example: 1 })
    applicantId: number;

    @ApiProperty({ description: '이력서 ID', example: 1, required: false })
    resumeId?: number;

    @ApiProperty({
        description: '자기소개서',
        example: '귀하의 회사에 지원하게 된 이유는...',
        required: false,
    })
    coverLetter?: string;

    @ApiProperty({
        description: '지원 상태',
        enum: ApplicationStatus,
        example: ApplicationStatus.PENDING,
    })
    status: ApplicationStatus;

    @ApiProperty({ description: '채용공고 정보', required: false })
    job?: {
        id: number;
        title: string;
        company: {
            id: number;
            name: string;
        };
    };

    @ApiProperty({ description: '지원자 정보', required: false })
    applicant?: {
        id: number;
        name: string;
        email: string;
    };

    @ApiProperty({ description: '지원일', example: '2024-01-01T00:00:00Z' })
    appliedAt: Date;

    @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
    updatedAt: Date;
}
