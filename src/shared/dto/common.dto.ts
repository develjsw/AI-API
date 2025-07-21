import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDto {
    @ApiProperty({ description: '페이지 번호', example: 1, required: false })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @ApiProperty({ description: '페이지 크기', example: 10, required: false })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;
}

export class PaginationResponseDto<T> {
    @ApiProperty({ description: '데이터 목록' })
    data: T[];

    @ApiProperty({ description: '총 데이터 수' })
    total: number;

    @ApiProperty({ description: '현재 페이지' })
    page: number;

    @ApiProperty({ description: '페이지 크기' })
    limit: number;

    @ApiProperty({ description: '총 페이지 수' })
    totalPages: number;
}

export class BaseResponseDto {
    @ApiProperty({ description: '성공 여부' })
    success: boolean;

    @ApiProperty({ description: '메시지' })
    message: string;
}
