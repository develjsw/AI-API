export interface Company {
  id: string;
  name: string;
  description?: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyDto {
  name: string;
  description?: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface UpdateCompanyDto {
  name?: string;
  description?: string;
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  salary?: string;
  location?: string;
  employmentType?: string;
  status?: string;
  deadline?: string;
  companyId: number;
  company?: Company;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobDto {
  title: string;
  description: string;
  requirements?: string;
  salary?: string;
  location?: string;
  employmentType?: string;
  status?: string;
  deadline?: string;
  companyId: number;
}

export interface UpdateJobDto {
  title?: string;
  description?: string;
  requirements?: string;
  salary?: string;
  location?: string;
  employmentType?: string;
  status?: string;
  deadline?: string;
  companyId?: number;
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicantDto {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface UpdateApplicantDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface Resume {
  id: string;
  title: string;
  content: string;
  skills?: string;
  experience?: string;
  education?: string;
  applicantId: string;
  applicant?: Applicant;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeDto {
  title: string;
  content: string;
  skills?: string;
  experience?: string;
  education?: string;
  applicantId: string;
}

export interface UpdateResumeDto {
  title?: string;
  content?: string;
  skills?: string;
  experience?: string;
  education?: string;
  applicantId?: string;
}

export interface Application {
  id: string;
  status: string;
  appliedAt: string;
  jobId: string;
  applicantId: string;
  resumeId?: string;
  job?: Job;
  applicant?: Applicant;
  resume?: Resume;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationDto {
  jobId: string;
  applicantId: string;
  resumeId?: string;
}

export interface UpdateApplicationDto {
  status?: string;
  jobId?: string;
  applicantId?: string;
  resumeId?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}