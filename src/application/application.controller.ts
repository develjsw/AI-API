import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ApplicationService } from './service/application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationResponseDto } from './dto/application-response.dto';
import { PaginationDto, PaginationResponseDto } from '../shared/dto/common.dto';
import { ApplicationStatus } from '../shared/enums/status.enum';

@ApiTags('지원서')
@Controller('applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Post()
    @ApiOperation({ summary: '지원서 생성' })
    @ApiResponse({
        status: 201,
        description: '지원서가 성공적으로 생성됨',
        type: ApplicationResponseDto,
    })
    @ApiResponse({ status: 409, description: '이미 지원한 채용공고' })
    async createApplication(
        @Body() createApplicationDto: CreateApplicationDto,
    ): Promise<ApplicationResponseDto> {
        return this.applicationService.createApplication(createApplicationDto);
    }

    @Get()
    @ApiOperation({ summary: '지원서 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '지원서 목록이 성공적으로 조회됨',
        type: PaginationResponseDto,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지 크기' })
    @ApiQuery({ name: 'jobId', required: false, type: Number, description: '채용공고 ID' })
    @ApiQuery({ name: 'applicantId', required: false, type: Number, description: '지원자 ID' })
    @ApiQuery({
        name: 'status',
        required: false,
        enum: ApplicationStatus,
        description: '지원 상태',
    })
    async getApplicationList(
        @Query() paginationDto: PaginationDto,
        @Query('jobId', new ParseIntPipe({ optional: true })) jobId?: number,
        @Query('applicantId', new ParseIntPipe({ optional: true })) applicantId?: number,
        @Query('status') status?: ApplicationStatus,
    ): Promise<PaginationResponseDto<ApplicationResponseDto>> {
        return this.applicationService.getApplicationList(paginationDto, {
            jobId,
            applicantId,
            status,
        });
    }

    @Get(':id')
    @ApiOperation({ summary: '지원서 상세 조회' })
    @ApiResponse({
        status: 200,
        description: '지원서가 성공적으로 조회됨',
        type: ApplicationResponseDto,
    })
    @ApiResponse({ status: 404, description: '지원서를 찾을 수 없음' })
    async getApplicationById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ApplicationResponseDto> {
        return this.applicationService.getApplicationById(id);
    }

    @Get('job/:jobId')
    @ApiOperation({ summary: '채용공고별 지원서 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '채용공고별 지원서 목록이 성공적으로 조회됨',
        type: [ApplicationResponseDto],
    })
    async getApplicationsByJobId(
        @Param('jobId', ParseIntPipe) jobId: number,
    ): Promise<ApplicationResponseDto[]> {
        return this.applicationService.getApplicationsByJobId(jobId);
    }

    @Get('applicant/:applicantId')
    @ApiOperation({ summary: '지원자별 지원서 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '지원자별 지원서 목록이 성공적으로 조회됨',
        type: [ApplicationResponseDto],
    })
    async getApplicationsByApplicantId(
        @Param('applicantId', ParseIntPipe) applicantId: number,
    ): Promise<ApplicationResponseDto[]> {
        return this.applicationService.getApplicationsByApplicantId(applicantId);
    }

    @Patch(':id')
    @ApiOperation({ summary: '지원서 수정' })
    @ApiResponse({
        status: 200,
        description: '지원서가 성공적으로 수정됨',
        type: ApplicationResponseDto,
    })
    @ApiResponse({ status: 404, description: '지원서를 찾을 수 없음' })
    async updateApplication(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateApplicationDto: UpdateApplicationDto,
    ): Promise<ApplicationResponseDto> {
        return this.applicationService.updateApplication(id, updateApplicationDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '지원서 삭제' })
    @ApiResponse({ status: 200, description: '지원서가 성공적으로 삭제됨' })
    @ApiResponse({ status: 404, description: '지원서를 찾을 수 없음' })
    async deleteApplication(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.applicationService.deleteApplication(id);
    }
}
