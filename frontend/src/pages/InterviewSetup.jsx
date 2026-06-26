import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Select from '../components/Select';

function InterviewSetup() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [experience, setExperience] = useState('');
  const [companyType, setCompanyType] = useState('');
  const [customRole, setCustomRole] = useState('');

  const roles = [
    { label: 'Java Developer', value: 'java-developer' },
    { label: 'Python Developer', value: 'python-developer' },
    { label: 'Full Stack Developer', value: 'full-stack' },
    { label: 'Frontend Developer', value: 'frontend' },
    { label: 'Backend Developer', value: 'backend' },
    { label: 'DevOps Engineer', value: 'devops' },
    { label: 'Data Analyst', value: 'data-analyst' },
    { label: 'Machine Learning Engineer', value: 'ml-engineer' },
    { label: 'Cloud Architect', value: 'cloud-architect' },
    { label: 'Security Engineer', value: 'security' },
    { label: 'Custom Role', value: 'custom' }
  ];

  const experienceLevels = [
    { label: 'Entry Level (0-2 years)', value: 'entry' },
    { label: 'Mid Level (2-5 years)', value: 'mid' },
    { label: 'Senior Level (5+ years)', value: 'senior' },
    { label: 'Lead / Manager', value: 'lead' }
  ];

  const companyTypes = [
    { label: 'Startup', value: 'startup' },
    { label: 'Scale-up', value: 'scaleup' },
    { label: 'Mid-size Company', value: 'mid-size' },
    { label: 'Enterprise / Fortune 500', value: 'enterprise' },
    { label: 'FAANG', value: 'faang' }
  ];

  const getQuestionBank = (role, experience, companyType, customRoleLabel) => {
    const baseQuestions = {
      'java-developer': [
        'Explain how the Java memory model works and why it matters.',
        'How have you used multithreading to improve performance in a Java application?',
        'Describe your process for debugging a production Java service.',
        'How do you manage dependency injection and configuration in large Java systems?'
      ],
      'python-developer': [
        'How do you optimize Python code for performance and readability?',
        'Describe a data pipeline you built with Python and how you handled failures.',
        'What Python libraries have you used for testing, and why?',
        'Explain how you manage virtual environments and packaging in Python projects.'
      ],
      'full-stack': [
        'Walk through a full-stack feature you implemented end-to-end.',
        'How do you ensure API and UI consistency during development?',
        'Describe a deployment workflow you created for a web application.',
        'How do you handle browser compatibility and responsive design?'
      ],
      'frontend': [
        'Describe your approach to building responsive UI components.',
        'How do you optimize front-end performance for large applications?',
        'What strategies do you use to manage state in React or similar frameworks?',
        'How do you ensure accessibility and inclusive design in your UI work?'
      ],
      'backend': [
        'How do you design APIs for scalability and maintainability?',
        'Explain how you would handle database migrations in a live service.',
        'What strategies do you use for service-to-service communication?',
        'How do you design reliable error handling and retries in backend systems?'
      ],
      'devops': [
        'Describe your experience with CI/CD pipelines and automation tools.',
        'How do you monitor production infrastructure and respond to alerts?',
        'What is your approach to infrastructure as code?',
        'Explain how you would design a scalable deployment architecture.'
      ],
      'data-analyst': [
        'How do you approach cleaning and validating large datasets?',
        'Describe a dashboard or report you built to influence business decisions.',
        'What tools do you use for data visualization and analysis?',
        'Explain how you translate data findings into actionable recommendations.'
      ],
      'ml-engineer': [
        'How do you select a model architecture for a new machine learning problem?',
        'Describe how you handle model training, validation, and deployment.',
        'What techniques do you use to prevent overfitting?',
        'How do you monitor model performance in production?'
      ],
      'cloud-architect': [
        'How do you design cloud architecture for high availability?',
        'Describe a cloud migration you planned or executed.',
        'What strategies do you use for cost optimization in the cloud?',
        'How do you secure a multi-cloud infrastructure?'
      ],
      'security': [
        'How do you assess and mitigate security risk in an application?',
        'Describe your experience with secure coding best practices.',
        'What tools do you use for vulnerability scanning and incident response?',
        'Explain how you would design authentication and authorization for an API.'
      ],
      custom: [
        `Explain your experience and motivation for the ${customRoleLabel} role.`,
        `Describe a key challenge you solved while working as a ${customRoleLabel}.`,
        `How do you stay current with trends and best practices relevant to ${customRoleLabel}?`,
        `What would you prioritize in your first 90 days as a ${customRoleLabel}?`
      ]
    };

    const selectedRoleKey = role === 'custom' ? 'custom' : role;
    const questions = [...(baseQuestions[selectedRoleKey] || baseQuestions.custom)];

    if (experience === 'entry') {
      questions.push('How do you approach learning new technologies and applying them quickly?');
    } else if (experience === 'mid') {
      questions.push('Describe a project where you took ownership and improved the codebase.');
    } else if (experience === 'senior') {
      questions.push('How do you mentor junior engineers and raise team delivery quality?');
    } else if (experience === 'lead') {
      questions.push('How do you align engineering work with broader business outcomes?');
    }

    if (companyType === 'faang') {
      questions.push('How would you handle a system design problem under heavy scalability requirements?');
    } else if (companyType === 'enterprise') {
      questions.push('How do you work with cross-functional teams in a large enterprise setting?');
    } else if (companyType === 'startup') {
      questions.push('How do you balance speed and quality when building new products?');
    }

    return questions;
  };

  const handleStartInterview = () => {
    if (!selectedRole || !experience || !companyType) {
      alert('Please fill in all fields');
      return;
    }

    const roleLabel = selectedRole === 'custom' ? customRole.trim() || 'Custom Role' : roles.find((r) => r.value === selectedRole)?.label;
    const questions = getQuestionBank(selectedRole, experience, companyType, roleLabel);

    localStorage.setItem('interviewRole', roleLabel);
    localStorage.setItem('interviewExperience', experience);
    localStorage.setItem('interviewCompany', companyType);
    localStorage.setItem('interviewQuestions', JSON.stringify(questions));
    localStorage.removeItem('interviewAnswers');
    localStorage.removeItem('selectedReportId');

    navigate('/interview');
  };

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
                Role-Based Interview
              </h1>
              <p className="text-slate-400 font-medium">
                Select your desired role and get AI-generated questions tailored to your target position
              </p>
            </div>

            <div className="max-w-3xl">

              {/* Configuration Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl space-y-8">

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Select Your Target Role
                  </label>
                  <Select
                    options={roles}
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    placeholder="Choose a role or enter custom"
                    label=""
                  />
                  {selectedRole === 'custom' && (
                    <input
                      type="text"
                      placeholder="Enter your custom role (e.g., Solutions Architect)"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      className="w-full mt-3 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none transition-all"
                    />
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Experience Level
                  </label>
                  <Select
                    options={experienceLevels}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Select your experience level"
                    label=""
                  />
                </div>

                {/* Company Type */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                    Target Company Type
                  </label>
                  <Select
                    options={companyTypes}
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    placeholder="Select target company type"
                    label=""
                  />
                </div>

                {/* Summary */}
                {selectedRole && experience && companyType && (
                  <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-400/10 to-blue-400/10 border border-cyan-400/20">
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-cyan-400">
                        You'll be interviewing for:
                      </span>
                      {' '}
                      {selectedRole === 'custom' ? customRole : roles.find(r => r.value === selectedRole)?.label}
                      {' at a '}
                      {experienceLevels.find(e => e.value === experience)?.label}
                      {' position in a '}
                      {companyTypes.find(c => c.value === companyType)?.label}
                    </p>
                  </div>
                )}

              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="secondary"
                  size="lg"
                >
                  Back
                </Button>

                <Button
                  onClick={handleStartInterview}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  Generate Questions
                  <ChevronRight size={18} />
                </Button>
              </div>

              {/* Info Section */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: '🎯',
                    title: 'Personalized',
                    desc: 'Questions tailored to your specific role and experience level'
                  },
                  {
                    icon: '⚡',
                    title: 'AI-Powered',
                    desc: 'Advanced AI generates relevant, challenging questions'
                  },
                  {
                    icon: '📊',
                    title: 'Realistic',
                    desc: 'Questions similar to actual interviews at your target companies'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 text-center hover:border-cyan-400/30 transition-all">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSetup;
