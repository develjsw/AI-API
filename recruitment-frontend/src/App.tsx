import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Building2, Briefcase, User, FileText, Send, BarChart3 } from 'lucide-react';

import CompanyList from './components/CompanyList';
import CompanyDetail from './components/CompanyDetail';
import CompanyForm from './components/CompanyForm';
import JobList from './components/JobList';
import JobDetail from './components/JobDetail';
import JobForm from './components/JobForm';
import ApplicantList from './components/ApplicantList';
import ApplicantDetail from './components/ApplicantDetail';
import ApplicantForm from './components/ApplicantForm';
import ResumeList from './components/ResumeList';
import ResumeForm from './components/ResumeForm';
import ApplicationList from './components/ApplicationList';
import './App.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>채용 관리 시스템</h1>
        </div>
        <ul className="nav-menu">
          <li>
            <Link 
              to="/companies" 
              className={isActive('/companies') ? 'active' : ''}
            >
              <Building2 size={20} />
              회사 관리
            </Link>
          </li>
          <li>
            <Link 
              to="/jobs" 
              className={isActive('/jobs') ? 'active' : ''}
            >
              <Briefcase size={20} />
              채용공고
            </Link>
          </li>
          <li>
            <Link 
              to="/applicants" 
              className={isActive('/applicants') ? 'active' : ''}
            >
              <User size={20} />
              지원자
            </Link>
          </li>
          <li>
            <Link 
              to="/resumes" 
              className={isActive('/resumes') ? 'active' : ''}
            >
              <FileText size={20} />
              이력서
            </Link>
          </li>
          <li>
            <Link 
              to="/applications" 
              className={isActive('/applications') ? 'active' : ''}
            >
              <Send size={20} />
              지원서
            </Link>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <h1>
          <BarChart3 size={24} />
          대시보드
        </h1>
      </div>
      <div className="content">
        <div className="dashboard-cards">
          <Link to="/companies" className="dashboard-card">
            <Building2 size={32} />
            <div>
              <h3>회사 관리</h3>
              <p>등록된 회사 정보를 관리합니다</p>
            </div>
          </Link>
          
          <Link to="/jobs" className="dashboard-card">
            <Briefcase size={32} />
            <div>
              <h3>채용공고</h3>
              <p>채용공고를 등록하고 관리합니다</p>
            </div>
          </Link>
          
          <Link to="/applicants" className="dashboard-card">
            <User size={32} />
            <div>
              <h3>지원자</h3>
              <p>지원자 정보를 관리합니다</p>
            </div>
          </Link>
          
          <Link to="/resumes" className="dashboard-card">
            <FileText size={32} />
            <div>
              <h3>이력서</h3>
              <p>지원자들의 이력서를 관리합니다</p>
            </div>
          </Link>
          
          <Link to="/applications" className="dashboard-card">
            <Send size={32} />
            <div>
              <h3>지원서</h3>
              <p>접수된 지원서를 관리합니다</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Company Routes */}
          <Route path="/companies" element={<CompanyList />} />
          <Route path="/companies/new" element={<CompanyForm />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/companies/:id/edit" element={<CompanyForm />} />
          
          {/* Job Routes */}
          <Route path="/jobs" element={<JobList />} />
          <Route path="/jobs/new" element={<JobForm />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/jobs/:id/edit" element={<JobForm />} />
          
          {/* Applicant Routes */}
          <Route path="/applicants" element={<ApplicantList />} />
          <Route path="/applicants/new" element={<ApplicantForm />} />
          <Route path="/applicants/:id" element={<ApplicantDetail />} />
          <Route path="/applicants/:id/edit" element={<ApplicantForm />} />
          
          {/* Resume Routes */}
          <Route path="/resumes" element={<ResumeList />} />
          <Route path="/resumes/new" element={<ResumeForm />} />
          <Route path="/resumes/:id/edit" element={<ResumeForm />} />
          
          {/* Application Routes */}
          <Route path="/applications" element={<ApplicationList />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
