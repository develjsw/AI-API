import { ApiProperty } from '@nestjs/swagger';

export class CompanyResponseDto {
    @ApiProperty({ description: '회사 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '회사명', example: '테크 컴퍼니' })
    name: string;

    @ApiProperty({
        description: '회사 설명',
        example: '혁신적인 기술 회사입니다.',
        required: false,
    })
    description?: string;

    @ApiProperty({
        description: '회사 주소',
        example: '서울시 강남구 테헤란로 123',
        required: false,
    })
    address?: string;

    @ApiProperty({ description: '회사 웹사이트', example: 'https://example.com', required: false })
    website?: string;

    @ApiProperty({ description: '회사 이메일', example: 'hr@example.com', required: false })
    email?: string;

    @ApiProperty({ description: '회사 전화번호', example: '02-1234-5678', required: false })
    phone?: string;

    @ApiProperty({ description: '등록 채용공고 수', example: 5, required: false })
    jobCount?: number;

    @ApiProperty({ description: '생성일', example: '2024-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
    updatedAt: Date;
}
