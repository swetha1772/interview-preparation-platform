import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Search, Filter, TrendingUp, Eye } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Badge from '../components/Badge';

function Reports() {
  const navigate = useNavigate();

  const storedReports = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
  const reports = Array.isArray(storedReports) && storedReports.length ? storedReports : [];
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const companies = useMemo(
    () => [...new Set(reports.map((r) => r.company).filter(Boolean))],
    [reports]
  );

  const roles = useMemo(
    () => [...new Set(reports.map((r) => r.role).filter(Boolean))],
    [reports]
  );

  const filteredReports = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return reports.filter((report) => {
      const matchesSearch =
        !normalizedSearch ||
        String(report.role).toLowerCase().includes(normalizedSearch) ||
        String(report.company).toLowerCase().includes(normalizedSearch) ||
        String(report.date).toLowerCase().includes(normalizedSearch);

      const matchesCompany = selectedCompany ? report.company === selectedCompany : true;
      const matchesRole = selectedRole ? report.role === selectedRole : true;

      return matchesSearch && matchesCompany && matchesRole;
    });
  }, [reports, searchTerm, selectedCompany, selectedRole]);

  const getScoreBadgeVariant = (score) => {
    if (score >= 80) return { bg: 'from-emerald-400/20', text: 'text-emerald-400', border: 'border-emerald-400/30' };
    if (score >= 70) return { bg: 'from-cyan-400/20', text: 'text-cyan-400', border: 'border-cyan-400/30' };
    return { bg: 'from-yellow-400/20', text: 'text-yellow-400', border: 'border-yellow-400/30' };
  };

  const getRecommendationBadge = (rec) => {
    switch (rec) {
      case 'hire':
        return { variant: 'success', label: 'Hire' };
      case 'borderline':
        return { variant: 'warning', label: 'Borderline' };
      case 'reject':
        return { variant: 'error', label: 'Reject' };
      default:
        return { variant: 'default', label: 'Pending' };
    }
  };

  const averageScore = reports.length ? Math.round(reports.reduce((acc, r) => acc + r.score, 0) / reports.length) : 0;
  const hireCount = reports.filter(r => r.recommendation === 'hire').length;

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 lg:p-12">

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">
                Interview Reports
              </h1>
              <p className="text-slate-400 font-medium">
                Review all your past interviews and track your progress
              </p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-lg p-6">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Total Interviews</p>
                <p className="text-3xl font-bold text-white mt-2">{reports.length}</p>
              </div>

              <div className="bg-gradient-to-br from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 rounded-lg p-6">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Average Score</p>
                <p className="text-3xl font-bold text-cyan-400 mt-2">{averageScore}%</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-400/10 to-emerald-400/5 border border-emerald-400/20 rounded-lg p-6">
                <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">Recommended</p>
                <p className="text-3xl font-bold text-emerald-400 mt-2">{hireCount}/{reports.length}</p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
              <Input
                placeholder="Search by role, company, or date..."
                icon={Search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <Select
                placeholder="Filter by company"
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                options={companies.map((company) => ({ value: company, label: company }))}
              />

              <Select
                placeholder="Filter by role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                options={roles.map((role) => ({ value: role, label: role }))}
              />

              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCompany('');
                  setSelectedRole('');
                }}
              >
                <Filter size={18} />
                Clear
              </Button>
            </div>

            {/* Reports Table */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden backdrop-blur-xl">

              {/* Table Header */}
              <div className="hidden lg:grid grid-cols-5 gap-4 p-6 bg-slate-800/30 border-b border-slate-700/50">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Role</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Date</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action</div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-slate-700/50">
                {filteredReports.map((report) => {
                  const scoreBadge = getScoreBadgeVariant(report.score);

                  return (
                    <div key={report.id} className="p-6 hover:bg-slate-800/50 transition-colors">

                      {/* Mobile Layout */}
                      <div className="lg:hidden mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-white">{report.role}</h3>
                            <p className="text-sm text-slate-400 mt-1">{report.company}</p>
                          </div>
                          <div className={`flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br ${scoreBadge.bg} border ${scoreBadge.border}`}>
                            <div className="text-center">
                              <div className={`text-sm font-bold ${scoreBadge.text}`}>{report.score}</div>
                              <div className="text-xs text-slate-400">/100</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Badge text={new Date(report.date).toLocaleDateString()} variant="default" size="sm" />
                          </div>
                          <Button
                            onClick={() => {
                              localStorage.setItem('selectedReportId', report.id);
                              navigate('/report');
                            }}
                            variant="outline"
                            size="sm"
                          >
                            View
                          </Button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:grid grid-cols-5 gap-4 items-center">
                        <div>
                          <p className="font-semibold text-white">{report.role}</p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-300">{report.company}</p>
                        </div>

                        <div>
                          <p className="text-sm text-slate-400">
                            {new Date(report.date).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className={`w-10 h-10 rounded bg-gradient-to-br ${scoreBadge.bg} border ${scoreBadge.border} flex items-center justify-center`}>
                            <span className={`text-sm font-bold ${scoreBadge.text}`}>{report.score}</span>
                          </div>
                          <span className="text-sm text-slate-400">{report.score}%</span>
                        </div>

                        <div>
                          <Button
                            onClick={() => {
                              localStorage.setItem('selectedReportId', report.id);
                              navigate('/report');
                            }}
                            variant="outline"
                            size="sm"
                          >
                            <Eye size={16} />
                            View
                          </Button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>

            {/* Empty State Message */}
            {reports.length === 0 && (
              <div className="text-center py-16">
                <TrendingUp size={48} className="text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No reports yet</h3>
                <p className="text-slate-500 mb-6">Complete an interview to see your performance report here</p>
                <Button
                  onClick={() => navigate('/interview-setup')}
                  variant="primary"
                  size="lg"
                >
                  Start First Interview
                  <ArrowRight size={18} />
                </Button>
              </div>
            )}

            {reports.length > 0 && filteredReports.length === 0 && (
              <div className="text-center py-16">
                <TrendingUp size={48} className="text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">No matching reports</h3>
                <p className="text-slate-500 mb-6">Try clearing filters or using a different search term.</p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCompany('');
                    setSelectedRole('');
                  }}
                  variant="primary"
                  size="lg"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Pagination Info */}
            {reports.length > 0 && (
              <div className="mt-8 text-center text-sm text-slate-500">
                Showing {reports.length} interviews
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
