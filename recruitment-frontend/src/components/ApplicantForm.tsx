import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Save, ArrowLeft } from 'lucide-react';
import { applicantApi } from '../services/api';
import type { Applicant, CreateApplicantDto, UpdateApplicantDto } from '../types/api';

const ApplicantForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchApplicant(id);
    }
  }, [isEdit, id]);

  const fetchApplicant = async (applicantId: string) => {
    try {
      setLoading(true);
      const response = await applicantApi.getById(applicantId);
      const applicant = response.data;
      setFormData({
        name: applicant.name,
        email: applicant.email,
        phone: applicant.phone || '',
        address: applicant.address || '',
      });
    } catch (err) {
      setError('지원자 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching applicant:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('이름은 필수입니다.');
      return;
    }

    if (!formData.email.trim()) {
      setError('이메일은 필수입니다.');
      return;
    }

    if (!validateEmail(formData.email.trim())) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submitData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        address: formData.address.trim() || undefined,
      };

      if (isEdit && id) {
        await applicantApi.update(id, submitData as UpdateApplicantDto);
      } else {
        await applicantApi.create(submitData as CreateApplicantDto);
      }

      navigate('/applicants');
    } catch (err) {
      setError(isEdit ? '지원자 수정에 실패했습니다.' : '지원자 등록에 실패했습니다.');
      console.error('Error submitting applicant:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="applicant-form">
      <div className="header">
        <div className="header-left">
          <button 
            type="button"
            onClick={() => navigate('/applicants')}
            className="btn btn-secondary"
          >
            <ArrowLeft size={20} />
            취소
          </button>
          <h1>
            <User size={24} />
            {isEdit ? '지원자 수정' : '새 지원자 등록'}
          </h1>
        </div>
      </div>

      <div className="content">
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">이름 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="지원자 이름을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일 *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="example@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">전화번호</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">주소</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              placeholder="주소를 입력하세요"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/applicants')}
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

export default ApplicantForm;