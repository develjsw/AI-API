import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Building2, Calendar, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { jobApi } from '../services/api';
import type { Job } from '../types/api';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchJob(id);
    }
  }, [id]);

  const fetchJob = async (jobId: string) => {
    try {
      setLoading(true);
      const response = await jobApi.getById(jobId);
      setJob(response.data);
    } catch (err) {
      setError('채용공고 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching job:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!job || !window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await jobApi.delete(job.id);
      navigate('/jobs');
    } catch (err) {
      setError('채용공고 삭제에 실패했습니다.');
      console.error('Error deleting job:', err);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!job) {
    return <div className="error">채용공고를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="job-detail">
      <div className="header">
        <div className="header-left">
          <Link to="/jobs" className="btn btn-secondary">
            <ArrowLeft size={20} />
            목록으로
          </Link>
          <h1>
            <Briefcase size={24} />
            {job.title}
          </h1>
        </div>
        <div className="header-actions">
          <Link 
            to={`/jobs/${job.id}/edit`} 
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
        <div className="job-info-card">
          <div className="info-section">
            <h3>기본 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>제목</label>
                <p>{job.title}</p>
              </div>
              {job.company && (
                <div className="info-item">
                  <label>
                    <Building2 size={16} />
                    회사
                  </label>
                  <p>
                    <Link to={`/companies/${job.company.id}`}>
                      {job.company.name}
                    </Link>
                  </p>
                </div>
              )}
              {job.location && (
                <div className="info-item">
                  <label>
                    <MapPin size={16} />
                    근무지
                  </label>
                  <p>{job.location}</p>
                </div>
              )}
              {job.salary && (
                <div className="info-item">
                  <label>
                    <DollarSign size={16} />
                    급여
                  </label>
                  <p>{job.salary}</p>
                </div>
              )}
              {job.employmentType && (
                <div className="info-item">
                  <label>고용형태</label>
                  <p>{job.employmentType}</p>
                </div>
              )}
            </div>
          </div>

          <div className="info-section">
            <h3>상세 설명</h3>
            <p className="description">{job.description}</p>
          </div>

          {job.requirements && (
            <div className="info-section">
              <h3>자격요건</h3>
              <p className="requirements">{job.requirements}</p>
            </div>
          )}

          <div className="info-section">
            <h3>등록 정보</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>
                  <Calendar size={16} />
                  등록일
                </label>
                <p>{new Date(job.createdAt).toLocaleDateString('ko-KR')}</p>
              </div>
              <div className="info-item">
                <label>
                  <Calendar size={16} />
                  수정일
                </label>
                <p>{new Date(job.updatedAt).toLocaleDateString('ko-KR')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;