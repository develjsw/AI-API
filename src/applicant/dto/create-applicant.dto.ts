import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateApplicantDto {
    @ApiProperty({ description: '이메일', example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: '이름', example: '홍길동' })
    @IsString()
    name: string;

    @ApiProperty({ description: '전화번호', example: '010-1234-5678', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ description: '주소', example: '서울시 강남구', required: false })
    @IsOptional()
    @IsString()
    address?: string;
}
