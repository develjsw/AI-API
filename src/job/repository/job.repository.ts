import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';
import { Job, Prisma } from '@prisma/client';

@Injectable()
export class JobRepository {
    constructor(private readonly prisma: PrismaService) {}

    async insertJob(createJobDto: CreateJobDto): Promise<Job> {
        return this.prisma.job.create({
            data: {
                ...createJobDto,
                deadline: createJobDto.deadline ? new Date(createJobDto.deadline) : null,
            },
            include: {
                company: true,
            },
        });
    }

    async findById(id: number): Promise<Job | null> {
        return this.prisma.job.findUnique({
            where: { id },
            include: {
                company: true,
            },
        });
    }

    async findByCompanyId(companyId: number): Promise<Job[]> {
        return this.prisma.job.findMany({
            where: { companyId },
            include: {
                company: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        where?: Prisma.JobWhereInput;
    }): Promise<{ jobs: Job[]; total: number }> {
        const { page = 1, limit = 10, where } = options || {};
        const skip = (page - 1) * limit;

        const [jobs, total] = await Promise.all([
            this.prisma.job.findMany({
                where,
                include: {
                    company: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.job.count({ where }),
        ]);

        return { jobs, total };
    }

    async updateJobById(id: number, updateJobDto: UpdateJobDto): Promise<Job> {
        return this.prisma.job.update({
            where: { id },
            data: {
                ...updateJobDto,
                deadline: updateJobDto.deadline ? new Date(updateJobDto.deadline) : undefined,
            },
            include: {
                company: true,
            },
        });
    }

    async deleteJobById(id: number): Promise<Job> {
        return this.prisma.job.delete({
            where: { id },
        });
    }
}
