import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Plus, Edit, Trash2, MapPin, Mail } from 'lucide-react';
import { companyApi } from '../services/api';
import type { Company } from '../types/api';

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await companyApi.getAll();
      setCompanies(response.data.data);
    } catch (err) {
      setError('회사 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching companies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    
    try {
      await companyApi.delete(id);
      setCompanies(companies.filter(company => company.id !== id));
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

  return (
    <div className="company-list">
      <div className="header">
        <h1>
          <Building2 size={24} />
          회사 관리
        </h1>
        <Link to="/companies/new" className="btn btn-primary">
          <Plus size={20} />
          새 회사 등록
        </Link>
      </div>

      <div className="content">
        {companies.length === 0 ? (
          <div className="empty-state">
            <Building2 size={48} />
            <p>등록된 회사가 없습니다.</p>
            <Link to="/companies/new" className="btn btn-primary">
              첫 번째 회사 등록하기
            </Link>
          </div>
        ) : (
          <div className="company-grid">
            {companies.map((company) => (
              <div key={company.id} className="company-card">
                <div className="company-info">
                  <h3>
                    <Link to={`/companies/${company.id}`}>
                      {company.name}
                    </Link>
                  </h3>
                  {company.address && (
                    <p className="address">
                      <MapPin size={16} />
                      {company.address}
                    </p>
                  )}
                  {company.email && (
                    <p className="email">
                      <Mail size={16} />
                      {company.email}
                    </p>
                  )}
                  {company.description && (
                    <p className="description">{company.description}</p>
                  )}
                </div>
                <div className="company-actions">
                  <Link 
                    to={`/companies/${company.id}/edit`} 
                    className="btn btn-secondary"
                    title="수정"
                  >
                    <Edit size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(company.id)}
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

export default CompanyList;