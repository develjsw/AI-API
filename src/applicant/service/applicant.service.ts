import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ApplicantRepository } from '../repository/applicant.repository';
import { CreateApplicantDto } from '../dto/create-applicant.dto';
import { UpdateApplicantDto } from '../dto/update-applicant.dto';
import { ApplicantResponseDto } from '../dto/applicant-response.dto';
import { PaginationDto, PaginationResponseDto } from '../../shared/dto/common.dto';

@Injectable()
export class ApplicantService {
    constructor(private readonly applicantRepository: ApplicantRepository) {}

    async createApplicant(createApplicantDto: CreateApplicantDto): Promise<ApplicantResponseDto> {
        const existingApplicant = await this.applicantRepository.findByEmail(
            createApplicantDto.email,
        );
        if (existingApplicant) {
            throw new ConflictException(
                `Applicant with email ${createApplicantDto.email} already exists`,
            );
        }

        const applicant = await this.applicantRepository.insertApplicant(createApplicantDto);
        return this.mapToResponseDto(applicant);
    }

    async getApplicantById(id: number): Promise<ApplicantResponseDto> {
        const applicant = await this.applicantRepository.findById(id);
        if (!applicant) {
            throw new NotFoundException(`Applicant with ID ${id} not found`);
        }
        return this.mapToResponseDto(applicant);
    }

    async getApplicantByEmail(email: string): Promise<ApplicantResponseDto> {
        const applicant = await this.applicantRepository.findByEmail(email);
        if (!applicant) {
            throw new NotFoundException(`Applicant with email ${email} not found`);
        }
        return this.mapToResponseDto(applicant);
    }

    async getApplicantList(
        paginationDto: PaginationDto,
        filters?: { search?: string },
    ): Promise<PaginationResponseDto<ApplicantResponseDto>> {
        const { page, limit } = paginationDto;
        const where: any = {};

        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: 'insensitive' } },
                { email: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        const { applicants, total } = await this.applicantRepository.findAll({
            page,
            limit,
            where,
        });

        const data = applicants.map((applicant) => this.mapToResponseDto(applicant));
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async updateApplicant(
        id: number,
        updateApplicantDto: UpdateApplicantDto,
    ): Promise<ApplicantResponseDto> {
        await this.getApplicantById(id);

        if (updateApplicantDto.email) {
            const existingApplicant = await this.applicantRepository.findByEmail(
                updateApplicantDto.email,
            );
            if (existingApplicant && existingApplicant.id !== id) {
                throw new ConflictException(
                    `Applicant with email ${updateApplicantDto.email} already exists`,
                );
            }
        }

        const updatedApplicant = await this.applicantRepository.updateApplicantById(
            id,
            updateApplicantDto,
        );
        return this.mapToResponseDto(updatedApplicant);
    }

    async deleteApplicant(id: number): Promise<void> {
        await this.getApplicantById(id);
        await this.applicantRepository.deleteApplicantById(id);
    }

    private mapToResponseDto(applicant: any): ApplicantResponseDto {
        return {
            id: applicant.id,
            email: applicant.email,
            name: applicant.name,
            phone: applicant.phone,
            address: applicant.address,
            createdAt: applicant.createdAt,
            updatedAt: applicant.updatedAt,
        };
    }
}
