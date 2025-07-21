import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApplicationStatus } from '../../shared/enums/status.enum';

export class UpdateApplicationDto {
    @ApiProperty({ description: '지원 상태', enum: ApplicationStatus, required: false })
    @IsOptional()
    @IsEnum(ApplicationStatus)
    status?: ApplicationStatus;

    @ApiProperty({ description: '자기소개서', required: false })
    @IsOptional()
    @IsString()
    coverLetter?: string;
}
