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
  Award
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { DEVELOPMENT_PROJECTS } from '../api/data';
import { 
  getStates,
  getDistricts,
  getAssemblyConstituencies,
  getBlocks,
  getPanchayats,
  getPollingBooths,
  getVillages
} from '../api/data';

// Simple chart components using pure CSS/SVG
const ProgressChart = ({ progress, delayed }) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (progress / 100) * circumference;
  const color = delayed ? '#ef4444' : progress > 70 ? '#22c55e' : progress > 40 ? '#f59e0b' : '#b91c1c';
  
  return (
    <div style={{ position: 'relative', width: '140px', height: '140px' }}>
      <svg width="140" height="140" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="10"
        />
        <circle
          cx="60"
          cy="60"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>{progress}%</div>
        <div style={{ fontSize: '10px', color: '#737373' }}>Complete</div>
      </div>
    </div>
  );
};

const MilestoneChart = ({ milestones }) => {
  const total = milestones.length;
  const completed = milestones.filter(m => m.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#1a1a1a' }}>
          Milestone Progress
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#b91c1c' }}>
          {completed}/{total} Done
        </span>
      </div>
      <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          style={{ 
            height: '100%', 
            background: percentage > 70 ? '#22c55e' : percentage > 40 ? '#f59e0b' : '#b91c1c',
            borderRadius: '9999px'
          }} 
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.7rem', color: '#737373' }}>
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

const BudgetChart = ({ allocated, budget }) => {
  const percentage = budget > 0 ? Math.round((allocated / budget) * 100) : 0;
  const remaining = budget - allocated;
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: '500', color: '#1a1a1a' }}>
          Budget Utilization
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#2563eb' }}>
          {percentage}%
        </span>
      </div>
      <div style={{ height: '20px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
          style={{ 
            height: '100%', 
            background: percentage > 70 ? '#22c55e' : percentage > 40 ? '#f59e0b' : '#ef4444',
            borderRadius: '9999px',
            position: 'relative'
          }} 
        />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '0.7rem',
          fontWeight: '600',
          color: percentage > 50 ? 'white' : '#404040'
        }}>
          ₹{(allocated / 100000).toFixed(1)}L / ₹{(budget / 100000).toFixed(1)}L
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.7rem', color: '#737373' }}>
        <span>Allocated: ₹{(allocated / 100000).toFixed(1)}L</span>
        <span>Remaining: ₹{(remaining / 100000).toFixed(1)}L</span>
      </div>
    </div>
  );
};

const StatusTimeline = ({ project }) => {
  const statuses = ['Draft', 'Approved', 'In Progress', 'Completed'];
  const currentIndex = statuses.indexOf(project.status);
  
  return (
    <div style={{ padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        {statuses.map((status, index) => (
          <div key={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: index <= currentIndex ? '#b91c1c' : '#f0f0f0',
              color: index <= currentIndex ? 'white' : '#737373',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: '600',
              zIndex: 2,
              border: index === currentIndex ? '3px solid #b91c1c' : 'none'
            }}>
              {index <= currentIndex ? '✓' : index + 1}
            </div>
            <span style={{ 
              fontSize: '0.6rem', 
              color: index <= currentIndex ? '#b91c1c' : '#737373',
              marginTop: '0.25rem',
              fontWeight: index === currentIndex ? '600' : '400',
              textAlign: 'center'
            }}>
              {status}
            </span>
          </div>
        ))}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '10%',
          right: '10%',
          height: '3px',
          background: '#f0f0f0',
          zIndex: 0
        }}>
          <div style={{
            width: `${(currentIndex / (statuses.length - 1)) * 100}%`,
            height: '100%',
            background: '#b91c1c',
            transition: 'width 0.8s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

const Development = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Hierarchy filter states
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  // Get hierarchy options
  const states = getStates();
  const districts = getDistricts(selectedState);
  const assemblies = getAssemblyConstituencies(selectedState, selectedDistrict);
  const blocks = getBlocks(selectedState, selectedDistrict, selectedAssembly);
  const panchayats = getPanchayats(selectedState, selectedDistrict, selectedAssembly, selectedBlock);
  const booths = getPollingBooths(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat);
  const villages = getVillages(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat, selectedBooth);

  const statuses = ['All', 'Active', 'In Progress', 'Upcoming', 'Completed', 'Delayed', 'Draft', 'Approved', 'Closed'];

  // Filter projects based on all criteria
  const filteredProjects = DEVELOPMENT_PROJECTS.filter(project => {
    let match = true;
    
    if (search && !project.name.toLowerCase().includes(search.toLowerCase())) match = false;
    if (filterStatus !== 'All' && project.status !== filterStatus) match = false;
    if (selectedState && project.state !== selectedState) match = false;
    if (selectedDistrict && project.district !== selectedDistrict) match = false;
    if (selectedAssembly && project.assemblyConstituency !== selectedAssembly) match = false;
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

  // Calculate project stats for modal
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

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
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
              Track and manage development projects across the state
            </p>
          </div>
          <button 
            className="btn-primary" 
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={18} /> Create New Project
          </button>
        </div>

        {/* Search and Basic Filters */}
        <div className="filter-group" style={{ flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', border: '1px solid #e5e5e5', borderRadius: '0.5rem', padding: '0 0.75rem' }}>
            <Search size={18} color="#737373" />
            <input
              type="text"
              placeholder="Search projects by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                flex: 1, 
                padding: '0.5rem 0', 
                border: 'none', 
                outline: 'none', 
                fontSize: '0.9rem',
                background: 'transparent'
              }}
            />
            {search && (
              <XCircle 
                size={16} 
                color="#737373" 
                style={{ cursor: 'pointer' }}
                onClick={() => setSearch('')}
              />
            )}
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

        {/* Full Hierarchy Filters */}
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
            <option value="">All States</option>
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
            <option value="">All Districts</option>
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
            <option value="">All Assembly Constituencies</option>
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
            <option value="">All Blocks</option>
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
            <option value="">All Panchayats</option>
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
            <option value="">All Polling Booths</option>
            {booths.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={selectedVillage} 
            onChange={(e) => setSelectedVillage(e.target.value)} 
            disabled={!selectedBooth}
            style={{ minWidth: '130px', padding: '0.4rem 0.8rem' }}
          >
            <option value="">All Villages</option>
            {villages.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        {/* Results Count */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            Showing {filteredProjects.length} of {DEVELOPMENT_PROJECTS.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
          gap: '1.25rem' 
        }}>
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              style={{ 
                background: 'white', 
                borderRadius: '0.75rem', 
                border: `1px solid ${project.status === 'Delayed' ? '#ef444430' : '#f0f0f0'}`,
                overflow: 'hidden',
                transition: 'all 0.3s'
              }}
            >
              <div style={{ 
                padding: '1.25rem 1.25rem 0.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start'
              }}>
                <div>
                  <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a', marginBottom: '0.25rem' }}>
                    {project.name}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: '#737373' }}>
                    {project.type} · {project.department}
                  </p>
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

              <div style={{ 
                padding: '0 1.25rem 0.75rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                fontSize: '0.75rem',
                color: '#737373'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={14} /> {project.district}
                </span>
                <span>·</span>
                <span>{project.constituency}</span>
                <span>·</span>
                <span>{project.block}</span>
                {project.village && (
                  <>
                    <span>·</span>
                    <span>{project.village}</span>
                  </>
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
                    style={{ 
                      height: '100%', 
                      background: project.status === 'Delayed' ? '#ef4444' : 
                                 project.progress > 70 ? '#22c55e' : 
                                 project.progress > 40 ? '#f59e0b' : '#b91c1c',
                      borderRadius: '9999px'
                    }} 
                  />
                </div>
              </div>

              <div style={{ 
                padding: '0.75rem 1.25rem',
                background: '#fafafa',
                borderTop: '1px solid #f0f0f0',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: '#404040'
              }}>
                <div>
                  <span style={{ color: '#737373' }}>Budget:</span>{' '}
                  <strong>₹{(project.budget / 100000).toFixed(1)}L</strong>
                </div>
                <div>
                  <span style={{ color: '#737373' }}>Allocated:</span>{' '}
                  <strong>₹{(project.allocated / 100000).toFixed(1)}L</strong>
                </div>
                <div>
                  <span style={{ color: '#737373' }}>Start:</span>{' '}
                  <span>{project.startDate}</span>
                </div>
                <div>
                  <span style={{ color: '#737373' }}>Expected:</span>{' '}
                  <span>{project.expectedCompletion}</span>
                </div>
              </div>

              <div style={{ 
                padding: '0.75rem 1.25rem',
                display: 'flex',
                gap: '0.5rem',
                borderTop: '1px solid #f0f0f0'
              }}>
                <button 
                  onClick={() => { setSelectedProject(project); setShowModal(true); }}
                  className="btn-primary" 
                  style={{ 
                    flex: 1, 
                    padding: '0.4rem', 
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Eye size={16} /> View Details
                </button>
                <button className="btn-outline" style={{ flex: 1, padding: '0.4rem', fontSize: '0.8rem' }}>
                  <TrendingUp size={16} /> Update
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            background: 'white',
            borderRadius: '0.75rem',
            border: '1px solid #f0f0f0'
          }}>
            <Building2 size={48} color="#737373" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a1a1a' }}>No projects found</h3>
            <p style={{ color: '#737373', marginTop: '0.25rem' }}>
              Try adjusting your filters or create a new project
            </p>
            <button className="btn-primary" style={{ marginTop: '1rem' }}>
              <Plus size={16} /> Create New Project
            </button>
          </div>
        )}

        {/* Project Details Modal with Charts */}
        {showModal && selectedProject && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-content"
              style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'start', 
                marginBottom: '1rem',
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '1rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>
                    {selectedProject.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#737373' }}>
                    {selectedProject.type} · {selectedProject.department}
                  </p>
                </div>
                <button 
                  onClick={() => setShowModal(false)} 
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}
                >
                  ×
                </button>
              </div>
              
              {/* Description */}
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#404040', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {selectedProject.description}
                </p>
                {selectedProject.delayedReason && (
                  <div style={{ 
                    marginTop: '0.5rem', 
                    padding: '0.5rem 1rem', 
                    background: '#fee2e2', 
                    borderRadius: '0.5rem',
                    border: '1px solid #fecaca',
                    fontSize: '0.85rem',
                    color: '#991b1b'
                  }}>
                    <strong>⚠️ Delayed Reason:</strong> {selectedProject.delayedReason}
                  </div>
                )}
              </div>

              {/* Charts Row */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr 1fr', 
                gap: '1.5rem',
                marginBottom: '1.5rem',
                padding: '1rem',
                background: '#fafafa',
                borderRadius: '0.5rem',
                border: '1px solid #f0f0f0'
              }}>
                {/* Progress Circle Chart */}
                <div style={{ textAlign: 'center' }}>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '0.5rem' }}>
                    Overall Progress
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ProgressChart 
                      progress={selectedProject.progress} 
                      delayed={selectedProject.status === 'Delayed'} 
                    />
                  </div>
                </div>

                {/* Milestone Progress */}
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '0.5rem' }}>
                    Milestone Progress
                  </h4>
                  <div style={{ 
                    background: 'white', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    border: '1px solid #f0f0f0'
                  }}>
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
                        style={{ 
                          height: '100%', 
                          background: getProjectStats(selectedProject).milestoneProgress > 70 ? '#22c55e' : 
                                     getProjectStats(selectedProject).milestoneProgress > 40 ? '#f59e0b' : '#b91c1c',
                          borderRadius: '9999px'
                        }} 
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.65rem', color: '#737373' }}>
                      <span>Started</span>
                      <span>In Progress</span>
                      <span>Complete</span>
                    </div>
                  </div>
                </div>

                {/* Budget Utilization */}
                <div>
                  <h4 style={{ fontSize: '0.8rem', fontWeight: '600', color: '#737373', marginBottom: '0.5rem' }}>
                    Budget Utilization
                  </h4>
                  <div style={{ 
                    background: 'white', 
                    padding: '1rem', 
                    borderRadius: '0.5rem',
                    border: '1px solid #f0f0f0'
                  }}>
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
                        style={{ 
                          height: '100%', 
                          background: getProjectStats(selectedProject).budgetUtilization > 70 ? '#22c55e' : 
                                     getProjectStats(selectedProject).budgetUtilization > 40 ? '#f59e0b' : '#ef4444',
                          borderRadius: '9999px'
                        }} 
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.65rem', color: '#737373' }}>
                      <span>Remaining: ₹{((selectedProject.budget - selectedProject.allocated) / 100000).toFixed(1)}L</span>
                      <span>Used: ₹{(selectedProject.allocated / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Timeline */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                  Project Status Timeline
                </h4>
                <StatusTimeline project={selectedProject} />
              </div>

              {/* Project Details Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '0.5rem', 
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                background: '#fafafa',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: '1px solid #f0f0f0'
              }}>
                <div><strong>Status:</strong> <span className={`status-badge ${getStatusColor(selectedProject.status)}`}>{selectedProject.status}</span></div>
                <div><strong>Progress:</strong> {selectedProject.progress}%</div>
                <div><strong>Budget:</strong> ₹{(selectedProject.budget/100000).toFixed(1)}L</div>
                <div><strong>Allocated:</strong> ₹{(selectedProject.allocated/100000).toFixed(1)}L</div>
                <div><strong>Start Date:</strong> {selectedProject.startDate}</div>
                <div><strong>Expected Completion:</strong> {selectedProject.expectedCompletion}</div>
                <div><strong>District:</strong> {selectedProject.district}</div>
                <div><strong>Constituency:</strong> {selectedProject.constituency}</div>
                <div><strong>Block:</strong> {selectedProject.block}</div>
                <div><strong>Panchayat:</strong> {selectedProject.panchayat}</div>
                <div><strong>Polling Booth:</strong> {selectedProject.pollingBooth}</div>
                <div><strong>Village:</strong> {selectedProject.village}</div>
              </div>

              {/* Milestones */}
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#1a1a1a' }}>
                📋 Milestones ({getProjectStats(selectedProject).completedMilestones}/{getProjectStats(selectedProject).totalMilestones})
              </h4>
              {selectedProject.milestones.map((m, i) => (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid #f5f5f5' 
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{m.completed ? '✅' : '⏳'}</span>
                  <span style={{ flex: 1, fontSize: '0.9rem' }}>{m.name}</span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: m.completed ? '#166534' : '#737373',
                    background: m.completed ? '#dcfce7' : '#f0f0f0',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
                    {m.completed ? 'Completed' : 'Pending'}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#737373' }}>{m.date}</span>
                </div>
              ))}

              {/* Action Buttons */}
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <TrendingUp size={18} /> Update Progress
                </button>
                <button className="btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <BarChart3 size={18} /> View Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </LayoutWrapper>
  );
};

export default Development;