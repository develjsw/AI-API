import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateApplicationDto } from '../dto/create-application.dto';
import { UpdateApplicationDto } from '../dto/update-application.dto';
import { Application, Prisma } from '@prisma/client';

@Injectable()
export class ApplicationRepository {
    constructor(private readonly prisma: PrismaService) {}

    async insertApplication(createApplicationDto: CreateApplicationDto): Promise<Application> {
        return this.prisma.application.create({
            data: createApplicationDto,
            include: {
                job: {
                    include: {
                        company: true,
                    },
                },
                applicant: true,
            },
        });
    }

    async findById(id: number): Promise<Application | null> {
        return this.prisma.application.findUnique({
            where: { id },
            include: {
                job: {
                    include: {
                        company: true,
                    },
                },
                applicant: true,
            },
        });
    }

    async findByJobIdAndApplicantId(
        jobId: number,
        applicantId: number,
    ): Promise<Application | null> {
        return this.prisma.application.findUnique({
            where: {
                jobId_applicantId: {
                    jobId,
                    applicantId,
                },
            },
        });
    }

    async findByJobId(jobId: number): Promise<Application[]> {
        return this.prisma.application.findMany({
            where: { jobId },
            include: {
                job: {
                    include: {
                        company: true,
                    },
                },
                applicant: true,
            },
            orderBy: { appliedAt: 'desc' },
        });
    }

    async findByApplicantId(applicantId: number): Promise<Application[]> {
        return this.prisma.application.findMany({
            where: { applicantId },
            include: {
                job: {
                    include: {
                        company: true,
                    },
                },
                applicant: true,
            },
            orderBy: { appliedAt: 'desc' },
        });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        where?: Prisma.ApplicationWhereInput;
    }): Promise<{ applications: Application[]; total: number }> {
        const { page = 1, limit = 10, where } = options || {};
        const skip = (page - 1) * limit;

        const [applications, total] = await Promise.all([
            this.prisma.application.findMany({
                where,
                include: {
                    job: {
                        include: {
                            company: true,
                        },
                    },
                    applicant: true,
                },
                orderBy: { appliedAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.application.count({ where }),
        ]);

        return { applications, total };
    }

    async updateApplicationById(
        id: number,
        updateApplicationDto: UpdateApplicationDto,
    ): Promise<Application> {
        return this.prisma.application.update({
            where: { id },
            data: updateApplicationDto,
            include: {
                job: {
                    include: {
                        company: true,
                    },
                },
                applicant: true,
            },
        });
    }

    async deleteApplicationById(id: number): Promise<Application> {
        return this.prisma.application.delete({
            where: { id },
        });
    }
}
