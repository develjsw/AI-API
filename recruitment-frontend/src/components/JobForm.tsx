import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Briefcase, Save, ArrowLeft } from 'lucide-react';
import { jobApi, companyApi } from '../services/api';
import type { Job, Company, CreateJobDto, UpdateJobDto } from '../types/api';

const JobForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    employmentType: '',
    companyId: '',
  });
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanies();
    if (isEdit && id) {
      fetchJob(id);
    }
  }, [isEdit, id]);

  const fetchCompanies = async () => {
    try {
      const response = await companyApi.getAll();
      setCompanies(response.data.data);
    } catch (err) {
      console.error('Error fetching companies:', err);
    }
  };

  const fetchJob = async (jobId: string) => {
    try {
      setLoading(true);
      const response = await jobApi.getById(jobId);
      const job = response.data;
      setFormData({
        title: job.title,
        description: job.description,
        requirements: job.requirements || '',
        salary: job.salary || '',
        location: job.location || '',
        employmentType: job.employmentType || '',
        companyId: job.companyId.toString(),
      });
    } catch (err) {
      setError('채용공고 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('제목은 필수입니다.');
      return;
    }

    if (!formData.description.trim()) {
      setError('설명은 필수입니다.');
      return;
    }

    if (!formData.companyId) {
      setError('회사를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submitData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        requirements: formData.requirements.trim() || undefined,
        salary: formData.salary.trim() || undefined,
        location: formData.location.trim() || undefined,
        employmentType: formData.employmentType.trim() || undefined,
        companyId: parseInt(formData.companyId),
      };

      if (isEdit && id) {
        await jobApi.update(id, submitData as UpdateJobDto);
      } else {
        await jobApi.create(submitData as CreateJobDto);
      }

      navigate('/jobs');
    } catch (err) {
      setError(isEdit ? '채용공고 수정에 실패했습니다.' : '채용공고 등록에 실패했습니다.');
      console.error('Error submitting job:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="job-form">
      <div className="header">
        <div className="header-left">
          <button 
            type="button"
            onClick={() => navigate('/jobs')}
            className="btn btn-secondary"
          >
            <ArrowLeft size={20} />
            취소
          </button>
          <h1>
            <Briefcase size={24} />
            {isEdit ? '채용공고 수정' : '새 채용공고 등록'}
          </h1>
        </div>
      </div>

      <div className="content">
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">제목 *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="채용공고 제목을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyId">회사 *</label>
            <select
              id="companyId"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
            >
              <option value="">회사를 선택하세요</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">근무지</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="예: 서울시 강남구"
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">급여</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              placeholder="예: 연봉 4000만원~6000만원"
            />
          </div>

          <div className="form-group">
            <label htmlFor="employmentType">고용형태</label>
            <select
              id="employmentType"
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
            >
              <option value="">선택하세요</option>
              <option value="정규직">정규직</option>
              <option value="계약직">계약직</option>
              <option value="인턴">인턴</option>
              <option value="프리랜서">프리랜서</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">상세 설명 *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={6}
              required
              placeholder="채용공고에 대한 상세한 설명을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="requirements">자격요건</label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={4}
              placeholder="필요한 자격요건을 입력하세요"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="btn btn-secondary"
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              <Save size={20} />
              {loading ? '저장 중...' : (isEdit ? '수정' : '등록')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;