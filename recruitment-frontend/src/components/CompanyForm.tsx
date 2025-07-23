import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, Save, ArrowLeft } from 'lucide-react';
import { companyApi } from '../services/api';
import type { Company, CreateCompanyDto, UpdateCompanyDto } from '../types/api';

const CompanyForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    website: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchCompany(id);
    }
  }, [isEdit, id]);

  const fetchCompany = async (companyId: string) => {
    try {
      setLoading(true);
      const response = await companyApi.getById(companyId);
      const company = response.data;
      setFormData({
        name: company.name,
        description: company.description || '',
        address: company.address || '',
        website: company.website || '',
        email: company.email || '',
        phone: company.phone || '',
      });
    } catch (err) {
      setError('회사 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching company:', err);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('회사명은 필수입니다.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const submitData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        address: formData.address.trim() || undefined,
        website: formData.website.trim() || undefined,
        email: formData.email.trim() || undefined,
        phone: formData.phone.trim() || undefined,
      };

      if (isEdit && id) {
        await companyApi.update(id, submitData as UpdateCompanyDto);
      } else {
        await companyApi.create(submitData as CreateCompanyDto);
      }

      navigate('/companies');
    } catch (err) {
      setError(isEdit ? '회사 수정에 실패했습니다.' : '회사 등록에 실패했습니다.');
      console.error('Error submitting company:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="company-form">
      <div className="header">
        <div className="header-left">
          <button 
            type="button"
            onClick={() => navigate('/companies')}
            className="btn btn-secondary"
          >
            <ArrowLeft size={20} />
            취소
          </button>
          <h1>
            <Building2 size={24} />
            {isEdit ? '회사 수정' : '새 회사 등록'}
          </h1>
        </div>
      </div>

      <div className="content">
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">회사명 *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="회사명을 입력하세요"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">주소</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="예: 서울시 강남구 테헤란로 123"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hr@example.com"
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
              placeholder="02-1234-5678"
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">웹사이트</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">회사 소개</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="회사에 대한 설명을 입력하세요"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/companies')}
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

export default CompanyForm;