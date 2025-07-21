import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { UpdateResumeDto } from '../dto/update-resume.dto';
import { Resume, Prisma } from '@prisma/client';

@Injectable()
export class ResumeRepository {
    constructor(private readonly prisma: PrismaService) {}

    async insertResume(createResumeDto: CreateResumeDto): Promise<Resume> {
        return this.prisma.resume.create({
            data: createResumeDto,
            include: {
                applicant: true,
            },
        });
    }

    async findById(id: number): Promise<Resume | null> {
        return this.prisma.resume.findUnique({
            where: { id },
            include: {
                applicant: true,
            },
        });
    }

    async findByApplicantId(applicantId: number): Promise<Resume[]> {
        return this.prisma.resume.findMany({
            where: { applicantId },
            include: {
                applicant: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        where?: Prisma.ResumeWhereInput;
    }): Promise<{ resumes: Resume[]; total: number }> {
        const { page = 1, limit = 10, where } = options || {};
        const skip = (page - 1) * limit;

        const [resumes, total] = await Promise.all([
            this.prisma.resume.findMany({
                where,
                include: {
                    applicant: true,
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.resume.count({ where }),
        ]);

        return { resumes, total };
    }

    async updateResumeById(id: number, updateResumeDto: UpdateResumeDto): Promise<Resume> {
        return this.prisma.resume.update({
            where: { id },
            data: updateResumeDto,
            include: {
                applicant: true,
            },
        });
    }

    async deleteResumeById(id: number): Promise<Resume> {
        return this.prisma.resume.delete({
            where: { id },
        });
    }
}
