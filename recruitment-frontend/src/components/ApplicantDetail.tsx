import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { applicantApi } from '../services/api';
import type { Applicant } from '../types/api';

const ApplicantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [applicant, setApplicant] = useState<Applicant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplicant(id);
    }
  }, [id]);

  const fetchApplicant = async (applicantId: string) => {
    try {
      setLoading(true);
      const response = await applicantApi.getById(applicantId);
      setApplicant(response.data);
    } catch (err) {
      setError('지원자 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching applicant:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!applicant || !window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await applicantApi.delete(applicant.id);
      navigate('/applicants');
    } catch (err) {
      setError('지원자 삭제에 실패했습니다.');
      console.error('Error deleting applicant:', err);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!applicant) {
    return <div className="error">지원자를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="applicant-detail">
      <div className="header">
        <div className="header-left">
          <Link to="/applicants" className="btn btn-secondary">
            <ArrowLeft size={20} />
            목록으로
          </Link>
          <h1>
            <User size={24} />
            {applicant.name}
          </h1>
        </div>
        <div className="header-actions">
          <Link 
            to={`/applicants/${applicant.id}/edit`} 
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
        <div className="applicant-info-card">
          <div className="info-section">
            <h3>기본 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>이름</label>
                <p>{applicant.name}</p>
              </div>
              <div className="info-item">
                <label>
                  <Mail size={16} />
                  이메일
                </label>
                <p>
                  <a href={`mailto:${applicant.email}`}>
                    {applicant.email}
                  </a>
                </p>
              </div>
              {applicant.phone && (
                <div className="info-item">
                  <label>
                    <Phone size={16} />
                    전화번호
                  </label>
                  <p>
                    <a href={`tel:${applicant.phone}`}>
                      {applicant.phone}
                    </a>
                  </p>
                </div>
              )}
              {applicant.address && (
                <div className="info-item">
                  <label>
                    <MapPin size={16} />
                    주소
                  </label>
                  <p>{applicant.address}</p>
                </div>
              )}
            </div>
          </div>

          <div className="info-section">
            <h3>등록 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>
                  <Calendar size={16} />
                  등록일
                </label>
                <p>{new Date(applicant.createdAt).toLocaleDateString('ko-KR')}</p>
              </div>
              <div className="info-item">
                <label>
                  <Calendar size={16} />
                  수정일
                </label>
                <p>{new Date(applicant.updatedAt).toLocaleDateString('ko-KR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetail;