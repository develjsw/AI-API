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
import { ResumeService } from './service/resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeResponseDto } from './dto/resume-response.dto';
import { PaginationDto, PaginationResponseDto } from '../shared/dto/common.dto';

@ApiTags('이력서')
@Controller('resumes')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {}

    @Post()
    @ApiOperation({ summary: '이력서 생성' })
    @ApiResponse({
        status: 201,
        description: '이력서가 성공적으로 생성됨',
        type: ResumeResponseDto,
    })
    async createResume(@Body() createResumeDto: CreateResumeDto): Promise<ResumeResponseDto> {
        return this.resumeService.createResume(createResumeDto);
    }

    @Get()
    @ApiOperation({ summary: '이력서 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '이력서 목록이 성공적으로 조회됨',
        type: PaginationResponseDto,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지 크기' })
    @ApiQuery({ name: 'applicantId', required: false, type: Number, description: '지원자 ID' })
    @ApiQuery({ name: 'search', required: false, type: String, description: '검색어' })
    async getResumeList(
        @Query() paginationDto: PaginationDto,
        @Query('applicantId', new ParseIntPipe({ optional: true })) applicantId?: number,
        @Query('search') search?: string,
    ): Promise<PaginationResponseDto<ResumeResponseDto>> {
        return this.resumeService.getResumeList(paginationDto, { applicantId, search });
    }

    @Get(':id')
    @ApiOperation({ summary: '이력서 상세 조회' })
    @ApiResponse({
        status: 200,
        description: '이력서가 성공적으로 조회됨',
        type: ResumeResponseDto,
    })
    @ApiResponse({ status: 404, description: '이력서를 찾을 수 없음' })
    async getResumeById(@Param('id', ParseIntPipe) id: number): Promise<ResumeResponseDto> {
        return this.resumeService.getResumeById(id);
    }

    @Get('applicant/:applicantId')
    @ApiOperation({ summary: '지원자별 이력서 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '지원자별 이력서 목록이 성공적으로 조회됨',
        type: [ResumeResponseDto],
    })
    async getResumesByApplicantId(
        @Param('applicantId', ParseIntPipe) applicantId: number,
    ): Promise<ResumeResponseDto[]> {
        return this.resumeService.getResumesByApplicantId(applicantId);
    }

    @Patch(':id')
    @ApiOperation({ summary: '이력서 수정' })
    @ApiResponse({
        status: 200,
        description: '이력서가 성공적으로 수정됨',
        type: ResumeResponseDto,
    })
    @ApiResponse({ status: 404, description: '이력서를 찾을 수 없음' })
    async updateResume(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateResumeDto: UpdateResumeDto,
    ): Promise<ResumeResponseDto> {
        return this.resumeService.updateResume(id, updateResumeDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '이력서 삭제' })
    @ApiResponse({ status: 200, description: '이력서가 성공적으로 삭제됨' })
    @ApiResponse({ status: 404, description: '이력서를 찾을 수 없음' })
    async deleteResume(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.resumeService.deleteResume(id);
    }
}
