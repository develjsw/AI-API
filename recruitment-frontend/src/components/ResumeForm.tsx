import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText, Save, ArrowLeft } from 'lucide-react';
import { resumeApi, applicantApi } from '../services/api';
import type { Resume, Applicant, CreateResumeDto, UpdateResumeDto } from '../types/api';

const ResumeForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    skills: '',
    experience: '',
    education: '',
    applicantId: '',
  });
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplicants();
    if (isEdit && id) {
      fetchResume(id);
    }
  }, [isEdit, id]);

  const fetchApplicants = async () => {
    try {
      const response = await applicantApi.getAll();
      setApplicants(response.data.data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    }
  };

  const fetchResume = async (resumeId: string) => {
    try {
      setLoading(true);
      const response = await resumeApi.getById(resumeId);
      const resume = response.data;
      setFormData({
        title: resume.title,
        content: resume.content,
        skills: resume.skills || '',
        experience: resume.experience || '',
        education: resume.education || '',
        applicantId: resume.applicantId,
      });
    } catch (err) {
      setError('이력서 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching resume:', err);
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

    if (!formData.content.trim()) {
      setError('내용은 필수입니다.');
      return;
    }

    if (!formData.applicantId) {
      setError('지원자를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submitData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        skills: formData.skills.trim() || undefined,
        experience: formData.experience.trim() || undefined,
        education: formData.education.trim() || undefined,
        applicantId: formData.applicantId,
      };

      if (isEdit && id) {
        await resumeApi.update(id, submitData as UpdateResumeDto);
      } else {
        await resumeApi.create(submitData as CreateResumeDto);
      }

      navigate('/resumes');
    } catch (err) {
      setError(isEdit ? '이력서 수정에 실패했습니다.' : '이력서 등록에 실패했습니다.');
      console.error('Error submitting resume:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-form">
      <div className="header">
        <div className="header-left">
          <button 
            type="button"
            onClick={() => navigate('/resumes')}
            className="btn btn-secondary"
          >
            <ArrowLeft size={20} />
            취소
          </button>
          <h1>
            <FileText size={24} />
            {isEdit ? '이력서 수정' : '새 이력서 등록'}
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
              placeholder="이력서 제목을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="applicantId">지원자 *</label>
            <select
              id="applicantId"
              name="applicantId"
              value={formData.applicantId}
              onChange={handleChange}
              required
            >
              <option value="">지원자를 선택하세요</option>
              {applicants.map((applicant) => (
                <option key={applicant.id} value={applicant.id}>
                  {applicant.name} ({applicant.email})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">내용 *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              required
              placeholder="이력서 내용을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills">기술/스킬</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              rows={3}
              placeholder="보유 기술이나 스킬을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience">경력</label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={4}
              placeholder="경력사항을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="education">학력</label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              rows={3}
              placeholder="학력사항을 입력하세요"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/resumes')}
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

export default ResumeForm;