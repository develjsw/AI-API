import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { ApplicationRepository } from '../repository/application.repository';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { ApplicationResponseDto } from '../dto/application-response.dto';
import { PaginationDto, PaginationResponseDto } from '../../shared/dto/common.dto';
import { ApplicationStatus } from '../../shared/enums/status.enum';

@Injectable()
export class ApplicationService {
    constructor(private readonly applicationRepository: ApplicationRepository) {}

    async createApplication(
        createApplicationDto: CreateApplicationDto,
    ): Promise<ApplicationResponseDto> {
        const existingApplication = await this.applicationRepository.findByJobIdAndApplicantId(
            createApplicationDto.jobId,
            createApplicationDto.applicantId,
        );

        if (existingApplication) {
            throw new ConflictException(
                `Application for job ${createApplicationDto.jobId} by applicant ${createApplicationDto.applicantId} already exists`,
            );
        }

        const application =
            await this.applicationRepository.insertApplication(createApplicationDto);
        return this.mapToResponseDto(application);
    }

    async getApplicationById(id: number): Promise<ApplicationResponseDto> {
        const application = await this.applicationRepository.findById(id);
        if (!application) {
            throw new NotFoundException(`Application with ID ${id} not found`);
        }
        return this.mapToResponseDto(application);
    }

    async getApplicationsByJobId(jobId: number): Promise<ApplicationResponseDto[]> {
        const applications = await this.applicationRepository.findByJobId(jobId);
        return applications.map((application) => this.mapToResponseDto(application));
    }

    async getApplicationsByApplicantId(applicantId: number): Promise<ApplicationResponseDto[]> {
        const applications = await this.applicationRepository.findByApplicantId(applicantId);
        return applications.map((application) => this.mapToResponseDto(application));
    }

    async getApplicationList(
        paginationDto: PaginationDto,
        filters?: { jobId?: number; applicantId?: number; status?: ApplicationStatus },
    ): Promise<PaginationResponseDto<ApplicationResponseDto>> {
        const { page, limit } = paginationDto;
        const where: any = {};

        if (filters?.jobId) {
            where.jobId = filters.jobId;
        }

        if (filters?.applicantId) {
            where.applicantId = filters.applicantId;
        }

        if (filters?.status) {
            where.status = filters.status;
        }

        const { applications, total } = await this.applicationRepository.findAll({
            page,
            limit,
            where,
        });

        const data = applications.map((application) => this.mapToResponseDto(application));
        const totalPages = Math.ceil(total / limit);

        return {
            data,
            total,
            page,
            limit,
            totalPages,
        };
    }

    async updateApplication(
        id: number,
        updateApplicationDto: UpdateApplicationDto,
    ): Promise<ApplicationResponseDto> {
        await this.getApplicationById(id);
        const updatedApplication = await this.applicationRepository.updateApplicationById(
            id,
            updateApplicationDto,
        );
        return this.mapToResponseDto(updatedApplication);
    }

    async deleteApplication(id: number): Promise<void> {
        await this.getApplicationById(id);
        await this.applicationRepository.deleteApplicationById(id);
    }

    private mapToResponseDto(application: any): ApplicationResponseDto {
        return {
            id: application.id,
            jobId: application.jobId,
            applicantId: application.applicantId,
            resumeId: application.resumeId,
            coverLetter: application.coverLetter,
            status: application.status,
            job: application.job
                ? {
                      id: application.job.id,
                      title: application.job.title,
                      company: {
                          id: application.job.company.id,
                          name: application.job.company.name,
                      },
                  }
                : undefined,
            applicant: application.applicant
                ? {
                      id: application.applicant.id,
                      name: application.applicant.name,
                      email: application.applicant.email,
                  }
                : undefined,
            appliedAt: application.appliedAt,
            updatedAt: application.updatedAt,
        };
    }
}
