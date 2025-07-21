import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { ResumeService } from './service/resume.service';
import { ResumeRepository } from './repository/resume.repository';

@Module({
    controllers: [ResumeController],
    providers: [ResumeService, ResumeRepository],
    exports: [ResumeService, ResumeRepository],
})
export class ResumeModule {}
