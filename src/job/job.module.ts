import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './service/job.service';
import { JobRepository } from './repository/job.repository';

@Module({
    controllers: [JobController],
    providers: [JobService, JobRepository],
    exports: [JobService, JobRepository],
})
export class JobModule {}
