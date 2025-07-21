import { Module } from '@nestjs/common';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './service/applicant.service';
import { ApplicantRepository } from './repository/applicant.repository';

@Module({
    controllers: [ApplicantController],
    providers: [ApplicantService, ApplicantRepository],
    exports: [ApplicantService, ApplicantRepository],
})
export class ApplicantModule {}
