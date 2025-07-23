import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Plus, Edit, Trash2, User, Briefcase, FileText } from 'lucide-react';
import { applicationApi } from '../services/api';
import type { Application } from '../types/api';

const ApplicationList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationApi.getAll();
      setApplications(response.data.data);
    } catch (err) {
      setError('지원서 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await applicationApi.delete(id);
      setApplications(applications.filter(application => application.id !== id));
    } catch (err) {
      setError('지원서 삭제에 실패했습니다.');
      console.error('Error deleting application:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'accepted':
        return 'status-accepted';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-default';
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="application-list">
      <div className="header">
        <h1>
          <Send size={24} />
          지원서 관리
        </h1>
        <Link to="/applications/new" className="btn btn-primary">
          <Plus size={20} />
          새 지원서 등록
        </Link>
      </div>

      <div className="content">
        {applications.length === 0 ? (
          <div className="empty-state">
            <Send size={48} />
            <p>등록된 지원서가 없습니다.</p>
            <Link to="/applications/new" className="btn btn-primary">
              첫 번째 지원서 등록하기
            </Link>
          </div>
        ) : (
          <div className="application-grid">
            {applications.map((application) => (
              <div key={application.id} className="application-card">
                <div className="application-info">
                  <div className="application-header">
                    <h3>
                      <Link to={`/applications/${application.id}`}>
                        지원서 #{application.id.slice(-8)}
                      </Link>
                    </h3>
                    <span className={`status ${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                  
                  {application.job && (
                    <p className="job">
                      <Briefcase size={16} />
                      {application.job.title}
                    </p>
                  )}
                  
                  {application.applicant && (
                    <p className="applicant">
                      <User size={16} />
                      {application.applicant.name}
                    </p>
                  )}
                  
                  {application.resume && (
                    <p className="resume">
                      <FileText size={16} />
                      {application.resume.title}
                    </p>
                  )}
                  
                  <p className="applied-at">
                    지원일: {new Date(application.appliedAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <div className="application-actions">
                  <Link 
                    to={`/applications/${application.id}/edit`} 
                    className="btn btn-secondary"
                    title="수정"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(application.id)}
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

export default ApplicationList;