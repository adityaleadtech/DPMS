import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  Calendar, 
  Landmark, 
  Wallet, 
  UserPlus, 
  UserCheck,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  IndianRupee,
  Filter,
  MapPin,
  BarChart3,
  PieChart,
  LineChart as LineChartIcon,
  Activity,
  Award,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
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
  getVillages,
  getMinisters,
  getProjectsByState
} from '../api/data';

// Glassmorphic Card Component
const GlassCard = ({ children, className, style }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    borderRadius: '16px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    ...style
  }}>
    {children}
  </div>
);

// Bar Chart Component
const CustomBarChart = ({ data, color, height = 120, showLabels = true }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.6rem', height: `${height}px`, paddingTop: '0.5rem' }}>
      {data.map((item, index) => (
        <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(item.value / max) * (height - 30)}px` }}
            transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
            style={{
              width: '100%',
              maxWidth: '40px',
              background: color || '#b91c1c',
              borderRadius: '6px 6px 2px 2px',
              position: 'relative',
              minHeight: '4px',
              opacity: 0.7 + (index / data.length) * 0.3,
              boxShadow: `0 4px 12px ${color || '#b91c1c'}40`
            }}
          >
            <div style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.65rem',
              fontWeight: '600',
              color: '#1a1a1a'
            }}>
              {item.value}
            </div>
          </motion.div>
          {showLabels && (
            <div style={{
              fontSize: '0.55rem',
              color: '#737373',
              marginTop: '0.3rem',
              textAlign: 'center',
              maxWidth: '40px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {item.label}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Line Chart Component
const CustomLineChart = ({ data, color, height = 100 }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  const points = data.map((d, i) => 
    `${(i / (data.length - 1)) * 100},${100 - (d.value / max) * 80}`
  ).join(' ');
  
  return (
    <div style={{ height: `${height}px`, position: 'relative' }}>
      <svg width="100%" height={height} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pos) => (
          <line
            key={pos}
            x1="0"
            y1={height - (pos / 100) * (height - 10)}
            x2="100%"
            y2={height - (pos / 100) * (height - 10)}
            stroke="#e5e5e5"
            strokeWidth="0.5"
            strokeDasharray="4,4"
          />
        ))}
        
        {/* Area fill */}
        <polygon
          points={`0,${height} ${points} ${100},${height}`}
          fill={`${color || '#b91c1c'}20`}
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color || '#b91c1c'}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((d, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y = height - (d.value / max) * 80;
          return (
            <motion.circle
              key={i}
              cx={`${x}%`}
              cy={y}
              r="4"
              fill={color || '#b91c1c'}
              stroke="white"
              strokeWidth="2"
              initial={{ r: 0 }}
              animate={{ r: 4 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <title>{d.label}: {d.value}</title>
            </motion.circle>
          );
        })}
      </svg>
    </div>
  );
};

// Pie Chart Component
const CustomPieChart = ({ data, size = 120 }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let currentAngle = 0;
  
  const colors = ['#b91c1c', '#f59e0b', '#22c55e', '#3b82f6', '#8b5cf6', '#ef4444', '#06b6d4', '#14b8a6'];
  
  const slices = data.map((d, i) => {
    const percentage = total > 0 ? (d.value / total) * 100 : 0;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (startAngle + angle - 90) * Math.PI / 180;
    
    const x1 = 50 + 40 * Math.cos(startRad);
    const y1 = 50 + 40 * Math.sin(startRad);
    const x2 = 50 + 40 * Math.cos(endRad);
    const y2 = 50 + 40 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return {
      path: `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: colors[i % colors.length],
      percentage: percentage,
      label: d.label
    };
  });
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        {slices.map((slice, i) => (
          <motion.path
            key={i}
            d={slice.path}
            fill={slice.color}
            initial={{ opacity: 0, transform: 'scale(0.8)' }}
            animate={{ opacity: 1, transform: 'scale(1)' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{ cursor: 'pointer' }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8' }
            onMouseLeave={(e) => e.target.style.opacity = '1' }
          />
        ))}
        <circle cx="50" cy="50" r="20" fill="white" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.7rem' }}>
            <span style={{ 
              width: '10px', 
              height: '10px', 
              borderRadius: '2px', 
              background: colors[i % colors.length] 
            }} />
            <span style={{ color: '#404040' }}>{d.label}</span>
            <span style={{ fontWeight: '600', color: '#1a1a1a', marginLeft: 'auto' }}>
              {total > 0 ? Math.round((d.value / total) * 100) : 0}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, isPM } = useAuth();
  const navigate = useNavigate();
  const stats = getDashboardStats();
  const ministers = getMinisters();
  
  // Filter states
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');

  const states = getStates();
  const districts = getDistricts(selectedState);
  const assemblies = getAssemblyConstituencies(selectedState, selectedDistrict);
  const blocks = getBlocks(selectedState, selectedDistrict, selectedAssembly);
  const panchayats = getPanchayats(selectedState, selectedDistrict, selectedAssembly, selectedBlock);
  const booths = getPollingBooths(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat);
  const villages = getVillages(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat, selectedBooth);

  const getFilteredData = (data) => {
    return data.filter(item => {
      let match = true;
      if (selectedState && item.state !== selectedState) match = false;
      if (selectedDistrict && item.district !== selectedDistrict) match = false;
      if (selectedAssembly && item.constituency !== selectedAssembly) match = false;
      if (selectedBlock && item.block !== selectedBlock) match = false;
      if (selectedPanchayat && item.panchayat !== selectedPanchayat) match = false;
      if (selectedBooth && item.pollingBooth !== selectedBooth) match = false;
      if (selectedVillage && item.village !== selectedVillage) match = false;
      return match;
    });
  };

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

  const filteredProjects = getFilteredData(DEVELOPMENT_PROJECTS);
  const filteredVoters = getFilteredData(VOTERS);

  const userAvatar = user?.Avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq0sw-nyjVU57Svz9x-mVgrtO1GMOowr4WAUvUrNq0jawYAOEqIGauc9xxDwYE_XtKiylQarUV_JUtAuNuaI8Upl615e1BHBZVitMHRE8&s=10';

  // Chart Data
  const projectStatusData = [
    { label: 'Active', value: filteredProjects.filter(p => p.status === 'Active').length },
    { label: 'In Progress', value: filteredProjects.filter(p => p.status === 'In Progress').length },
    { label: 'Completed', value: filteredProjects.filter(p => p.status === 'Completed').length },
    { label: 'Delayed', value: filteredProjects.filter(p => p.status === 'Delayed').length },
    { label: 'Draft', value: filteredProjects.filter(p => p.status === 'Draft').length },
  ];

  const budgetData = DEVELOPMENT_PROJECTS.slice(0, 8).map((p, i) => ({
    label: p.district.substring(0, 4),
    value: Math.round(p.budget / 1000000)
  }));

  const monthlyProgress = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 48 },
    { label: 'Apr', value: 63 },
    { label: 'May', value: 71 },
    { label: 'Jun', value: 68 },
    { label: 'Jul', value: 82 },
    { label: 'Aug', value: 78 },
    { label: 'Sep', value: 85 },
    { label: 'Oct', value: 90 },
    { label: 'Nov', value: 87 },
    { label: 'Dec', value: 93 },
  ];

  const completionRate = filteredProjects.length > 0 
    ? Math.round((filteredProjects.filter(p => p.status === 'Completed').length / filteredProjects.length) * 100) 
    : 0;

  // KPI Cards
  const kpiCards = [
    { 
      id: 'dev1',
      label: 'Total Projects', 
      value: filteredProjects.length, 
      icon: Building2, 
      change: '+12%',
      trend: 'up',
      color: '#b91c1c',
      bgColor: 'rgba(185, 28, 28, 0.08)'
    },
    { 
      id: 'dev2',
      label: 'In Progress', 
      value: filteredProjects.filter(p => p.status === 'In Progress').length, 
      icon: TrendingUp, 
      change: '+8%',
      trend: 'up',
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.08)'
    },
    { 
      id: 'dev3',
      label: 'Delayed Projects', 
      value: filteredProjects.filter(p => p.status === 'Delayed').length, 
      icon: Clock, 
      change: '-3%',
      trend: 'down',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.08)'
    },
    { 
      id: 'voter1',
      label: 'Total Voters', 
      value: filteredVoters.length.toLocaleString(), 
      icon: Users, 
      change: '+5.2%',
      trend: 'up',
      color: '#2563eb',
      bgColor: 'rgba(37, 99, 235, 0.08)'
    },
    { 
      id: 'sch1',
      label: 'Active Schemes', 
      value: SCHEMES.filter(s => s.status === 'Active').length, 
      icon: Landmark, 
      change: '+18%',
      trend: 'up',
      color: '#1e40af',
      bgColor: 'rgba(30, 64, 175, 0.08)'
    },
    { 
      id: 'comp1',
      label: 'Complaints', 
      value: COMPLAINTS.length, 
      icon: AlertTriangle, 
      change: '+12%',
      trend: 'up',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.08)'
    },
  ];

  return (
    <LayoutWrapper>
      <div style={{ padding: '0.5rem 0' }}>
        {/* Glassmorphic Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.9) 0%, rgba(127, 29, 29, 0.85) 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '2rem',
            marginBottom: '1.5rem',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 20px 60px rgba(185, 28, 28, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '600', letterSpacing: '-0.5px' }}>
                Namaste, {user?.name?.split(' ')[0]} Ji
              </h1>
              <span style={{ 
                fontSize: '0.8rem', 
                background: 'rgba(255,255,255,0.15)', 
                padding: '0.25rem 1rem', 
                borderRadius: '9999px',
                fontWeight: '500',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p style={{ opacity: 0.85, marginTop: '0.25rem', fontSize: '0.95rem' }}>
              {user?.role} · {user?.region} {user?.department && `· ${user.department} Department`}
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              marginTop: '0.75rem', 
              flexWrap: 'wrap'
            }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
                {stats.totalProjects} Projects
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
                {DEVELOPMENT_PROJECTS.filter(p => p.status === 'In Progress').length} In Progress
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
                {stats.delayedProjects} Delayed
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.8rem', borderRadius: '9999px', fontSize: '0.8rem' }}>
                {stats.totalVoters.toLocaleString()} Voters
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(255,255,255,0.3)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <img 
                src={userAvatar} 
                alt={user?.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `<span style="font-size: 2.2rem; color: white; font-weight: 300;">${user?.name?.charAt(0) || 'U'}</span>`;
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#22c55e',
                border: '2px solid rgba(255,255,255,0.8)'
              }} />
            </div>
          </div>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-50px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none'
          }} />
        </motion.div>

        {/* Charts Section - Right After Namaste Card */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr 1fr', 
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Bar Chart - Project Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 size={18} color="#b91c1c" />
                Project Status
              </h4>
              <span style={{ fontSize: '0.65rem', color: '#737373' }}>Total: {filteredProjects.length}</span>
            </div>
            <CustomBarChart data={projectStatusData} color="#b91c1c" height={100} />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '0.5rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(0,0,0,0.05)'
            }}>
              {projectStatusData.map((item, index) => (
                <div key={index} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a' }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: '0.55rem', color: '#737373' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pie Chart - Budget Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PieChart size={18} color="#b91c1c" />
                Budget Allocation
              </h4>
              <span style={{ fontSize: '0.65rem', color: '#737373' }}>By District</span>
            </div>
            <CustomPieChart 
              data={budgetData.slice(0, 6)}
              size={110}
            />
          </motion.div>

          {/* Line Chart - Monthly Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <LineChartIcon size={18} color="#b91c1c" />
                Monthly Progress
              </h4>
              <span style={{ fontSize: '0.65rem', color: '#737373' }}>
                {monthlyProgress[monthlyProgress.length - 1].value}% Complete
              </span>
            </div>
            <CustomLineChart data={monthlyProgress} color="#b91c1c" height={90} />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginTop: '0.5rem',
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(0,0,0,0.05)'
            }}>
              <span style={{ fontSize: '0.5rem', color: '#737373' }}>Jan</span>
              <span style={{ fontSize: '0.5rem', color: '#737373' }}>Mar</span>
              <span style={{ fontSize: '0.5rem', color: '#737373' }}>May</span>
              <span style={{ fontSize: '0.5rem', color: '#737373' }}>Jul</span>
              <span style={{ fontSize: '0.5rem', color: '#737373' }}>Sep</span>
              <span style={{ fontSize: '0.5rem', color: '#737373' }}>Nov</span>
            </div>
          </motion.div>
        </div>

        {/* Hierarchy Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            alignItems: 'center'
          }}
        >
          <span style={{ fontWeight: '500', color: '#404040', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={16} /> Filter:
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
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              minWidth: '120px',
              outline: 'none'
            }}
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
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              minWidth: '120px',
              outline: 'none',
              opacity: !selectedState ? 0.5 : 1
            }}
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
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              minWidth: '130px',
              outline: 'none',
              opacity: !selectedDistrict ? 0.5 : 1
            }}
          >
            <option value="">All Constituencies</option>
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
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              minWidth: '120px',
              outline: 'none',
              opacity: !selectedAssembly ? 0.5 : 1
            }}
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
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              minWidth: '130px',
              outline: 'none',
              opacity: !selectedBlock ? 0.5 : 1
            }}
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
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              minWidth: '120px',
              outline: 'none',
              opacity: !selectedPanchayat ? 0.5 : 1
            }}
          >
            <option value="">All Booths</option>
            {booths.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={selectedVillage} 
            onChange={(e) => setSelectedVillage(e.target.value)} 
            disabled={!selectedBooth}
            style={{ 
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: '8px',
              padding: '0.35rem 0.8rem',
              fontSize: '0.8rem',
              minWidth: '120px',
              outline: 'none',
              opacity: !selectedBooth ? 0.5 : 1
            }}
          >
            <option value="">All Villages</option>
            {villages.map(v => <option key={v} value={v}>{v}</option>)}
          </select>

          {hasActiveFilters && (
            <button onClick={clearFilters} style={{
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: 'none',
              borderRadius: '8px',
              padding: '0.25rem 0.8rem',
              fontSize: '0.7rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <XCircle size={14} /> Clear
            </button>
          )}
        </motion.div>

        {/* KPI Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
            gap: '1rem',
            marginBottom: '1.5rem'
          }}
        >
          {kpiCards.map((kpi, i) => {
            const IconComponent = kpi.icon;
            return (
              <motion.div
                key={kpi.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                style={{
                  background: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => {
                  const pageMap = {
                    'Total Projects': '/development',
                    'In Progress': '/development',
                    'Delayed Projects': '/development',
                    'Total Voters': '/voters',
                    'Active Schemes': '/schemes',
                    'Complaints': '/complaints'
                  };
                  if (pageMap[kpi.label]) navigate(pageMap[kpi.label]);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '12px', 
                    background: kpi.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={20} color={kpi.color} />
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.7rem',
                    fontWeight: '600',
                    color: kpi.trend === 'up' ? '#22c55e' : '#ef4444',
                    background: kpi.trend === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '9999px'
                  }}>
                    {kpi.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {kpi.change}
                  </div>
                </div>
                <p style={{ 
                  fontSize: '1.75rem', 
                  fontWeight: '600', 
                  color: '#1a1a1a', 
                  marginTop: '0.5rem',
                  lineHeight: '1.2',
                  letterSpacing: '-0.5px'
                }}>
                  {kpi.value}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#737373', fontWeight: '400' }}>{kpi.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Second Row - Completion Rate and Quick Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Completion Rate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '2rem'
            }}
          >
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' }}>
                Project Completion Rate
              </h4>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1a1a1a', letterSpacing: '-1px' }}>
                {completionRate}%
              </div>
              <div style={{ fontSize: '0.8rem', color: '#737373' }}>
                {filteredProjects.filter(p => p.status === 'Completed').length} of {filteredProjects.length} projects completed
              </div>
              <div style={{ marginTop: '0.5rem', height: '6px', background: 'rgba(0,0,0,0.05)', borderRadius: '9999px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionRate}%` }}
                  transition={{ duration: 1 }}
                  style={{
                    height: '100%',
                    background: completionRate > 70 ? '#22c55e' : completionRate > 40 ? '#f59e0b' : '#ef4444',
                    borderRadius: '9999px'
                  }}
                />
              </div>
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '0.75rem',
              flexShrink: 0
            }}>
              {[
                { label: 'Completed', value: filteredProjects.filter(p => p.status === 'Completed').length, color: '#22c55e' },
                { label: 'In Progress', value: filteredProjects.filter(p => p.status === 'In Progress').length, color: '#f59e0b' },
                { label: 'Active', value: filteredProjects.filter(p => p.status === 'Active').length, color: '#3b82f6' },
                { label: 'Delayed', value: filteredProjects.filter(p => p.status === 'Delayed').length, color: '#ef4444' },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: '700', color: item.color }}>{item.value}</div>
                  <div style={{ fontSize: '0.6rem', color: '#737373' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
            }}
          >
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '1rem' }}>
              Quick Overview
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { label: 'Total Schemes', value: SCHEMES.length, icon: Landmark, color: '#1e40af' },
                { label: 'Total Meetings', value: MEETINGS.length, icon: Calendar, color: '#8b5cf6' },
                { label: 'Total Funding', value: `₹${(FUNDING.reduce((s, f) => s + f.totalAmount, 0) / 10000000).toFixed(1)}Cr`, icon: Wallet, color: '#16a34a' },
                { label: 'Volunteers', value: VOLUNTEERS.length, icon: UserCheck, color: '#7c3aed' },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `${item.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <IconComponent size={16} color={item.color} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1a1a1a' }}>{item.value}</div>
                        <div style={{ fontSize: '0.6rem', color: '#737373' }}>{item.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '1.25rem',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
            marginBottom: '1.5rem'
          }}
        >
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.75rem' }}>
            Quick Actions
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '0.75rem'
          }}>
            {[
              { icon: Building2, label: 'New Project', path: '/development', color: '#b91c1c' },
              { icon: AlertTriangle, label: 'New Complaint', path: '/complaints', color: '#ef4444' },
              { icon: Calendar, label: 'Schedule Meeting', path: '/meetings', color: '#8b5cf6' },
              { icon: Wallet, label: 'Create Funding', path: '/funding', color: '#16a34a' },
              { icon: UserPlus, label: 'Register Voter', path: '/registration', color: '#2563eb' },
              { icon: UserCheck, label: 'Add Volunteer', path: '/volunteers', color: '#7c3aed' },
            ].map((action, i) => {
              const IconComponent = action.icon;
              return (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(action.path)}
                  style={{
                    background: 'rgba(255,255,255,0.5)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '12px',
                    padding: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = action.color;
                    e.currentTarget.style.boxShadow = `0 4px 20px ${action.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={16} color={action.color} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '500', color: '#404040' }}>{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          padding: '0.75rem 0',
          color: '#737373',
          fontSize: '0.7rem',
          borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
          Development Project Monitoring System · Chhattisgarh · All Rights Reserved
        </div>
      </div>
    </LayoutWrapper>
  );
};

export default Dashboard;