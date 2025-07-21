import { ApiProperty } from '@nestjs/swagger';

export class ApplicantResponseDto {
    @ApiProperty({ description: '지원자 ID', example: 1 })
    id: number;

    @ApiProperty({ description: '이메일', example: 'user@example.com' })
    email: string;

    @ApiProperty({ description: '이름', example: '홍길동' })
    name: string;

    @ApiProperty({ description: '전화번호', example: '010-1234-5678', required: false })
    phone?: string;

    @ApiProperty({ description: '주소', example: '서울시 강남구', required: false })
    address?: string;

    @ApiProperty({ description: '생성일', example: '2024-01-01T00:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: '수정일', example: '2024-01-01T00:00:00Z' })
    updatedAt: Date;
}
