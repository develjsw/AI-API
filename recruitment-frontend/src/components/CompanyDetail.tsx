import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Building2, MapPin, Globe, Mail, Phone, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { companyApi } from '../services/api';
import type { Company } from '../types/api';

const CompanyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchCompany(id);
    }
  }, [id]);

  const fetchCompany = async (companyId: string) => {
    try {
      setLoading(true);
      const response = await companyApi.getById(companyId);
      setCompany(response.data);
    } catch (err) {
      setError('회사 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching company:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!company || !window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await companyApi.delete(company.id);
      navigate('/companies');
    } catch (err) {
      setError('회사 삭제에 실패했습니다.');
      console.error('Error deleting company:', err);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!company) {
    return <div className="error">회사를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="company-detail">
      <div className="header">
        <div className="header-left">
          <Link to="/companies" className="btn btn-secondary">
            <ArrowLeft size={20} />
            목록으로
          </Link>
          <h1>
            <Building2 size={24} />
            {company.name}
          </h1>
        </div>
        <div className="header-actions">
          <Link 
            to={`/companies/${company.id}/edit`} 
            className="btn btn-primary"
          >
            <Edit size={20} />
            수정
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
          >
            <Trash2 size={20} />
            삭제
          </button>
        </div>
      </div>

      <div className="content">
        <div className="company-info-card">
          <div className="info-section">
            <h3>기본 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>회사명</label>
                <p>{company.name}</p>
              </div>
              {company.address && (
                <div className="info-item">
                  <label>
                    <MapPin size={16} />
                    주소
                  </label>
                  <p>{company.address}</p>
                </div>
              )}
              {company.email && (
                <div className="info-item">
                  <label>
                    <Mail size={16} />
                    이메일
                  </label>
                  <p>
                    <a href={`mailto:${company.email}`}>
                      {company.email}
                    </a>
                  </p>
                </div>
              )}
              {company.phone && (
                <div className="info-item">
                  <label>
                    <Phone size={16} />
                    전화번호
                  </label>
                  <p>
                    <a href={`tel:${company.phone}`}>
                      {company.phone}
                    </a>
                  </p>
                </div>
              )}
              {company.website && (
                <div className="info-item">
                  <label>
                    <Globe size={16} />
                    웹사이트
                  </label>
                  <p>
                    <a 
                      href={company.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {company.website}
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {company.description && (
            <div className="info-section">
              <h3>회사 소개</h3>
              <p className="description">{company.description}</p>
            </div>
          )}

          <div className="info-section">
            <h3>등록 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>등록일</label>
                <p>{new Date(company.createdAt).toLocaleDateString('ko-KR')}</p>
              </div>
              <div className="info-item">
                <label>수정일</label>
                <p>{new Date(company.updatedAt).toLocaleDateString('ko-KR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;