import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CompanyRepository } from '../repository/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyResponseDto } from '../dto/company-response.dto';
import { PaginationDto, PaginationResponseDto } from '../../shared/dto/common.dto';

@Injectable()
export class CompanyService {
    constructor(private readonly companyRepository: CompanyRepository) {}

    async createCompany(createCompanyDto: CreateCompanyDto): Promise<CompanyResponseDto> {
        const existingCompany = await this.companyRepository.findByName(createCompanyDto.name);
        if (existingCompany) {
            throw new ConflictException(
                `Company with name ${createCompanyDto.name} already exists`,
            );
        }

        const company = await this.companyRepository.insertCompany(createCompanyDto);
        return this.mapToResponseDto(company);
    }

    async getCompanyById(id: number): Promise<CompanyResponseDto> {
        const company = await this.companyRepository.findById(id);
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }
        return this.mapToResponseDto(company);
    }

    async getCompanyList(
        paginationDto: PaginationDto,
        filters?: { search?: string },
    ): Promise<PaginationResponseDto<CompanyResponseDto>> {
        const { page, limit } = paginationDto;
        const where: any = {};

        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        const { companies, total } = await this.companyRepository.findAll({
            page,
            limit,
            where,
        });

        const data = companies.map((company) => this.mapToResponseDto(company));
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async updateCompany(
        id: number,
        updateCompanyDto: UpdateCompanyDto,
    ): Promise<CompanyResponseDto> {
        await this.getCompanyById(id);

        if (updateCompanyDto.name) {
            const existingCompany = await this.companyRepository.findByName(updateCompanyDto.name);
            if (existingCompany && existingCompany.id !== id) {
                throw new ConflictException(
                    `Company with name ${updateCompanyDto.name} already exists`,
                );
            }
        }

        const updatedCompany = await this.companyRepository.updateCompanyById(id, updateCompanyDto);
        return this.mapToResponseDto(updatedCompany);
    }

    async deleteCompany(id: number): Promise<void> {
        await this.getCompanyById(id);
        await this.companyRepository.deleteCompanyById(id);
    }

    private mapToResponseDto(company: any): CompanyResponseDto {
        return {
            id: company.id,
            name: company.name,
            description: company.description,
            address: company.address,
            website: company.website,
            email: company.email,
            phone: company.phone,
            jobCount: company._count?.jobs,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        };
    }
}
