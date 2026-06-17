import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  XCircle, 
  UserCheck, 
  Clock, 
  MapPin,
  FileText,
  Download,
  Printer,
  PieChart,
  TrendingUp,
  Award,
  Eye,
  Edit,
  Save,
  X,
  Calendar,
  CheckCircle,
  AlertCircle,
  UserPlus,
  ClipboardList,
  Plus
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { VOLUNTEERS } from '../api/data';
import { canAccessPage, canWrite } from '../api/data';
import { useAuth } from '../context/AuthContext';

// Report Modal Component
const VolunteerReportModal = ({ isOpen, onClose, volunteers }) => {
  if (!isOpen) return null;

  const total = volunteers.length;
  const active = volunteers.filter(v => v.status === 'Active').length;
  const pending = volunteers.filter(v => v.status === 'Pending').length;
  const inactive = volunteers.filter(v => v.status === 'Inactive').length;
  
  const activeRate = total > 0 ? Math.round((active / total) * 100) : 0;
  
  // Skills distribution
  const skillData = {};
  volunteers.forEach(v => {
    if (!skillData[v.skills]) skillData[v.skills] = 0;
    skillData[v.skills]++;
  });
  const topSkills = Object.entries(skillData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  // Area distribution
  const areaData = {};
  volunteers.forEach(v => {
    if (!areaData[v.area]) areaData[v.area] = 0;
    areaData[v.area]++;
  });
  const topAreas = Object.entries(areaData).sort((a, b) => b[1] - a[1]).slice(0, 5);

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
              Volunteers Report
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Comprehensive overview of volunteers</p>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#7c3aed' }}>{total}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Total Volunteers</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>{active}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Active</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>{pending}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Pending</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444' }}>{inactive}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Inactive</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#8b5cf6' }}>{activeRate}%</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Active Rate</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <Award size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Top Skills
            </h4>
            {topSkills.map(([skill, count], i) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={skill} style={{ marginBottom: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                    <span>{skill}</span>
                    <span style={{ fontWeight: '600' }}>{count} ({percentage}%)</span>
                  </div>
                  <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: '#7c3aed', borderRadius: '9999px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <MapPin size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Top Areas
            </h4>
            {topAreas.map(([area, count], i) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={area} style={{ marginBottom: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                    <span>{area}</span>
                    <span style={{ fontWeight: '600' }}>{count} ({percentage}%)</span>
                  </div>
                  <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: '#7c3aed', borderRadius: '9999px' }} />
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

// Assign Task Modal
const AssignTaskModal = ({ isOpen, onClose, volunteer, onAssign }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [errors, setErrors] = useState({});

  if (!isOpen || !volunteer) return null;

  const handleSubmit = () => {
    const newErrors = {};
    if (!taskTitle) newErrors.taskTitle = 'Task title is required';
    if (!taskDeadline) newErrors.taskDeadline = 'Deadline is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const task = {
      id: `TASK${String(Date.now()).slice(-6)}`,
      title: taskTitle,
      description: taskDescription || 'No description provided',
      deadline: taskDeadline,
      priority: taskPriority,
      assignedTo: volunteer.id,
      assignedToName: volunteer.name,
      assignedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    if (onAssign) {
      onAssign(volunteer.id, task);
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
              <ClipboardList size={22} color="#b91c1c" />
              Assign Task to {volunteer.name}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              {volunteer.skills} · {volunteer.area}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Task Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter task title"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.taskTitle ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.taskTitle && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.taskTitle}</span>}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Task Description</label>
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Describe the task..."
              rows="2"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Deadline <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.taskDeadline ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.taskDeadline && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.taskDeadline}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Priority</label>
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <ClipboardList size={18} /> Assign Task
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

// Profile Modal
const ProfileModal = ({ isOpen, onClose, volunteer }) => {
  if (!isOpen || !volunteer) return null;

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
              <UserCheck size={22} color="#b91c1c" />
              Volunteer Profile
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              {volunteer.name} · {volunteer.id}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Name</div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1a1a1a' }}>{volunteer.name}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Status</div>
              <span className={`status-badge ${volunteer.status === 'Active' ? 'status-active' : volunteer.status === 'Pending' ? 'status-pending' : 'status-inactive'}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                {volunteer.status}
              </span>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Mobile</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{volunteer.mobile}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Email</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{volunteer.email}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Area</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{volunteer.area}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Constituency</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{volunteer.constituency}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Skills</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{volunteer.skills}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Joined</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{volunteer.joinDate}</div>
            </div>
          </div>

          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
            <div style={{ fontSize: '0.65rem', color: '#737373' }}>Tasks Assigned</div>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#b91c1c', marginTop: '0.15rem' }}>
              {volunteer.tasksAssigned} tasks
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Close</button>
        </div>
      </motion.div>
    </div>
  );
};

const Volunteers = () => {
  const { user, isCM, isMinister } = useAuth();
  const canApprove = isCM || isMinister;
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [volunteers, setVolunteers] = useState(VOLUNTEERS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterArea, setFilterArea] = useState('');

  // Check if user can access volunteers
  if (!canAccessPage(user, 'volunteers')) {
    return (
      <LayoutWrapper>
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
          <Users size={48} color="#737373" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#b91c1c', marginTop: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#737373' }}>You don't have permission to view volunteers.</p>
        </div>
      </LayoutWrapper>
    );
  }

  useEffect(() => {
    const saved = localStorage.getItem('cg_volunteers');
    if (saved) setVolunteers(JSON.parse(saved));
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem('cg_volunteers', JSON.stringify(data));
  };

  const handleApprove = (id) => {
    const updated = volunteers.map(v => v.id === id ? { ...v, status: 'Active' } : v);
    setVolunteers(updated);
    saveToStorage(updated);
    setShowModal(false);
  };

  const handleReject = (id) => {
    const updated = volunteers.map(v => v.id === id ? { ...v, status: 'Inactive' } : v);
    setVolunteers(updated);
    saveToStorage(updated);
    setShowModal(false);
  };

  const handleAssignTask = (volunteerId, task) => {
    const updated = volunteers.map(v => {
      if (v.id === volunteerId) {
        // Add task to volunteer's tasks (if tasks array exists) or just increment count
        const tasks = v.tasks || [];
        tasks.push(task);
        return { 
          ...v, 
          tasks: tasks,
          tasksAssigned: (v.tasksAssigned || 0) + 1 
        };
      }
      return v;
    });
    setVolunteers(updated);
    saveToStorage(updated);
    setShowAssignModal(false);
    setSelectedVolunteer(null);
  };

  const areas = [...new Set(VOLUNTEERS.map(v => v.area))];
  
  const filtered = volunteers.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'All' || v.status === filter) &&
    (filterArea === '' || v.area === filterArea)
  );

  const pendingCount = volunteers.filter(v => v.status === 'Pending').length;
  const [showModal, setShowModal] = useState(false);

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{ 
          marginBottom: '0.75rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '0.5rem',
          flexShrink: 0
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>Volunteers</h2>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Manage volunteer registrations · {volunteers.length} total</p>
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <button 
              className="btn-outline" 
              onClick={() => setShowReportModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
            >
              <FileText size={15} /> Report
            </button>
            {canApprove && (
              <div style={{ background: '#fef3c7', padding: '0.3rem 0.8rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: '600', color: '#92400e', display: 'flex', alignItems: 'center' }}>
                ⏳ {pendingCount} Pending
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ 
          background: 'white',
          padding: '0.6rem 0.8rem',
          borderRadius: '0.75rem',
          border: '1px solid #f0f0f0',
          marginBottom: '0.5rem',
          flexShrink: 0
        }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            flexWrap: 'wrap',
            marginBottom: '0.3rem'
          }}>
            <div style={{ 
              flex: 1, 
              minWidth: '180px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              background: '#fafafa', 
              border: '1px solid #e5e5e5', 
              borderRadius: '0.5rem', 
              padding: '0 0.6rem'
            }}>
              <Search size={16} color="#737373" />
              <input
                type="text"
                placeholder="Search volunteers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, padding: '0.3rem 0', border: 'none', outline: 'none', fontSize: '0.85rem', background: 'transparent' }}
              />
              {search && <XCircle size={14} color="#737373" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>
            
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              style={{ minWidth: '100px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select 
              value={filterArea} 
              onChange={(e) => setFilterArea(e.target.value)}
              style={{ minWidth: '100px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Areas</option>
              {areas.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
        </div>

        {/* Volunteers Grid */}
        <div style={{ 
          flex: 1,
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '0.75rem',
          paddingBottom: '0.5rem'
        }}>
          {filtered.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -4 }}
              style={{ 
                background: 'white', 
                padding: '1rem', 
                borderRadius: '0.75rem', 
                border: v.status === 'Pending' ? '2px solid #fecaca' : '1px solid #f0f0f0',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.55rem', fontWeight: '600', background: v.status === 'Active' ? '#dcfce7' : v.status === 'Pending' ? '#fef3c7' : '#fee2e2', color: v.status === 'Active' ? '#166534' : v.status === 'Pending' ? '#92400e' : '#991b1b' }}>
                {v.status === 'Active' ? '✅' : v.status === 'Pending' ? '⏳' : '❌'} {v.status}
              </div>
              <div>
                <h4 style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1a1a1a' }}>{v.name}</h4>
                <p style={{ fontSize: '0.7rem', color: '#a3a3a3' }}>ID: {v.id}</p>
              </div>
              <div style={{ marginTop: '0.3rem' }}>
                <p style={{ fontSize: '0.8rem', color: '#404040' }}>📱 {v.mobile}</p>
                <p style={{ fontSize: '0.8rem', color: '#404040' }}>📍 {v.area} · {v.constituency}</p>
                <p style={{ fontSize: '0.8rem', color: '#404040' }}>📅 Joined: {v.joinDate}</p>
                <span style={{ fontSize: '0.65rem', background: '#f0f0f0', padding: '0.15rem 0.4rem', borderRadius: '9999px', color: '#404040', display: 'inline-block', marginTop: '0.2rem' }}>
                  🛠️ {v.skills}
                </span>
                <span style={{ fontSize: '0.65rem', background: '#dbeafe', padding: '0.15rem 0.4rem', borderRadius: '9999px', color: '#1e40af', display: 'inline-block', marginTop: '0.2rem', marginLeft: '0.3rem' }}>
                  📋 {v.tasksAssigned} Tasks
                </span>
              </div>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.3rem' }}>
                {canApprove && v.status === 'Pending' ? (
                  <button 
                    className="btn-primary btn-sm" 
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem' }}
                    onClick={() => { setSelectedVolunteer(v); setShowModal(true); }}
                  >
                    📋 Review
                  </button>
                ) : (
                  <>
                    <button 
                      className="btn-primary btn-sm" 
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
                      onClick={() => { setSelectedVolunteer(v); setShowAssignModal(true); }}
                    >
                      <ClipboardList size={12} /> Assign Task
                    </button>
                    <button 
                      className="btn-outline btn-sm" 
                      style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
                      onClick={() => { setSelectedVolunteer(v); setShowProfileModal(true); }}
                    >
                      <UserCheck size={12} /> Profile
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: '0.3rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.3rem',
          flexShrink: 0
        }}>
          <p style={{ fontSize: '0.7rem', color: '#737373' }}>
            Showing {filtered.length} of {volunteers.length} volunteers
          </p>
        </div>

        {/* Modals */}
        <VolunteerReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          volunteers={filtered}
        />

        {/* Review Modal */}
        {showModal && selectedVolunteer && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content" style={{ maxWidth: '500px', padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>📋 Volunteer Review</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <strong>Name:</strong> <span>{selectedVolunteer.name}</span>
                <strong>Mobile:</strong> <span>{selectedVolunteer.mobile}</span>
                <strong>Email:</strong> <span>{selectedVolunteer.email}</span>
                <strong>Area:</strong> <span>{selectedVolunteer.area}</span>
                <strong>Skills:</strong> <span>{selectedVolunteer.skills}</span>
                <strong>Joined:</strong> <span>{selectedVolunteer.joinDate}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-success" style={{ flex: 1 }} onClick={() => handleApprove(selectedVolunteer.id)}>✅ Approve</button>
                <button className="btn-danger" style={{ flex: 1 }} onClick={() => handleReject(selectedVolunteer.id)}>❌ Reject</button>
              </div>
              <button className="btn-outline" style={{ width: '100%', marginTop: '0.75rem' }} onClick={() => setShowModal(false)}>Close</button>
            </motion.div>
          </div>
        )}

        {/* Assign Task Modal */}
        <AssignTaskModal
          isOpen={showAssignModal}
          onClose={() => { setShowAssignModal(false); setSelectedVolunteer(null); }}
          volunteer={selectedVolunteer}
          onAssign={handleAssignTask}
        />

        {/* Profile Modal */}
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => { setShowProfileModal(false); setSelectedVolunteer(null); }}
          volunteer={selectedVolunteer}
        />
      </motion.div>
    </LayoutWrapper>
  );
};

export default Volunteers;