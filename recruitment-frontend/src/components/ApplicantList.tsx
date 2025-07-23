import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Plus, Edit, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { applicantApi } from '../services/api';
import type { Applicant } from '../types/api';

const ApplicantList: React.FC = () => {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      const response = await applicantApi.getAll();
      setApplicants(response.data.data);
    } catch (err) {
      setError('지원자 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching applicants:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await applicantApi.delete(id);
      setApplicants(applicants.filter(applicant => applicant.id !== id));
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

  return (
    <div className="applicant-list">
      <div className="header">
        <h1>
          <User size={24} />
          지원자 관리
        </h1>
        <Link to="/applicants/new" className="btn btn-primary">
          <Plus size={20} />
          새 지원자 등록
        </Link>
      </div>

      <div className="content">
        {applicants.length === 0 ? (
          <div className="empty-state">
            <User size={48} />
            <p>등록된 지원자가 없습니다.</p>
            <Link to="/applicants/new" className="btn btn-primary">
              첫 번째 지원자 등록하기
            </Link>
          </div>
        ) : (
          <div className="applicant-grid">
            {applicants.map((applicant) => (
              <div key={applicant.id} className="applicant-card">
                <div className="applicant-info">
                  <h3>
                    <Link to={`/applicants/${applicant.id}`}>
                      {applicant.name}
                    </Link>
                  </h3>
                  <div className="contact-info">
                    <p className="email">
                      <Mail size={16} />
                      {applicant.email}
                    </p>
                    {applicant.phone && (
                      <p className="phone">
                        <Phone size={16} />
                        {applicant.phone}
                      </p>
                    )}
                    {applicant.address && (
                      <p className="address">
                        <MapPin size={16} />
                        {applicant.address}
                      </p>
                    )}
                  </div>
                  <p className="created-at">
                    등록일: {new Date(applicant.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <div className="applicant-actions">
                  <Link 
                    to={`/applicants/${applicant.id}/edit`} 
                    className="btn btn-secondary"
                    title="수정"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(applicant.id)}
                    className="btn btn-danger"
                    title="삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantList;