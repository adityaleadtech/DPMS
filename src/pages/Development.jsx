import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  Filter, 
  Plus, 
  XCircle,
  Clock,
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Calendar,
  MapPin,
  IndianRupee,
  ChevronDown,
  Eye,
  BarChart3,
  PieChart,
  Target,
  Award,
  FileText,
  Download,
  Printer,
  Edit,
  Save,
  X,
  Image as ImageIcon,
  Video,
  Upload,
  Image
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { 
  DEVELOPMENT_PROJECTS, 
  DEVELOPMENT_TYPES,
  canAccessPage, 
  canWrite,
  HIERARCHY
} from '../api/data';
import { useAuth } from '../context/AuthContext';

// Import hierarchy helper functions
import { 
  getStates,
  getDistricts,
  getAssemblyConstituencies,
  getBlocks,
  getPanchayats,
  getPollingBooths,
  getVillages
} from '../api/data';

// Progress Chart Component
const ProgressChart = ({ progress, delayed }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;
  const color = delayed ? '#ef4444' : progress > 70 ? '#22c55e' : progress > 40 ? '#f59e0b' : '#b91c1c';
  
  return (
    <div style={{ position: 'relative', width: '140px', height: '140px' }}>
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="45" fill="none" stroke="#f0f0f0" strokeWidth="10" />
        <circle cx="60" cy="60" r="45" fill="none" stroke={color} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 60 60)" />
      </svg>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>{progress}%</div>
        <div style={{ fontSize: '10px', color: '#737373' }}>Complete</div>
      </div>
    </div>
  );
};

// Report Modal Component
const ReportModal = ({ isOpen, onClose, projects }) => {
  if (!isOpen) return null;

  const totalProjects = projects.length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const active = projects.filter(p => p.status === 'Active').length;
  const delayed = projects.filter(p => p.status === 'Delayed').length;
  const draft = projects.filter(p => p.status === 'Draft').length;
  
  const completionRate = totalProjects > 0 ? Math.round((completed / totalProjects) * 100) : 0;
  const avgProgress = totalProjects > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects) : 0;
  
  const topProjects = [...projects].sort((a, b) => b.progress - a.progress).slice(0, 5);
  
  const districtData = {};
  projects.forEach(p => {
    if (!districtData[p.district]) districtData[p.district] = 0;
    districtData[p.district]++;
  });
  const topDistricts = Object.entries(districtData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const monthlyData = [
    { month: 'Jan', value: 45 },
    { month: 'Feb', value: 52 },
    { month: 'Mar', value: 48 },
    { month: 'Apr', value: 63 },
    { month: 'May', value: 71 },
    { month: 'Jun', value: 68 },
    { month: 'Jul', value: 82 },
    { month: 'Aug', value: 78 },
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 90 },
    { month: 'Nov', value: 87 },
    { month: 'Dec', value: 93 },
  ];

  const maxValue = Math.max(...monthlyData.map(d => d.value));

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
        style={{ maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={22} color="#b91c1c" />
              Development Report
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Comprehensive overview of all development projects</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Download size={14} /> Export
            </button>
            <button className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Printer size={14} /> Print
            </button>
            <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#b91c1c' }}>{totalProjects}</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Total Projects</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{completed}</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Completed</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>{inProgress}</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>In Progress</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{delayed}</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Delayed</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>{completionRate}%</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Completion Rate</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>{avgProgress}%</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Avg Progress</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <PieChart size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Project Status Distribution
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {(() => {
                    const total = totalProjects || 1;
                    const data = [
                      { value: completed, color: '#22c55e', label: 'Completed' },
                      { value: inProgress, color: '#f59e0b', label: 'In Progress' },
                      { value: active, color: '#3b82f6', label: 'Active' },
                      { value: delayed, color: '#ef4444', label: 'Delayed' },
                      { value: draft, color: '#8b5cf6', label: 'Draft' }
                    ].filter(d => d.value > 0);
                    
                    let currentAngle = -90;
                    const slices = data.map(d => {
                      const percentage = (d.value / total) * 100;
                      const angle = (percentage / 100) * 360;
                      const startAngle = currentAngle;
                      currentAngle += angle;
                      
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (currentAngle * Math.PI) / 180;
                      
                      const x1 = 60 + 45 * Math.cos(startRad);
                      const y1 = 60 + 45 * Math.sin(startRad);
                      const x2 = 60 + 45 * Math.cos(endRad);
                      const y2 = 60 + 45 * Math.sin(endRad);
                      
                      return { path: `M 60 60 L ${x1} ${y1} A 45 45 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2} Z`, color: d.color };
                    });
                    
                    return slices.map((slice, i) => <path key={i} d={slice.path} fill={slice.color} />);
                  })()}
                  <circle cx="60" cy="60" r="20" fill="white" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                {[
                  { label: 'Completed', value: completed, color: '#22c55e' },
                  { label: 'In Progress', value: inProgress, color: '#f59e0b' },
                  { label: 'Active', value: active, color: '#3b82f6' },
                  { label: 'Delayed', value: delayed, color: '#ef4444' },
                  { label: 'Draft', value: draft, color: '#8b5cf6' }
                ].filter(d => d.value > 0).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: item.color }} />
                    <span style={{ color: '#404040' }}>{item.label}:</span>
                    <span style={{ fontWeight: '600', color: '#1a1a1a' }}>{item.value}</span>
                    <span style={{ color: '#737373', fontSize: '0.65rem' }}>
                      ({totalProjects > 0 ? Math.round((item.value / totalProjects) * 100) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <TrendingUp size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Monthly Progress Trend
            </h4>
            <div style={{ height: '100px', position: 'relative' }}>
              <svg width="100%" height="100" style={{ overflow: 'visible' }}>
                {[0, 25, 50, 75, 100].map((pos) => (
                  <line key={pos} x1="0" y1={100 - (pos / 100) * 85} x2="100%" y2={100 - (pos / 100) * 85} stroke="#e5e5e5" strokeWidth="0.5" strokeDasharray="4,4" />
                ))}
                
                {monthlyData.map((d, i) => {
                  const x = (i / (monthlyData.length - 1)) * 100;
                  const y = 100 - (d.value / maxValue) * 85;
                  return (
                    <circle key={i} cx={`${x}%`} cy={y} r="3" fill="#b91c1c" stroke="white" strokeWidth="1.5" />
                  );
                })}
                
                <polyline
                  points={monthlyData.map((d, i) => `${(i / (monthlyData.length - 1)) * 100},${100 - (d.value / maxValue) * 85}`).join(' ')}
                  fill="none"
                  stroke="#b91c1c"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                <polygon
                  points={`0,100 ${monthlyData.map((d, i) => `${(i / (monthlyData.length - 1)) * 100},${100 - (d.value / maxValue) * 85}`).join(' ')} 100,100`}
                  fill="rgba(185, 28, 28, 0.08)"
                />
              </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.5rem', color: '#737373', marginTop: '0.25rem' }}>
              {monthlyData.map((d, i) => (
                <span key={i}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
            <Award size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
            Top 5 Projects by Progress
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {topProjects.map((project, i) => (
              <div key={project.id} style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#b91c1c' }}>#{i + 1}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: '500', marginLeft: '0.3rem' }}>{project.name}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: project.progress > 70 ? '#22c55e' : project.progress > 40 ? '#f59e0b' : '#ef4444' }}>
                    {project.progress}%
                  </span>
                </div>
                <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden', marginTop: '0.25rem' }}>
                  <div style={{ width: `${project.progress}%`, height: '100%', background: project.progress > 70 ? '#22c55e' : project.progress > 40 ? '#f59e0b' : '#ef4444', borderRadius: '9999px' }} />
                </div>
                <div style={{ fontSize: '0.6rem', color: '#737373', marginTop: '0.25rem' }}>
                  {project.district} · {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
            <MapPin size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
            Top 5 Districts by Projects
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {topDistricts.map(([district, count], i) => {
              const percentage = totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0;
              return (
                <div key={district} style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem' }}>{district}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#b91c1c' }}>{count} ({percentage}%)</span>
                  </div>
                  <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden', marginTop: '0.25rem' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: '#b91c1c', borderRadius: '9999px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Create Project Modal
const CreateProjectModal = ({ isOpen, onClose, onProjectCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    state: '',
    district: '',
    constituency: '',
    block: '',
    panchayat: '',
    village: '',
    budget: '',
    startDate: '',
    expectedCompletion: '',
    fundSource: 'Government Fund'
  });

  const [errors, setErrors] = useState({});
  const states = getStates();
  const districts = getDistricts(formData.state);
  const constituencies = getAssemblyConstituencies(formData.state, formData.district);
  const blocks = getBlocks(formData.state, formData.district, formData.constituency);
  const panchayats = getPanchayats(formData.state, formData.district, formData.constituency, formData.block);
  
  // Get polling booths - handle case where panchayat might not exist
  const booths = formData.panchayat ? getPollingBooths(formData.state, formData.district, formData.constituency, formData.block, formData.panchayat) : [];
  
  // Get villages - handle case where booth might not exist
  const villages = formData.pollingBooth ? getVillages(formData.state, formData.district, formData.constituency, formData.block, formData.panchayat, formData.pollingBooth) : [];

  const developmentTypes = DEVELOPMENT_TYPES;

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Project name is required';
    if (!formData.type) newErrors.type = 'Project type is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newProject = {
      id: `DEV${String(100 + DEVELOPMENT_PROJECTS.length + 1).padStart(3, '0')}`,
      name: formData.name,
      type: formData.type,
      description: formData.description || `Development of ${formData.type.toLowerCase()} in ${formData.village || 'selected area'}`,
      state: formData.state,
      district: formData.district,
      constituency: formData.constituency || 'Not Specified',
      block: formData.block || 'Not Specified',
      panchayat: formData.panchayat || 'Not Specified',
      village: formData.village || 'Not Specified',
      pollingBooth: formData.pollingBooth || 'Booth 101',
      status: 'Draft',
      progress: 0,
      target: 100,
      completed: 0,
      budget: parseFloat(formData.budget) || 0,
      allocated: 0,
      fundSource: formData.fundSource,
      governmentFund: 0,
      personalFund: 0,
      startDate: formData.startDate,
      expectedCompletion: formData.expectedCompletion || '2025-12-31',
      createdBy: 'Ram Vichar Netam',
      createdDate: new Date().toISOString().split('T')[0],
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200'
      ],
      videos: [],
      milestones: [
        { name: 'Survey Completed', completed: false, date: formData.startDate },
        { name: 'Foundation Laid', completed: false, date: formData.startDate },
        { name: 'Construction Started', completed: false, date: formData.startDate },
        { name: 'Final Inspection', completed: false, date: formData.expectedCompletion || '2025-12-31' }
      ]
    };

    DEVELOPMENT_PROJECTS.push(newProject);
    
    if (onProjectCreated) onProjectCreated();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
        style={{ maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={22} color="#b91c1c" />
              Create New Development Project
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Fill in the details to create a new project</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Project Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter project name"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.name ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.name && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.name}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Project Type <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.type ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Type</option>
              {developmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            {errors.type && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.type}</span>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the project"
              rows="2"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              State <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value, district: '', constituency: '', block: '', panchayat: '', village: '', pollingBooth: ''})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.state ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select State</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {errors.state && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.state}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              District <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value, constituency: '', block: '', panchayat: '', village: '', pollingBooth: ''})}
              disabled={!formData.state}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.district ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.district && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.district}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Constituency</label>
            <select
              value={formData.constituency}
              onChange={(e) => setFormData({...formData, constituency: e.target.value, block: '', panchayat: '', village: '', pollingBooth: ''})}
              disabled={!formData.district}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Constituency</option>
              {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Block</label>
            <select
              value={formData.block}
              onChange={(e) => setFormData({...formData, block: e.target.value, panchayat: '', village: '', pollingBooth: ''})}
              disabled={!formData.constituency}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Block</option>
              {blocks.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Panchayat</label>
            <select
              value={formData.panchayat}
              onChange={(e) => setFormData({...formData, panchayat: e.target.value, village: '', pollingBooth: ''})}
              disabled={!formData.block}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Panchayat</option>
              {panchayats.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Polling Booth</label>
            <select
              value={formData.pollingBooth}
              onChange={(e) => setFormData({...formData, pollingBooth: e.target.value, village: ''})}
              disabled={!formData.panchayat || booths.length === 0}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Polling Booth</option>
              {booths.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Village</label>
            <select
              value={formData.village}
              onChange={(e) => setFormData({...formData, village: e.target.value})}
              disabled={!formData.pollingBooth || villages.length === 0}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Village</option>
              {villages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Budget (₹) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              placeholder="Enter budget amount"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.budget ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.budget && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.budget}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Fund Source</label>
            <select
              value={formData.fundSource}
              onChange={(e) => setFormData({...formData, fundSource: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="Government Fund">Government Fund</option>
              <option value="Personal Fund">Personal Fund</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Start Date <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.startDate ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.startDate && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.startDate}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Expected Completion</label>
            <input
              type="date"
              value={formData.expectedCompletion}
              onChange={(e) => setFormData({...formData, expectedCompletion: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Create Project
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

// Update Progress Modal
const UpdateProgressModal = ({ isOpen, onClose, project, onUpdate }) => {
  const [progress, setProgress] = useState(project?.progress || 0);
  const [status, setStatus] = useState(project?.status || 'Draft');
  const [notes, setNotes] = useState('');

  if (!isOpen || !project) return null;

  const statuses = ['Draft', 'Approved', 'In Progress', 'Completed', 'Closed', 'Delayed'];

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate({
        ...project,
        progress: parseInt(progress),
        status: status,
        notes: notes
      });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
        style={{ maxWidth: '500px', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Edit size={22} color="#b91c1c" />
              Update Progress
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>{project?.name}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <ProgressChart progress={progress} delayed={status === 'Delayed'} />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Progress (%)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#737373' }}>
              <span>0%</span>
              <span style={{ fontWeight: 'bold', color: '#b91c1c' }}>{progress}%</span>
              <span>100%</span>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the progress update..."
              rows="3"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" onClick={handleUpdate} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Save size={18} /> Update
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

const Development = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [projects, setProjects] = useState(DEVELOPMENT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [projectToUpdate, setProjectToUpdate] = useState(null);
  
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const canUpdate = canWrite(user);
  const isUser = user?.role === 'USER';

  // Get all states from hierarchy
  const states = getStates();
  
  // Get filtered options based on selections
  const districts = selectedState ? getDistricts(selectedState) : [];
  const assemblies = selectedState && selectedDistrict ? getAssemblyConstituencies(selectedState, selectedDistrict) : [];
  const blocks = selectedState && selectedDistrict && selectedAssembly ? getBlocks(selectedState, selectedDistrict, selectedAssembly) : [];
  const panchayats = selectedState && selectedDistrict && selectedAssembly && selectedBlock ? getPanchayats(selectedState, selectedDistrict, selectedAssembly, selectedBlock) : [];
  const booths = selectedState && selectedDistrict && selectedAssembly && selectedBlock && selectedPanchayat ? getPollingBooths(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat) : [];
  const villages = selectedState && selectedDistrict && selectedAssembly && selectedBlock && selectedPanchayat && selectedBooth ? getVillages(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat, selectedBooth) : [];

  const statuses = ['All', 'Active', 'In Progress', 'Upcoming', 'Completed', 'Delayed', 'Draft', 'Approved', 'Closed'];

  const filteredProjects = projects.filter(project => {
    let match = true;
    if (search && !project.name.toLowerCase().includes(search.toLowerCase())) match = false;
    if (filterStatus !== 'All' && project.status !== filterStatus) match = false;
    if (selectedState && project.state !== selectedState) match = false;
    if (selectedDistrict && project.district !== selectedDistrict) match = false;
    if (selectedAssembly && project.constituency !== selectedAssembly) match = false;
    if (selectedBlock && project.block !== selectedBlock) match = false;
    if (selectedPanchayat && project.panchayat !== selectedPanchayat) match = false;
    if (selectedBooth && project.pollingBooth !== selectedBooth) match = false;
    if (selectedVillage && project.village !== selectedVillage) match = false;
    return match;
  });

  const clearFilters = () => {
    setSearch('');
    setFilterStatus('All');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedAssembly('');
    setSelectedBlock('');
    setSelectedPanchayat('');
    setSelectedBooth('');
    setSelectedVillage('');
  };

  const hasActiveFilters = search || filterStatus !== 'All' || selectedState || selectedDistrict || selectedAssembly || selectedBlock || selectedPanchayat || selectedBooth || selectedVillage;

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'status-active',
      'In Progress': 'status-scheduled',
      'Completed': 'status-completed',
      'Delayed': 'status-inactive',
      'Upcoming': 'status-upcoming',
      'Draft': 'status-pending',
      'Approved': 'status-scheduled',
      'Closed': 'status-inactive'
    };
    return colors[status] || 'status-pending';
  };

  const getProjectStats = (project) => {
    const totalMilestones = project.milestones?.length || 0;
    const completedMilestones = project.milestones?.filter(m => m.completed).length || 0;
    const milestoneProgress = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
    return {
      totalMilestones,
      completedMilestones,
      milestoneProgress,
      budgetUtilization: project.budget > 0 ? Math.round((project.allocated / project.budget) * 100) : 0,
      isDelayed: project.status === 'Delayed'
    };
  };

  const handleProjectUpdate = (updatedProject) => {
    const index = projects.findIndex(p => p.id === updatedProject.id);
    if (index !== -1) {
      const newProjects = [...projects];
      newProjects[index] = updatedProject;
      setProjects(newProjects);
      const origIndex = DEVELOPMENT_PROJECTS.findIndex(p => p.id === updatedProject.id);
      if (origIndex !== -1) {
        DEVELOPMENT_PROJECTS[origIndex] = updatedProject;
      }
    }
    setShowUpdateModal(false);
    setProjectToUpdate(null);
  };

  // CSV Export Function
  const exportCSV = () => {
    const headers = [
      'S.No', 'Project ID', 'Project Name', 'Type', 'Description', 'State', 'District', 
      'Constituency', 'Block', 'Panchayat', 'Polling Booth', 'Village', 
      'Status', 'Progress (%)', 'Budget (₹)', 'Allocated (₹)', 'Fund Source',
      'Start Date', 'Expected Completion', 'Created By', 'Created Date'
    ];
    
    const rows = filteredProjects.map((project, i) => [
      i + 1,
      project.id,
      project.name,
      project.type,
      project.description || 'N/A',
      project.state || 'Chhattisgarh',
      project.district || 'N/A',
      project.constituency || 'N/A',
      project.block || 'N/A',
      project.panchayat || 'N/A',
      project.pollingBooth || 'N/A',
      project.village || 'N/A',
      project.status || 'N/A',
      project.progress || 0,
      project.budget || 0,
      project.allocated || 0,
      project.fundSource || 'N/A',
      project.startDate || 'N/A',
      project.expectedCompletion || 'N/A',
      project.createdBy || 'N/A',
      project.createdDate || 'N/A'
    ]);

    let csvContent = '\uFEFF';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      const escapedRow = row.map(field => {
        if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      });
      csvContent += escapedRow.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `development_projects_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ 
          marginBottom: '1.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>
              Development Projects
            </h2>
            <p style={{ color: '#737373' }}>
              {isUser ? 'View development projects across the state' : 'Track and manage development projects across the state'}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              className="btn-outline" 
              onClick={exportCSV}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Download size={18} /> Export CSV
            </button>
            <button 
              className="btn-outline" 
              onClick={() => setShowReportModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FileText size={18} /> Reports
            </button>
            {!isUser && (
              <button 
                className="btn-primary" 
                onClick={() => setShowCreateModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <Plus size={18} /> Create New Project
              </button>
            )}
          </div>
        </div>

        <div className="filter-group" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid #e5e5e5', borderRadius: '0.5rem', padding: '0 0.75rem' }}>
            <Search size={18} color="#737373" />
            <input
              type="text"
              placeholder="Search projects by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, padding: '0.5rem 0', border: 'none', outline: 'none', fontSize: '0.9rem', background: 'transparent' }}
            />
            {search && <XCircle size={16} color="#737373" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
          </div>
          
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '0.5rem 1rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white', outline: 'none', minWidth: '140px' }}
          >
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <XCircle size={14} /> Clear All
            </button>
          )}
        </div>

        <div className="filter-group" style={{ flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.85rem', marginRight: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <MapPin size={16} /> Location:
          </span>

          <select 
            value={selectedState} 
            onChange={(e) => { 
              setSelectedState(e.target.value); 
              setSelectedDistrict(''); 
              setSelectedAssembly(''); 
              setSelectedBlock(''); 
              setSelectedPanchayat(''); 
              setSelectedBooth(''); 
              setSelectedVillage(''); 
            }}
            style={{ minWidth: '130px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All States ({states.length})</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            value={selectedDistrict} 
            onChange={(e) => { 
              setSelectedDistrict(e.target.value); 
              setSelectedAssembly(''); 
              setSelectedBlock(''); 
              setSelectedPanchayat(''); 
              setSelectedBooth(''); 
              setSelectedVillage(''); 
            }}
            disabled={!selectedState}
            style={{ minWidth: '130px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All Districts ({districts.length})</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select 
            value={selectedAssembly} 
            onChange={(e) => { 
              setSelectedAssembly(e.target.value); 
              setSelectedBlock(''); 
              setSelectedPanchayat(''); 
              setSelectedBooth(''); 
              setSelectedVillage(''); 
            }}
            disabled={!selectedDistrict}
            style={{ minWidth: '140px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All Constituencies ({assemblies.length})</option>
            {assemblies.map(a => <option key={a} value={a}>{a}</option>)}
          </select>

          <select 
            value={selectedBlock} 
            onChange={(e) => { 
              setSelectedBlock(e.target.value); 
              setSelectedPanchayat(''); 
              setSelectedBooth(''); 
              setSelectedVillage(''); 
            }}
            disabled={!selectedAssembly}
            style={{ minWidth: '130px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All Blocks ({blocks.length})</option>
            {blocks.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={selectedPanchayat} 
            onChange={(e) => { 
              setSelectedPanchayat(e.target.value); 
              setSelectedBooth(''); 
              setSelectedVillage(''); 
            }}
            disabled={!selectedBlock}
            style={{ minWidth: '140px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All Panchayats ({panchayats.length})</option>
            {panchayats.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select 
            value={selectedBooth} 
            onChange={(e) => { 
              setSelectedBooth(e.target.value); 
              setSelectedVillage(''); 
            }}
            disabled={!selectedPanchayat}
            style={{ minWidth: '130px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All Polling Booths ({booths.length})</option>
            {booths.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={selectedVillage} 
            onChange={(e) => setSelectedVillage(e.target.value)}
            disabled={!selectedBooth}
            style={{ minWidth: '130px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All Villages ({villages.length})</option>
            {villages.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              className="btn-outline btn-sm" 
              onClick={exportCSV}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem' }}
            >
              <Download size={14} /> Download CSV
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              style={{ background: 'white', borderRadius: '0.75rem', border: `1px solid ${project.status === 'Delayed' ? '#ef444430' : '#f0f0f0'}`, overflow: 'hidden', transition: 'all 0.3s' }}
            >
              <div style={{ padding: '1.25rem 1.25rem 0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* Project Image Avatar - Small Circle */}
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    borderRadius: '50%', 
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px solid #f0f0f0',
                    background: '#fafafa'
                  }}>
                    {project.images && project.images.length > 0 ? (
                      <img 
                        src={project.images[0]} 
                        alt={project.name}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                    ) : (
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        background: '#e5e5e5',
                        color: '#737373',
                        fontSize: '1.25rem'
                      }}>
                        <Building2 size={20} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                      {project.name}
                    </h4>
                    <p style={{ fontSize: '0.75rem', color: '#737373' }}>
                      {project.type}
                    </p>
                  </div>
                </div>
                <span className={`status-badge ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <div style={{ padding: '0 1.25rem 0.75rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#404040', lineHeight: '1.5' }}>
                  {project.description}
                </p>
              </div>

              <div style={{ padding: '0 1.25rem 0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem', color: '#737373' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={14} /> {project.state || 'Chhattisgarh'}
                </span>
                <span>·</span>
                <span>{project.district}</span>
                {project.constituency && project.constituency !== 'Not Specified' && (
                  <><span>·</span><span>{project.constituency}</span></>
                )}
                {project.block && project.block !== 'Not Specified' && (
                  <><span>·</span><span>{project.block}</span></>
                )}
                {project.village && project.village !== 'Not Specified' && (
                  <><span>·</span><span>{project.village}</span></>
                )}
              </div>

              <div style={{ padding: '0 1.25rem 0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#737373' }}>
                  <span>Progress</span>
                  <span style={{ fontWeight: '600' }}>{project.progress}%</span>
                </div>
                <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ height: '100%', background: project.status === 'Delayed' ? '#ef4444' : project.progress > 70 ? '#22c55e' : project.progress > 40 ? '#f59e0b' : '#b91c1c', borderRadius: '9999px' }} 
                  />
                </div>
              </div>

              <div style={{ padding: '0.75rem 1.25rem', background: '#fafafa', borderTop: '1px solid #f0f0f0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem', color: '#404040' }}>
                <div><span style={{ color: '#737373' }}>Budget:</span> <strong>₹{(project.budget / 100000).toFixed(1)}L</strong></div>
                <div><span style={{ color: '#737373' }}>Fund:</span> <strong>{project.fundSource || 'N/A'}</strong></div>
                <div><span style={{ color: '#737373' }}>Start:</span> <span>{project.startDate}</span></div>
                <div><span style={{ color: '#737373' }}>Expected:</span> <span>{project.expectedCompletion}</span></div>
              </div>

              <div style={{ padding: '0.75rem 1.25rem', display: 'flex', gap: '0.5rem', borderTop: '1px solid #f0f0f0' }}>
                <button 
                  onClick={() => { setSelectedProject(project); setShowModal(true); }}
                  className="btn-primary" 
                  style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                >
                  <Eye size={16} /> View Details
                </button>
                {canUpdate && (
                  <button 
                    onClick={() => { setProjectToUpdate(project); setShowUpdateModal(true); }}
                    className="btn-outline" 
                    style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}
                  >
                    <Edit size={16} /> Update
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <Building2 size={48} color="#737373" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a1a1a' }}>No projects found</h3>
            <p style={{ color: '#737373', marginTop: '0.25rem' }}>Try adjusting your filters or create a new project</p>
            {!isUser && <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setShowCreateModal(true)}><Plus size={16} /> Create New Project</button>}
          </div>
        )}

        <CreateProjectModal 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onProjectCreated={() => setProjects([...DEVELOPMENT_PROJECTS])}
        />

        <UpdateProgressModal
          isOpen={showUpdateModal}
          onClose={() => { setShowUpdateModal(false); setProjectToUpdate(null); }}
          project={projectToUpdate}
          onUpdate={handleProjectUpdate}
        />

        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          projects={projects}
        />

        {showModal && selectedProject && (
  <div className="modal-overlay">
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content" style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>{selectedProject.name}</h3>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>{selectedProject.type}</p>
        </div>
        <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
      </div>
      
      {/* Description */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p
          style={{
            color: '#404040',
            fontSize: '0.95rem',
            lineHeight: '1.7'
          }}
        >
          {selectedProject.description}
        </p>

        {selectedProject.delayedReason && (
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1rem',
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              color: '#991b1b'
            }}
          >
            <strong>⚠ Delayed Reason:</strong>{' '}
            {selectedProject.delayedReason}
          </div>
        )}
      </div>

      {/* Progress Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem', padding: '1rem', background: '#fafafa', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '0.5rem' }}>Overall Progress</h4>
          <ProgressChart progress={selectedProject.progress} delayed={selectedProject.status === 'Delayed'} />
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '0.5rem' }}>Milestone Progress</h4>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#404040' }}>
                {getProjectStats(selectedProject).completedMilestones} of {getProjectStats(selectedProject).totalMilestones} completed
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#b91c1c' }}>
                {getProjectStats(selectedProject).milestoneProgress}%
              </span>
            </div>
            <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${getProjectStats(selectedProject).milestoneProgress}%` }}
                transition={{ duration: 0.8 }}
                style={{ height: '100%', background: getProjectStats(selectedProject).milestoneProgress > 70 ? '#22c55e' : getProjectStats(selectedProject).milestoneProgress > 40 ? '#f59e0b' : '#b91c1c', borderRadius: '9999px' }} 
              />
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '0.5rem' }}>Budget Utilization</h4>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: '#404040' }}>
                ₹{(selectedProject.allocated / 100000).toFixed(1)}L of ₹{(selectedProject.budget / 100000).toFixed(1)}L
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#2563eb' }}>
                {getProjectStats(selectedProject).budgetUtilization}%
              </span>
            </div>
            <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${getProjectStats(selectedProject).budgetUtilization}%` }}
                transition={{ duration: 0.8 }}
                style={{ height: '100%', background: getProjectStats(selectedProject).budgetUtilization > 70 ? '#22c55e' : getProjectStats(selectedProject).budgetUtilization > 40 ? '#f59e0b' : '#ef4444', borderRadius: '9999px' }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Information Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem', background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
        <div><strong>Status:</strong> <span className={`status-badge ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</span></div>
        <div><strong>Progress:</strong> {selectedProject.progress}%</div>
        <div><strong>Budget:</strong> ₹{(selectedProject.budget/100000).toFixed(1)}L</div>
        <div><strong>Fund Source:</strong> {selectedProject.fundSource || 'N/A'}</div>
        <div><strong>Start Date:</strong> {selectedProject.startDate}</div>
        <div><strong>Expected Completion:</strong> {selectedProject.expectedCompletion}</div>
        <div><strong>State:</strong> {selectedProject.state || 'Chhattisgarh'}</div>
        <div><strong>District:</strong> {selectedProject.district}</div>
        {selectedProject.constituency && selectedProject.constituency !== 'Not Specified' && (
          <div><strong>Constituency:</strong> {selectedProject.constituency}</div>
        )}
        {selectedProject.block && selectedProject.block !== 'Not Specified' && (
          <div><strong>Block:</strong> {selectedProject.block}</div>
        )}
        {selectedProject.panchayat && selectedProject.panchayat !== 'Not Specified' && (
          <div><strong>Panchayat:</strong> {selectedProject.panchayat}</div>
        )}
        {selectedProject.pollingBooth && selectedProject.pollingBooth !== 'Not Specified' && (
          <div><strong>Polling Booth:</strong> {selectedProject.pollingBooth}</div>
        )}
        {selectedProject.village && selectedProject.village !== 'Not Specified' && (
          <div><strong>Village:</strong> {selectedProject.village}</div>
        )}
      </div>

      {/* Milestones */}
      <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#1a1a1a' }}>
        📋 Milestones ({getProjectStats(selectedProject).completedMilestones}/{getProjectStats(selectedProject).totalMilestones})
      </h4>
      {selectedProject.milestones.map((m, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid #f5f5f5' }}>
          <span style={{ fontSize: '1.1rem' }}>{m.completed ? '✅' : '⏳'}</span>
          <span style={{ flex: 1, fontSize: '0.9rem' }}>{m.name}</span>
          <span style={{ fontSize: '0.75rem', color: m.completed ? '#166534' : '#737373', background: m.completed ? '#dcfce7' : '#f0f0f0', padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>
            {m.completed ? 'Completed' : 'Pending'}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#737373' }}>{m.date}</span>
        </div>
      ))}

      {/* Action Buttons */}
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        {canUpdate && (
          <button 
            className="btn-primary" 
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            onClick={() => { setShowModal(false); setProjectToUpdate(selectedProject); setShowUpdateModal(true); }}
          >
            <Edit size={18} /> Update Progress
          </button>
        )}
        <button className="btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <BarChart3 size={18} /> View Report
        </button>
      </div>

      {/* ============ IMAGES & VIDEOS SECTION (At the end) ============ */}
      <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon size={20} color="#b91c1c" /> Media Gallery
        </h3>

        {/* Images Grid */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4
            style={{
              marginBottom: '0.75rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              color: '#404040',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <ImageIcon size={16} /> Images ({selectedProject.images?.length || 0})
          </h4>

          {selectedProject.images && selectedProject.images.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1rem'
              }}
            >
              {(selectedProject.images || []).map(
                (image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${selectedProject.name} - Image ${index + 1}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      border: '1px solid #e5e5e5',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    onClick={() => {
                      window.open(image, '_blank');
                    }}
                  />
                )
              )}
            </div>
          ) : (
            <div
              style={{
                padding: '2rem',
                background: '#fafafa',
                borderRadius: '12px',
                border: '1px dashed #e5e5e5',
                textAlign: 'center',
                color: '#737373'
              }}
            >
              <ImageIcon size={32} color="#737373" style={{ marginBottom: '0.5rem' }} />
              <p>No images uploaded yet</p>
              {canUpdate && (
                <button
                  className="btn-outline btn-sm"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => {
                    // You can add image upload logic here
                    alert('Image upload functionality coming soon!');
                  }}
                >
                  <Upload size={14} /> Upload Images
                </button>
              )}
            </div>
          )}
        </div>

        {/* Videos Section */}
        <div>
          <h4
            style={{
              marginBottom: '0.75rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              color: '#404040',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Video size={16} /> Videos ({selectedProject.videos?.length || 0})
          </h4>

          {selectedProject.videos && selectedProject.videos.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1rem'
              }}
            >
              {(selectedProject.videos || []).map((video, index) => (
                <div
                  key={index}
                  style={{
                    background: '#000',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    position: 'relative',
                    aspectRatio: '16/9'
                  }}
                >
                  <video
                    src={video}
                    controls
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    poster={selectedProject.images?.[0] || ''}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                padding: '2rem',
                background: '#fafafa',
                borderRadius: '12px',
                border: '1px dashed #e5e5e5',
                textAlign: 'center',
                color: '#737373'
              }}
            >
              <Video size={32} color="#737373" style={{ marginBottom: '0.5rem' }} />
              <p>No videos uploaded yet</p>
              {canUpdate && (
                <button
                  className="btn-outline btn-sm"
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => {
                    alert('Video upload functionality coming soon!');
                  }}
                >
                  <Upload size={14} /> Upload Videos
                </button>
              )}
            </div>
          )}
        </div>

        {/* Upload All Button (for users with update permissions) */}
        {canUpdate && (
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              onClick={() => {
                alert('Media upload modal coming soon!');
              }}
            >
              <Upload size={16} /> Add Media (Images & Videos)
            </button>
          </div>
        )}
      </div>
    </motion.div>
  </div>
)}
      </motion.div>
    </LayoutWrapper>
  );
};

export default Development;