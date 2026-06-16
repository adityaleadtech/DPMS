import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { useAuth } from '../context/AuthContext';
import { 
  VOTERS, 
  COMPLAINTS, 
  DEVELOPMENT_PROJECTS, 
  SCHEMES,
  FUNDING,
  MEETINGS,
  REGISTRATIONS,
  VOLUNTEERS,
  SURVEY_REPORTS,
  AUDIT_REPORTS,
  getDashboardStats,
  getStates,
  getDistricts,
  getAssemblyConstituencies,
  getBlocks,
  getPanchayats,
  getPollingBooths,
  getVillages
} from '../api/data';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const stats = getDashboardStats();
  
  // Full Hierarchy Filter states
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

  // Filter data based on full hierarchy
  const getFilteredData = (data) => {
    return data.filter(item => {
      let match = true;
      if (selectedState && item.state !== selectedState) match = false;
      if (selectedDistrict && item.district !== selectedDistrict) match = false;
      if (selectedAssembly && item.assemblyConstituency !== selectedAssembly) match = false;
      if (selectedBlock && item.block !== selectedBlock) match = false;
      if (selectedPanchayat && item.panchayat !== selectedPanchayat) match = false;
      if (selectedBooth && item.pollingBooth !== selectedBooth) match = false;
      if (selectedVillage && item.village !== selectedVillage) match = false;
      return match;
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedAssembly('');
    setSelectedBlock('');
    setSelectedPanchayat('');
    setSelectedBooth('');
    setSelectedVillage('');
  };

  const hasActiveFilters = selectedState || selectedDistrict || selectedAssembly || selectedBlock || selectedPanchayat || selectedBooth || selectedVillage;

  const filteredVoters = getFilteredData(VOTERS);
  const filteredProjects = getFilteredData(DEVELOPMENT_PROJECTS);
  const filteredComplaints = getFilteredData(COMPLAINTS);
  const filteredSchemes = getFilteredData(SCHEMES);
  const filteredMeetings = getFilteredData(MEETINGS);
  const filteredFunding = getFilteredData(FUNDING);
  const filteredRegistrations = getFilteredData(REGISTRATIONS);
  const filteredVolunteers = getFilteredData(VOLUNTEERS);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 शुभ प्रभात';
    if (hour < 17) return '☀️ शुभ अपराह्न';
    return '🌙 शुभ संध्या';
  };

  // KPI Cards configuration
  const kpiCards = [
    // Development KPIs
    { 
      id: 'dev1',
      label: 'Total Development Projects', 
      value: filteredProjects.length, 
      icon: '🏗️', 
      change: '+12%',
      color: '#b91c1c',
      category: 'Development'
    },
    { 
      id: 'dev2',
      label: 'In Progress Projects', 
      value: filteredProjects.filter(p => p.status === 'In Progress').length, 
      icon: '🔄', 
      change: '+8%',
      color: '#f59e0b',
      category: 'Development'
    },
    { 
      id: 'dev3',
      label: 'Active Projects', 
      value: filteredProjects.filter(p => p.status === 'Active' || p.status === 'In Progress').length, 
      icon: '✅', 
      change: '+10%',
      color: '#22c55e',
      category: 'Development'
    },
    { 
      id: 'dev4',
      label: 'Completed Projects', 
      value: filteredProjects.filter(p => p.status === 'Completed').length, 
      icon: '🎯', 
      change: '+15%',
      color: '#3b82f6',
      category: 'Development'
    },
    { 
      id: 'dev5',
      label: 'Delayed Projects', 
      value: filteredProjects.filter(p => p.status === 'Delayed' || (p.status === 'In Progress' && p.progress < 30)).length || Math.floor(filteredProjects.length * 0.15), 
      icon: '⏰', 
      change: '🔴 +5%',
      color: '#ef4444',
      category: 'Development'
    },
    { 
      id: 'dev6',
      label: 'Project Completion Rate', 
      value: `${filteredProjects.length > 0 ? Math.round((filteredProjects.filter(p => p.status === 'Completed').length / filteredProjects.length) * 100) : 0}%`, 
      icon: '📈', 
      change: '+5%',
      color: '#8b5cf6',
      category: 'Development'
    },

    // Budget KPIs
    { 
      id: 'budget1',
      label: 'Total Budget Allocated', 
      value: `₹${(filteredProjects.reduce((sum, p) => sum + p.budget, 0) / 10000000).toFixed(1)}Cr`, 
      icon: '💰', 
      change: '+18%',
      color: '#16a34a',
      category: 'Budget'
    },
    { 
      id: 'budget2',
      label: 'Utilized Budget', 
      value: `₹${(filteredProjects.reduce((sum, p) => sum + p.allocated, 0) / 10000000).toFixed(1)}Cr`, 
      icon: '📊', 
      change: '+12%',
      color: '#2563eb',
      category: 'Budget'
    },
    { 
      id: 'budget3',
      label: 'Budget Utilization', 
      value: `${filteredProjects.length > 0 ? Math.round((filteredProjects.reduce((sum, p) => sum + p.allocated, 0) / filteredProjects.reduce((sum, p) => sum + p.budget, 0)) * 100) : 0}%`, 
      icon: '📈', 
      change: '+8%',
      color: '#8b5cf6',
      category: 'Budget'
    },

    // Voter KPIs
    { 
      id: 'voter1',
      label: 'Total Voters', 
      value: filteredVoters.length.toLocaleString(), 
      icon: '👥', 
      change: '+5.2%',
      color: '#2563eb',
      category: 'Voters'
    },
    { 
      id: 'voter2',
      label: 'Active Voters', 
      value: filteredVoters.filter(v => v.status === 'Active').length.toLocaleString(), 
      icon: '✅', 
      change: '+3.8%',
      color: '#16a34a',
      category: 'Voters'
    },
    { 
      id: 'voter3',
      label: 'Voter Registration (Pending)', 
      value: filteredRegistrations.filter(r => r.status === 'Pending').length, 
      icon: '📝', 
      change: '🔴 New',
      color: '#f59e0b',
      category: 'Voters'
    },

    // Complaints KPIs
    { 
      id: 'comp1',
      label: 'Total Complaints', 
      value: filteredComplaints.length, 
      icon: '⚠️', 
      change: '+12%',
      color: '#ef4444',
      category: 'Complaints'
    },
    { 
      id: 'comp2',
      label: 'Open Complaints', 
      value: filteredComplaints.filter(c => c.status === 'Open').length, 
      icon: '🔴', 
      change: '+8%',
      color: '#dc2626',
      category: 'Complaints'
    },
    { 
      id: 'comp3',
      label: 'Resolved Complaints', 
      value: filteredComplaints.filter(c => c.status === 'Resolved' || c.status === 'Closed').length, 
      icon: '✅', 
      change: '+15%',
      color: '#22c55e',
      category: 'Complaints'
    },

    // Meetings KPIs
    { 
      id: 'meet1',
      label: 'Total Meetings', 
      value: filteredMeetings.length, 
      icon: '📅', 
      change: '+10%',
      color: '#8b5cf6',
      category: 'Meetings'
    },
    { 
      id: 'meet2',
      label: 'Pending Meetings', 
      value: filteredMeetings.filter(m => m.status === 'Pending').length, 
      icon: '⏳', 
      change: '🔴 New',
      color: '#f59e0b',
      category: 'Meetings'
    },

    // Schemes KPIs
    { 
      id: 'sch1',
      label: 'Total Schemes (Yojnas)', 
      value: filteredSchemes.length, 
      icon: '🏛️', 
      change: '+18%',
      color: '#1e40af',
      category: 'Schemes'
    },
    { 
      id: 'sch2',
      label: 'Active Schemes', 
      value: filteredSchemes.filter(s => s.status === 'Active').length, 
      icon: '✅', 
      change: '+10%',
      color: '#16a34a',
      category: 'Schemes'
    },
    { 
      id: 'sch3',
      label: 'Total Beneficiaries', 
      value: filteredSchemes.reduce((sum, s) => sum + s.beneficiaries, 0).toLocaleString(), 
      icon: '👤', 
      change: '+25%',
      color: '#9333ea',
      category: 'Schemes'
    },

    // Funding KPIs
    { 
      id: 'fund1',
      label: 'Total Funding', 
      value: `₹${(filteredFunding.reduce((sum, f) => sum + f.totalAmount, 0) / 10000000).toFixed(1)}Cr`, 
      icon: '💰', 
      change: '+22%',
      color: '#16a34a',
      category: 'Funding'
    },
    { 
      id: 'fund2',
      label: 'Fund Utilization', 
      value: `${filteredFunding.length > 0 ? Math.round((filteredFunding.reduce((sum, f) => sum + f.utilized, 0) / filteredFunding.reduce((sum, f) => sum + f.totalAmount, 0)) * 100) : 0}%`, 
      icon: '📊', 
      change: '+8%',
      color: '#8b5cf6',
      category: 'Funding'
    },

    // Volunteer KPIs
    { 
      id: 'vol1',
      label: 'Total Volunteers', 
      value: filteredVolunteers.length, 
      icon: '🤝', 
      change: '+15%',
      color: '#7c3aed',
      category: 'Volunteers'
    },
    { 
      id: 'vol2',
      label: 'Pending Volunteers', 
      value: filteredVolunteers.filter(v => v.status === 'Pending').length, 
      icon: '⏳', 
      change: '🔴 New',
      color: '#f59e0b',
      category: 'Volunteers'
    },

    // Survey & Audit KPIs
    { 
      id: 'surv1',
      label: 'Total Surveys', 
      value: SURVEY_REPORTS.length, 
      icon: '🔍', 
      change: '+10%',
      color: '#06b6d4',
      category: 'Survey'
    },
    { 
      id: 'aud1',
      label: 'Total Audits', 
      value: AUDIT_REPORTS.length, 
      icon: '📋', 
      change: '+8%',
      color: '#6366f1',
      category: 'Audit'
    },
    { 
      id: 'aud2',
      label: 'Pending Audits', 
      value: AUDIT_REPORTS.filter(a => a.status === 'Pending').length, 
      icon: '⏳', 
      change: '🔴 New',
      color: '#ef4444',
      category: 'Audit'
    }
  ];

  // Group KPIs by category
  const groupedKPIs = kpiCards.reduce((acc, kpi) => {
    if (!acc[kpi.category]) acc[kpi.category] = [];
    acc[kpi.category].push(kpi);
    return acc;
  }, {});

  const quickActions = [
    { icon: '🏗️', label: 'New Development', path: '/development', color: '#b91c1c' },
    { icon: '📝', label: 'New Complaint', path: '/complaints', color: '#ef4444' },
    { icon: '🎤', label: 'Schedule Jan Sabha', path: '/jansabha', color: '#8b5cf6' },
    { icon: '💰', label: 'Create Funding', path: '/funding', color: '#16a34a' },
    { icon: '📋', label: 'Register Voter', path: '/registration', color: '#2563eb' },
    { icon: '🤝', label: 'Add Volunteer', path: '/volunteers', color: '#7c3aed' },
  ];

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome Banner with Namaste in Hindi */}
        <div style={{ 
          background: 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
          borderRadius: '1rem',
          padding: '1.5rem 2rem',
          marginBottom: '1.5rem',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2rem' }}>🙏</span>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>
                नमस्ते {user?.name?.split(' ')[0]}!
              </h1>
              <span style={{ 
                fontSize: '0.85rem', 
                background: 'rgba(255,255,255,0.2)', 
                padding: '0.2rem 0.8rem', 
                borderRadius: '9999px',
                fontWeight: '500'
              }}>
                {getGreeting()}
              </span>
            </div>
            <p style={{ opacity: 0.9, marginTop: '0.25rem', fontSize: '0.95rem' }}>
              {user?.role} · {user?.region} {user?.department && `· ${user.department} Department`}
            </p>
            <p style={{ 
              opacity: 0.8, 
              marginTop: '0.25rem', 
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <span>🇮🇳 भारत</span>
              {selectedState && <span>· {selectedState}</span>}
              {selectedDistrict && <span>· {selectedDistrict}</span>}
              {selectedAssembly && <span>· {selectedAssembly}</span>}
              <span style={{ 
                width: '4px', 
                height: '4px', 
                borderRadius: '50%', 
                background: 'rgba(255,255,255,0.5)' 
              }} />
              <span>🕉️ सबका साथ, सबका विकास</span>
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
              🏗️ {stats.totalProjects} Projects
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
              🔄 {DEVELOPMENT_PROJECTS.filter(p => p.status === 'In Progress').length} In Progress
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
              ⏰ {DEVELOPMENT_PROJECTS.filter(p => p.status === 'Delayed' || (p.status === 'In Progress' && p.progress < 30)).length} Delayed
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
              👥 {stats.totalVoters.toLocaleString()} Voters
            </span>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
              🏛️ {stats.totalSchemes} Schemes
            </span>
          </div>
        </div>

        {/* Full Hierarchy Filters */}
        <div className="filter-group" style={{ flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.85rem', marginRight: '0.25rem' }}>📍 Hierarchy:</span>
          
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
            style={{ minWidth: '130px' }}
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
            style={{ minWidth: '130px' }}
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
            style={{ minWidth: '140px' }}
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
            style={{ minWidth: '130px' }}
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
            style={{ minWidth: '140px' }}
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
            style={{ minWidth: '130px' }}
          >
            <option value="">All Polling Booths</option>
            {booths.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={selectedVillage} 
            onChange={(e) => setSelectedVillage(e.target.value)} 
            disabled={!selectedBooth}
            style={{ minWidth: '130px' }}
          >
            <option value="">All Villages</option>
            {villages.map(v => <option key={v} value={v}>{v}</option>)}
          </select>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn-outline btn-sm">
              Clear All
            </button>
          )}
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <div style={{ 
            marginBottom: '1.5rem', 
            padding: '0.5rem 1rem', 
            background: '#fef2f2', 
            borderRadius: '0.5rem',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            fontSize: '0.85rem'
          }}>
            <span style={{ fontWeight: '600', color: '#404040' }}>Active Filters:</span>
            {selectedState && <span className="status-badge status-active">{selectedState}</span>}
            {selectedDistrict && <span className="status-badge status-scheduled">{selectedDistrict}</span>}
            {selectedAssembly && <span className="status-badge status-completed">{selectedAssembly}</span>}
            {selectedBlock && <span className="status-badge status-upcoming">{selectedBlock}</span>}
            {selectedPanchayat && <span className="status-badge status-active">{selectedPanchayat}</span>}
            {selectedBooth && <span className="status-badge status-scheduled">{selectedBooth}</span>}
            {selectedVillage && <span className="status-badge status-completed">{selectedVillage}</span>}
            <span style={{ marginLeft: 'auto', color: '#737373' }}>
              Showing filtered data across all KPIs
            </span>
          </div>
        )}

        {/* KPI Cards by Category */}
        {Object.entries(groupedKPIs).map(([category, kpis]) => (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem', 
              color: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{ 
                display: 'inline-block', 
                width: '4px', 
                height: '20px', 
                background: category === 'Budget' ? '#16a34a' : '#b91c1c', 
                borderRadius: '2px' 
              }} />
              {category}
            </h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '1rem' 
            }}>
              {kpis.map((kpi, i) => (
                <motion.div
                  key={kpi.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(185, 28, 28, 0.08)' }}
                  style={{
                    background: 'white',
                    padding: '1.25rem',
                    borderRadius: '0.75rem',
                    border: `1px solid ${kpi.color}20`,
                    transition: 'all 0.3s',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    const pageMap = {
                      'Development': '/development',
                      'Budget': '/development',
                      'Voters': '/voters',
                      'Complaints': '/complaints',
                      'Meetings': '/meetings',
                      'Schemes': '/schemes',
                      'Funding': '/funding',
                      'Volunteers': '/volunteers',
                      'Survey': '/development',
                      'Audit': '/development'
                    };
                    if (pageMap[category]) navigate(pageMap[category]);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '1.5rem' }}>{kpi.icon}</span>
                    <span style={{ 
                      fontSize: '0.65rem', 
                      color: kpi.change.includes('🔴') ? '#ef4444' : '#22c55e',
                      fontWeight: '600',
                      background: kpi.change.includes('🔴') ? '#fef2f2' : '#dcfce7',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '9999px'
                    }}>
                      {kpi.change}
                    </span>
                  </div>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a', marginTop: '0.5rem' }}>
                    {kpi.value}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#737373' }}>{kpi.label}</p>
                  {kpi.id === 'dev5' && kpi.value > 0 && (
                    <div style={{ marginTop: '0.3rem', display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.55rem', color: '#ef4444', background: '#fee2e2', padding: '0.15rem 0.4rem', borderRadius: '9999px' }}>
                        ⚠️ Action Required
                      </span>
                    </div>
                  )}
                  {kpi.id === 'budget3' && (
                    <div style={{ marginTop: '0.5rem', height: '3px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${kpi.value.replace('%', '')}%`, 
                        height: '100%', 
                        background: parseInt(kpi.value) > 70 ? '#22c55e' : parseInt(kpi.value) > 40 ? '#f59e0b' : '#ef4444',
                        borderRadius: '9999px'
                      }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div style={{ marginTop: '1.5rem' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: 'bold', 
            marginBottom: '0.75rem', 
            color: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ 
              display: 'inline-block', 
              width: '4px', 
              height: '20px', 
              background: '#b91c1c', 
              borderRadius: '2px' 
            }} />
            ⚡ Quick Actions
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
            gap: '0.75rem',
            background: 'white',
            padding: '1.25rem',
            borderRadius: '0.75rem',
            border: '1px solid #f0f0f0'
          }}>
            {quickActions.map((action, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(action.path)}
                style={{
                  padding: '0.75rem',
                  background: 'white',
                  border: `1px solid ${action.color}20`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = action.color;
                  e.currentTarget.style.boxShadow = `0 4px 15px ${action.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${action.color}20`;
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#404040' }}>{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
              🏗️ Recent Development Projects
            </h4>
            {getFilteredData(DEVELOPMENT_PROJECTS).slice(0, 5).map((project) => (
              <div key={project.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid #f5f5f5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{project.name}</span>
                  <span className={`status-badge ${project.status === 'Active' ? 'status-active' : project.status === 'In Progress' ? 'status-scheduled' : project.status === 'Completed' ? 'status-completed' : project.status === 'Delayed' ? 'status-inactive' : 'status-upcoming'}`}>
                    {project.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#737373' }}>{project.district} · {project.constituency}</div>
                <div style={{ marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ flex: 1, height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${project.progress}%`, height: '100%', background: project.status === 'Delayed' ? '#ef4444' : '#b91c1c', borderRadius: '9999px' }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>{project.progress}%</span>
                </div>
              </div>
            ))}
            <button onClick={() => navigate('/development')} className="btn-outline" style={{ marginTop: '1rem', width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}>
              View All →
            </button>
          </div>

          <div style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
              ⚠️ Recent Complaints
            </h4>
            {getFilteredData(COMPLAINTS).slice(0, 5).map((complaint) => (
              <div key={complaint.id} style={{ padding: '0.6rem 0', borderBottom: '1px solid #f5f5f5' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{complaint.title}</span>
                  <span className={`status-badge ${complaint.status === 'Open' ? 'status-pending' : complaint.status === 'In Progress' ? 'status-scheduled' : complaint.status === 'Resolved' ? 'status-completed' : 'status-inactive'}`}>
                    {complaint.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#737373' }}>{complaint.district} · {complaint.constituency}</div>
              </div>
            ))}
            <button onClick={() => navigate('/complaints')} className="btn-outline" style={{ marginTop: '1rem', width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}>
              View All →
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '1.5rem', 
          textAlign: 'center', 
          padding: '1rem',
          color: '#737373',
          fontSize: '0.85rem',
          borderTop: '1px solid #f0f0f0'
        }}>
          🙏 जय जवान, जय किसान, जय विज्ञान, जय अनुसंधान · Development for All · 🇮🇳
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Dashboard;