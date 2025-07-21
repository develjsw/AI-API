import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsDateString, IsEnum } from 'class-validator';
import { JobStatus } from '../../shared/enums/status.enum';

export class CreateJobDto {
    @ApiProperty({ description: '채용공고 제목', example: '백엔드 개발자 모집' })
    @IsString()
    title: string;

    @ApiProperty({
        description: '채용공고 상세 설명',
        example: 'Node.js 백엔드 개발자를 모집합니다.',
    })
    @IsString()
    description: string;

    @ApiProperty({ description: '요구사항', example: 'Node.js 3년 이상 경험', required: false })
    @IsOptional()
    @IsString()
    requirements?: string;

    @ApiProperty({ description: '근무지', example: '서울시 강남구', required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ description: '급여', example: '연봉 4000만원~6000만원', required: false })
    @IsOptional()
    @IsString()
    salary?: string;

    @ApiProperty({ description: '고용형태', example: '정규직', required: false })
    @IsOptional()
    @IsString()
    employmentType?: string;

    @ApiProperty({
        description: '상태',
        enum: JobStatus,
        example: JobStatus.ACTIVE,
        required: false,
    })
    @IsOptional()
    @IsEnum(JobStatus)
    status?: JobStatus;

    @ApiProperty({ description: '마감일', example: '2024-12-31T23:59:59Z', required: false })
    @IsOptional()
    @IsDateString()
    deadline?: string;

    @ApiProperty({ description: '회사 ID', example: 1 })
    @IsInt()
    companyId: number;
}
