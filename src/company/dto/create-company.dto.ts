import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({ description: '회사명', example: '테크 컴퍼니' })
    @IsString()
    name: string;

    @ApiProperty({
        description: '회사 설명',
        example: '혁신적인 기술 회사입니다.',
        required: false,
    })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({
        description: '회사 주소',
        example: '서울시 강남구 테헤란로 123',
        required: false,
    })
    @IsOptional()
    @IsString()
    address?: string;

    @ApiProperty({ description: '회사 웹사이트', example: 'https://example.com', required: false })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ description: '회사 이메일', example: 'hr@example.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ description: '회사 전화번호', example: '02-1234-5678', required: false })
    @IsOptional()
    @IsString()
    phone?: string;
}
