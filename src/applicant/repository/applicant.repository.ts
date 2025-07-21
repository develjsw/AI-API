import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateApplicantDto } from '../dto/create-applicant.dto';
import { UpdateApplicantDto } from '../dto/update-applicant.dto';
import { Applicant, Prisma } from '@prisma/client';

@Injectable()
export class ApplicantRepository {
    constructor(private readonly prisma: PrismaService) {}

    async insertApplicant(createApplicantDto: CreateApplicantDto): Promise<Applicant> {
        return this.prisma.applicant.create({
            data: createApplicantDto,
        });
    }

    async findById(id: number): Promise<Applicant | null> {
        return this.prisma.applicant.findUnique({
            where: { id },
        });
    }

    async findByEmail(email: string): Promise<Applicant | null> {
        return this.prisma.applicant.findUnique({
            where: { email },
        });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        where?: Prisma.ApplicantWhereInput;
    }): Promise<{ applicants: Applicant[]; total: number }> {
        const { page = 1, limit = 10, where } = options || {};
        const skip = (page - 1) * limit;

        const [applicants, total] = await Promise.all([
            this.prisma.applicant.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.applicant.count({ where }),
        ]);

        return { applicants, total };
    }

    async updateApplicantById(
        id: number,
        updateApplicantDto: UpdateApplicantDto,
    ): Promise<Applicant> {
        return this.prisma.applicant.update({
            where: { id },
            data: updateApplicantDto,
        });
    }

    async deleteApplicantById(id: number): Promise<Applicant> {
        return this.prisma.applicant.delete({
            where: { id },
        });
    }
}
