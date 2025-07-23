import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Plus, Edit, Trash2, Building2, MapPin, DollarSign } from 'lucide-react';
import { jobApi } from '../services/api';
import type { Job } from '../types/api';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobApi.getAll();
      setJobs(response.data.data);
    } catch (err) {
      setError('채용공고 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await jobApi.delete(id);
      setJobs(jobs.filter(job => job.id !== id));
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

  return (
    <div className="job-list">
      <div className="header">
        <h1>
          <Briefcase size={24} />
          채용공고 관리
        </h1>
        <Link to="/jobs/new" className="btn btn-primary">
          <Plus size={20} />
          새 채용공고 등록
        </Link>
      </div>

      <div className="content">
        {jobs.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={48} />
            <p>등록된 채용공고가 없습니다.</p>
            <Link to="/jobs/new" className="btn btn-primary">
              첫 번째 채용공고 등록하기
            </Link>
          </div>
        ) : (
          <div className="job-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <h3>
                    <Link to={`/jobs/${job.id}`}>
                      {job.title}
                    </Link>
                  </h3>
                  {job.company && (
                    <p className="company">
                      <Building2 size={16} />
                      {job.company.name}
                    </p>
                  )}
                  {job.location && (
                    <p className="location">
                      <MapPin size={16} />
                      {job.location}
                    </p>
                  )}
                  {job.salary && (
                    <p className="salary">
                      <DollarSign size={16} />
                      {job.salary}
                    </p>
                  )}
                  {job.employmentType && (
                    <p className="employment-type">{job.employmentType}</p>
                  )}
                  <p className="description">{job.description}</p>
                  <p className="created-at">
                    등록일: {new Date(job.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <div className="job-actions">
                  <Link 
                    to={`/jobs/${job.id}/edit`} 
                    className="btn btn-secondary"
                    title="수정"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(job.id)}
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

export default JobList;