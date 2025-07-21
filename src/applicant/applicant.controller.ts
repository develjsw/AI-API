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
import { ApplicantService } from './service/applicant.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { ApplicantResponseDto } from './dto/applicant-response.dto';
import { PaginationDto, PaginationResponseDto } from '../shared/dto/common.dto';

@ApiTags('지원자')
@Controller('applicants')
export class ApplicantController {
    constructor(private readonly applicantService: ApplicantService) {}

    @Post()
    @ApiOperation({ summary: '지원자 생성' })
    @ApiResponse({
        status: 201,
        description: '지원자가 성공적으로 생성됨',
        type: ApplicantResponseDto,
    })
    @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
    async createApplicant(
        @Body() createApplicantDto: CreateApplicantDto,
    ): Promise<ApplicantResponseDto> {
        return this.applicantService.createApplicant(createApplicantDto);
    }

    @Get()
    @ApiOperation({ summary: '지원자 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '지원자 목록이 성공적으로 조회됨',
        type: PaginationResponseDto,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지 크기' })
    @ApiQuery({ name: 'search', required: false, type: String, description: '검색어' })
    async getApplicantList(
        @Query() paginationDto: PaginationDto,
        @Query('search') search?: string,
    ): Promise<PaginationResponseDto<ApplicantResponseDto>> {
        return this.applicantService.getApplicantList(paginationDto, { search });
    }

    @Get(':id')
    @ApiOperation({ summary: '지원자 상세 조회' })
    @ApiResponse({
        status: 200,
        description: '지원자가 성공적으로 조회됨',
        type: ApplicantResponseDto,
    })
    @ApiResponse({ status: 404, description: '지원자를 찾을 수 없음' })
    async getApplicantById(@Param('id', ParseIntPipe) id: number): Promise<ApplicantResponseDto> {
        return this.applicantService.getApplicantById(id);
    }

    @Get('email/:email')
    @ApiOperation({ summary: '이메일로 지원자 조회' })
    @ApiResponse({
        status: 200,
        description: '지원자가 성공적으로 조회됨',
        type: ApplicantResponseDto,
    })
    @ApiResponse({ status: 404, description: '지원자를 찾을 수 없음' })
    async getApplicantByEmail(@Param('email') email: string): Promise<ApplicantResponseDto> {
        return this.applicantService.getApplicantByEmail(email);
    }

    @Patch(':id')
    @ApiOperation({ summary: '지원자 정보 수정' })
    @ApiResponse({
        status: 200,
        description: '지원자 정보가 성공적으로 수정됨',
        type: ApplicantResponseDto,
    })
    @ApiResponse({ status: 404, description: '지원자를 찾을 수 없음' })
    @ApiResponse({ status: 409, description: '이미 존재하는 이메일' })
    async updateApplicant(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateApplicantDto: UpdateApplicantDto,
    ): Promise<ApplicantResponseDto> {
        return this.applicantService.updateApplicant(id, updateApplicantDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '지원자 삭제' })
    @ApiResponse({ status: 200, description: '지원자가 성공적으로 삭제됨' })
    @ApiResponse({ status: 404, description: '지원자를 찾을 수 없음' })
    async deleteApplicant(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.applicantService.deleteApplicant(id);
    }
}
