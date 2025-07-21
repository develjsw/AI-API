import { Injectable, NotFoundException } from '@nestjs/common';
import { JobRepository } from '../repository/job.repository';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { JobResponseDto } from '../dto/job-response.dto';
import { PaginationDto, PaginationResponseDto } from '../../shared/dto/common.dto';
import { JobStatus } from '../../shared/enums/status.enum';

@Injectable()
export class JobService {
    constructor(private readonly jobRepository: JobRepository) {}

    async createJob(createJobDto: CreateJobDto): Promise<JobResponseDto> {
        const job = await this.jobRepository.insertJob(createJobDto);
        return this.mapToResponseDto(job);
    }

    async getJobById(id: number): Promise<JobResponseDto> {
        const job = await this.jobRepository.findById(id);
        if (!job) {
            throw new NotFoundException(`Job with ID ${id} not found`);
        }
        return this.mapToResponseDto(job);
    }

    async getJobsByCompanyId(companyId: number): Promise<JobResponseDto[]> {
        const jobs = await this.jobRepository.findByCompanyId(companyId);
        return jobs.map((job) => this.mapToResponseDto(job));
    }

    async getJobList(
        paginationDto: PaginationDto,
        filters?: { status?: JobStatus; companyId?: number; search?: string },
    ): Promise<PaginationResponseDto<JobResponseDto>> {
        const { page, limit } = paginationDto;
        const where: any = {};

        if (filters?.status) {
            where.status = filters.status;
        }

        if (filters?.companyId) {
            where.companyId = filters.companyId;
        }

        if (filters?.search) {
            where.OR = [
                { title: { contains: filters.search, mode: 'insensitive' } },
                { description: { contains: filters.search, mode: 'insensitive' } },
            ];
        }

        const { jobs, total } = await this.jobRepository.findAll({
            page,
            limit,
            where,
        });

        const data = jobs.map((job) => this.mapToResponseDto(job));
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async updateJob(id: number, updateJobDto: UpdateJobDto): Promise<JobResponseDto> {
        await this.getJobById(id);
        const updatedJob = await this.jobRepository.updateJobById(id, updateJobDto);
        return this.mapToResponseDto(updatedJob);
    }

    async deleteJob(id: number): Promise<void> {
        await this.getJobById(id);
        await this.jobRepository.deleteJobById(id);
    }

    private mapToResponseDto(job: any): JobResponseDto {
        return {
            id: job.id,
            title: job.title,
            description: job.description,
            requirements: job.requirements,
            location: job.location,
            salary: job.salary,
            employmentType: job.employmentType,
            status: job.status,
            deadline: job.deadline,
            companyId: job.companyId,
            company: job.company
                ? {
                      id: job.company.id,
                      name: job.company.name,
                      description: job.company.description,
                  }
                : undefined,
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
        };
    }
}
