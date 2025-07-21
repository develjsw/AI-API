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
import { CompanyService } from './service/company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';
import { PaginationDto, PaginationResponseDto } from '../shared/dto/common.dto';

@ApiTags('회사')
@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    @ApiOperation({ summary: '회사 생성' })
    @ApiResponse({ status: 201, description: '회사가 성공적으로 생성됨', type: CompanyResponseDto })
    @ApiResponse({ status: 409, description: '이미 존재하는 회사명' })
    async createCompany(@Body() createCompanyDto: CreateCompanyDto): Promise<CompanyResponseDto> {
        return this.companyService.createCompany(createCompanyDto);
    }

    @Get()
    @ApiOperation({ summary: '회사 목록 조회' })
    @ApiResponse({
        status: 200,
        description: '회사 목록이 성공적으로 조회됨',
        type: PaginationResponseDto,
    })
    @ApiQuery({ name: 'page', required: false, type: Number, description: '페이지 번호' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: '페이지 크기' })
    @ApiQuery({ name: 'search', required: false, type: String, description: '검색어' })
    async getCompanyList(
        @Query() paginationDto: PaginationDto,
        @Query('search') search?: string,
    ): Promise<PaginationResponseDto<CompanyResponseDto>> {
        return this.companyService.getCompanyList(paginationDto, { search });
    }

    @Get(':id')
    @ApiOperation({ summary: '회사 상세 조회' })
    @ApiResponse({ status: 200, description: '회사가 성공적으로 조회됨', type: CompanyResponseDto })
    @ApiResponse({ status: 404, description: '회사를 찾을 수 없음' })
    async getCompanyById(@Param('id', ParseIntPipe) id: number): Promise<CompanyResponseDto> {
        return this.companyService.getCompanyById(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: '회사 정보 수정' })
    @ApiResponse({
        status: 200,
        description: '회사 정보가 성공적으로 수정됨',
        type: CompanyResponseDto,
    })
    @ApiResponse({ status: 404, description: '회사를 찾을 수 없음' })
    @ApiResponse({ status: 409, description: '이미 존재하는 회사명' })
    async updateCompany(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCompanyDto: UpdateCompanyDto,
    ): Promise<CompanyResponseDto> {
        return this.companyService.updateCompany(id, updateCompanyDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: '회사 삭제' })
    @ApiResponse({ status: 200, description: '회사가 성공적으로 삭제됨' })
    @ApiResponse({ status: 404, description: '회사를 찾을 수 없음' })
    async deleteCompany(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.companyService.deleteCompany(id);
    }
}
