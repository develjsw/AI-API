import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Edit, Trash2, User } from 'lucide-react';
import { resumeApi } from '../services/api';
import type { Resume } from '../types/api';

const ResumeList: React.FC = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await resumeApi.getAll();
      setResumes(response.data.data);
    } catch (err) {
      setError('이력서 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching resumes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await resumeApi.delete(id);
      setResumes(resumes.filter(resume => resume.id !== id));
    } catch (err) {
      setError('이력서 삭제에 실패했습니다.');
      console.error('Error deleting resume:', err);
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="resume-list">
      <div className="header">
        <h1>
          <FileText size={24} />
          이력서 관리
        </h1>
        <Link to="/resumes/new" className="btn btn-primary">
          <Plus size={20} />
          새 이력서 등록
        </Link>
      </div>

      <div className="content">
        {resumes.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <p>등록된 이력서가 없습니다.</p>
            <Link to="/resumes/new" className="btn btn-primary">
              첫 번째 이력서 등록하기
            </Link>
          </div>
        ) : (
          <div className="resume-grid">
            {resumes.map((resume) => (
              <div key={resume.id} className="resume-card">
                <div className="resume-info">
                  <h3>
                    <Link to={`/resumes/${resume.id}`}>
                      {resume.title}
                    </Link>
                  </h3>
                  {resume.applicant && (
                    <p className="applicant">
                      <User size={16} />
                      {resume.applicant.name}
                    </p>
                  )}
                  <p className="content">{resume.content}</p>
                  <p className="created-at">
                    등록일: {new Date(resume.createdAt).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <div className="resume-actions">
                  <Link 
                    to={`/resumes/${resume.id}/edit`} 
                    className="btn btn-secondary"
                    title="수정"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(resume.id)}
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

export default ResumeList;