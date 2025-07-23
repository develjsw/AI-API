import axios from 'axios';
import type {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  Job,
  CreateJobDto,
  UpdateJobDto,
  Applicant,
  CreateApplicantDto,
  UpdateApplicantDto,
  Resume,
  CreateResumeDto,
  UpdateResumeDto,
  Application,
  CreateApplicationDto,
  UpdateApplicationDto,
} from '../types/api';

const API_BASE_URL = 'http://localhost:4000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const companyApi = {
  getAll: () => apiClient.get<{data: Company[]}>('/companies'),
  getById: (id: string) => apiClient.get<Company>(`/companies/${id}`),
  create: (data: CreateCompanyDto) => apiClient.post<Company>('/companies', data),
  update: (id: string, data: UpdateCompanyDto) => apiClient.patch<Company>(`/companies/${id}`, data),
  delete: (id: string) => apiClient.delete(`/companies/${id}`),
};

export const jobApi = {
  getAll: () => apiClient.get<{data: Job[]}>('/jobs'),
  getById: (id: string) => apiClient.get<Job>(`/jobs/${id}`),
  create: (data: CreateJobDto) => apiClient.post<Job>('/jobs', data),
  update: (id: string, data: UpdateJobDto) => apiClient.patch<Job>(`/jobs/${id}`, data),
  delete: (id: string) => apiClient.delete(`/jobs/${id}`),
};

export const applicantApi = {
  getAll: () => apiClient.get<{data: Applicant[]}>('/applicants'),
  getById: (id: string) => apiClient.get<Applicant>(`/applicants/${id}`),
  create: (data: CreateApplicantDto) => apiClient.post<Applicant>('/applicants', data),
  update: (id: string, data: UpdateApplicantDto) => apiClient.patch<Applicant>(`/applicants/${id}`, data),
  delete: (id: string) => apiClient.delete(`/applicants/${id}`),
};

export const resumeApi = {
  getAll: () => apiClient.get<{data: Resume[]}>('/resumes'),
  getById: (id: string) => apiClient.get<Resume>(`/resumes/${id}`),
  create: (data: CreateResumeDto) => apiClient.post<Resume>('/resumes', data),
  update: (id: string, data: UpdateResumeDto) => apiClient.patch<Resume>(`/resumes/${id}`, data),
  delete: (id: string) => apiClient.delete(`/resumes/${id}`),
};

export const applicationApi = {
  getAll: () => apiClient.get<{data: Application[]}>('/applications'),
  getById: (id: string) => apiClient.get<Application>(`/applications/${id}`),
  create: (data: CreateApplicationDto) => apiClient.post<Application>('/applications', data),
  update: (id: string, data: UpdateApplicationDto) => apiClient.patch<Application>(`/applications/${id}`, data),
  delete: (id: string) => apiClient.delete(`/applications/${id}`),
};

export default apiClient;