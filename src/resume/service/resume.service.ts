import { Injectable, NotFoundException } from '@nestjs/common';
import { ResumeRepository } from '../repository/resume.repository';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { UpdateResumeDto } from '../dto/update-resume.dto';
import { ResumeResponseDto } from '../dto/resume-response.dto';
import { PaginationDto, PaginationResponseDto } from '../../shared/dto/common.dto';

@Injectable()
export class ResumeService {
    constructor(private readonly resumeRepository: ResumeRepository) {}

    async createResume(createResumeDto: CreateResumeDto): Promise<ResumeResponseDto> {
        const resume = await this.resumeRepository.insertResume(createResumeDto);
        return this.mapToResponseDto(resume);
    }

    async getResumeById(id: number): Promise<ResumeResponseDto> {
        const resume = await this.resumeRepository.findById(id);
        if (!resume) {
            throw new NotFoundException(`Resume with ID ${id} not found`);
        }
        return this.mapToResponseDto(resume);
    }

    async getResumesByApplicantId(applicantId: number): Promise<ResumeResponseDto[]> {
        const resumes = await this.resumeRepository.findByApplicantId(applicantId);
        return resumes.map((resume) => this.mapToResponseDto(resume));
    }

    async getResumeList(
        paginationDto: PaginationDto,
        filters?: { applicantId?: number; search?: string },
    ): Promise<PaginationResponseDto<ResumeResponseDto>> {
        const { page, limit } = paginationDto;
        const where: any = {};

        if (filters?.applicantId) {
            where.applicantId = filters.applicantId;
        }

        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { content: { contains: filters.search, mode: 'insensitive' } },
                { skills: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        const { resumes, total } = await this.resumeRepository.findAll({
            page,
            limit,
            where,
        });

        const data = resumes.map((resume) => this.mapToResponseDto(resume));
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async updateResume(id: number, updateResumeDto: UpdateResumeDto): Promise<ResumeResponseDto> {
        await this.getResumeById(id);
        const updatedResume = await this.resumeRepository.updateResumeById(id, updateResumeDto);
        return this.mapToResponseDto(updatedResume);
    }

    async deleteResume(id: number): Promise<void> {
        await this.getResumeById(id);
        await this.resumeRepository.deleteResumeById(id);
    }

    private mapToResponseDto(resume: any): ResumeResponseDto {
        return {
            id: resume.id,
            title: resume.title,
            content: resume.content,
            skills: resume.skills,
            experience: resume.experience,
            education: resume.education,
            applicantId: resume.applicantId,
            applicant: resume.applicant
                ? {
                      id: resume.applicant.id,
                      name: resume.applicant.name,
                      email: resume.applicant.email,
                  }
                : undefined,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        };
    }
}
