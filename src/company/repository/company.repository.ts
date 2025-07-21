import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { Company, Prisma } from '@prisma/client';

@Injectable()
export class CompanyRepository {
    constructor(private readonly prisma: PrismaService) {}

    async insertCompany(createCompanyDto: CreateCompanyDto): Promise<Company> {
        return this.prisma.company.create({
            data: createCompanyDto,
        });
    }

    async findById(id: number): Promise<Company | null> {
        return this.prisma.company.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        jobs: true,
                    },
                },
            },
        });
    }

    async findByName(name: string): Promise<Company | null> {
        return this.prisma.company.findFirst({
            where: { name },
        });
    }

    async findAll(options?: {
        page?: number;
        limit?: number;
        where?: Prisma.CompanyWhereInput;
    }): Promise<{ companies: Company[]; total: number }> {
        const { page = 1, limit = 10, where } = options || {};
        const skip = (page - 1) * limit;

        const [companies, total] = await Promise.all([
            this.prisma.company.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            jobs: true,
                        },
                    },
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.company.count({ where }),
        ]);

        return { companies, total };
    }

    async updateCompanyById(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
        return this.prisma.company.update({
            where: { id },
            data: updateCompanyDto,
            include: {
                _count: {
                    select: {
                        jobs: true,
                    },
                },
            },
        });
    }

    async deleteCompanyById(id: number): Promise<Company> {
        return this.prisma.company.delete({
            where: { id },
        });
    }
}
