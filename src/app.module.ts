import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { JobModule } from './job/job.module';
import { ApplicantModule } from './applicant/applicant.module';
import { ResumeModule } from './resume/resume.module';
import { CompanyModule } from './company/company.module';
import { ApplicationModule } from './application/application.module';
import * as path from 'path';

let envFile = '.env.local';
switch (process.env.NODE_ENV) {
    case 'production':
        envFile = '.env.production';
        break;
    case 'development':
        envFile = '.env.development';
        break;
}

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [path.resolve(__dirname, `../${envFile}`)],
            isGlobal: true,
            cache: true,
        }),
        DatabaseModule,
        JobModule,
        ApplicantModule,
        ResumeModule,
        CompanyModule,
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
