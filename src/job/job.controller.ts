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
import { JobService } from './service/job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JobResponseDto } from './dto/job-response.dto';
import { PaginationDto, PaginationResponseDto } from '../shared/dto/common.dto';
import { JobStatus } from '../shared/enums/status.enum';

@ApiTags('채용공고')
@Controller('jobs')
export class JobController {
    constructor(private readonly jobService: JobService) {}

    @Post()
    @ApiOperation({ summary: '채용공고 생성' })
    @ApiResponse({ status: 201, description: '채용공고가 성공적으로 생성됨', type: JobResponseDto })
    async createJob(@Body() createJobDto: CreateJobDto): Promise<JobResponseDto> {
        return this.jobService.createJob(createJobDto);
    }

    @Get()
    @ApiOperation({ summary: '채용공고 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '채용공고 목록이 성공적으로 조회됨',
        type: PaginationResponseDto,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지 크기' })
    @ApiQuery({ name: 'status', required: false, enum: JobStatus, description: '채용공고 상태' })
    @ApiQuery({ name: 'companyId', required: false, type: Number, description: '회사 ID' })
    @ApiQuery({ name: 'search', required: false, type: String, description: '검색어' })
    async getJobList(
        @Query() paginationDto: PaginationDto,
        @Query('status') status?: JobStatus,
        @Query('companyId', new ParseIntPipe({ optional: true })) companyId?: number,
        @Query('search') search?: string,
    ): Promise<PaginationResponseDto<JobResponseDto>> {
        return this.jobService.getJobList(paginationDto, { status, companyId, search });
    }

    @Get(':id')
    @ApiOperation({ summary: '채용공고 상세 조회' })
    @ApiResponse({ status: 200, description: '채용공고가 성공적으로 조회됨', type: JobResponseDto })
    @ApiResponse({ status: 404, description: '채용공고를 찾을 수 없음' })
    async getJobById(@Param('id', ParseIntPipe) id: number): Promise<JobResponseDto> {
        return this.jobService.getJobById(id);
    }

    @Get('company/:companyId')
    @ApiOperation({ summary: '회사별 채용공고 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '회사별 채용공고 목록이 성공적으로 조회됨',
        type: [JobResponseDto],
    })
    async getJobsByCompanyId(
        @Param('companyId', ParseIntPipe) companyId: number,
    ): Promise<JobResponseDto[]> {
        return this.jobService.getJobsByCompanyId(companyId);
    }

    @Patch(':id')
    @ApiOperation({ summary: '채용공고 수정' })
    @ApiResponse({ status: 200, description: '채용공고가 성공적으로 수정됨', type: JobResponseDto })
    @ApiResponse({ status: 404, description: '채용공고를 찾을 수 없음' })
    async updateJob(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateJobDto: UpdateJobDto,
    ): Promise<JobResponseDto> {
        return this.jobService.updateJob(id, updateJobDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '채용공고 삭제' })
    @ApiResponse({ status: 200, description: '채용공고가 성공적으로 삭제됨' })
    @ApiResponse({ status: 404, description: '채용공고를 찾을 수 없음' })
    async deleteJob(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.jobService.deleteJob(id);
    }
}
