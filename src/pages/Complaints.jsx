import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus, 
  XCircle, 
  Users, 
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
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  MessageSquare,
  Hash,
  Tag,
  Home,
  Phone,
  Mail
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { COMPLAINTS } from '../api/data';
import { canWrite, canAccessPage } from '../api/data';
import { useAuth } from '../context/AuthContext';
import { getDistricts, getAssemblyConstituencies } from '../api/data';

// Report Modal Component
const ComplaintReportModal = ({ isOpen, onClose, complaints }) => {
  if (!isOpen) return null;

  const total = complaints.length;
  const open = complaints.filter(c => c.status === 'Open').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const closed = complaints.filter(c => c.status === 'Closed').length;
  
  const resolutionRate = total > 0 ? Math.round(((resolved + closed) / total) * 100) : 0;
  const avgProgress = total > 0 ? Math.round(complaints.reduce((sum, c) => sum + c.progress, 0) / total) : 0;
  
  const critical = complaints.filter(c => c.priority === 'Critical').length;
  const high = complaints.filter(c => c.priority === 'High').length;
  const medium = complaints.filter(c => c.priority === 'Medium').length;
  const low = complaints.filter(c => c.priority === 'Low').length;
  
  const categoryData = {};
  complaints.forEach(c => {
    if (!categoryData[c.category]) categoryData[c.category] = 0;
    categoryData[c.category]++;
  });
  const topCategories = Object.entries(categoryData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const districtData = {};
  complaints.forEach(c => {
    if (!districtData[c.district]) districtData[c.district] = 0;
    districtData[c.district]++;
  });
  const topDistricts = Object.entries(districtData).sort((a, b) => b[1] - a[1]).slice(0, 5);

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
              Complaint Report
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Comprehensive overview of citizen complaints</p>
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
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#b91c1c' }}>{total}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Total Complaints</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#ef4444' }}>{open}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Open</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>{inProgress}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>In Progress</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>{resolved}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Resolved</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>{resolutionRate}%</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Resolution Rate</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#8b5cf6' }}>{avgProgress}%</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Avg Progress</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <PieChart size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Priority Distribution
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              {[
                { label: 'Critical', value: critical, color: '#dc2626' },
                { label: 'High', value: high, color: '#f59e0b' },
                { label: 'Medium', value: medium, color: '#3b82f6' },
                { label: 'Low', value: low, color: '#22c55e' }
              ].filter(d => d.value > 0).map((item, i) => {
                const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
                return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }} />
                        {item.label}
                      </span>
                      <span style={{ fontWeight: '600' }}>{item.value} ({percentage}%)</span>
                    </div>
                    <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ width: `${percentage}%`, height: '100%', background: item.color, borderRadius: '9999px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <Award size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Top Categories
            </h4>
            {topCategories.map(([category, count], i) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={category} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.2rem 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: '600', color: '#b91c1c', width: '20px' }}>#{i + 1}</span>
                  <span style={{ flex: 1, fontSize: '0.75rem' }}>{category}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1a1a1a' }}>{count}</span>
                  <span style={{ fontSize: '0.6rem', color: '#737373' }}>({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1a1a1a' }}>
            <MapPin size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
            Top Districts by Complaints
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {topDistricts.map(([district, count], i) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={district} style={{ background: '#fafafa', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: '600', color: '#b91c1c', width: '20px' }}>#{i + 1}</span>
                  <span style={{ flex: 1, fontSize: '0.75rem' }}>{district}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#b91c1c' }}>{count}</span>
                  <span style={{ fontSize: '0.6rem', color: '#737373' }}>({percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Update Status Modal
const UpdateStatusModal = ({ isOpen, onClose, complaint, onUpdate }) => {
  const [status, setStatus] = useState(complaint?.status || 'Open');
  const [progress, setProgress] = useState(complaint?.progress || 0);
  const [notes, setNotes] = useState('');

  if (!isOpen || !complaint) return null;

  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate({
        ...complaint,
        status: status,
        progress: parseInt(progress),
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
              Update Complaint Status
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>{complaint?.title}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
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

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Update Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about the update..."
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

// Create Complaint Modal
const CreateComplaintModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Infrastructure',
    priority: 'Medium',
    location: '',
    district: '',
    constituency: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const districts = getDistricts('Chhattisgarh');
  const constituencies = formData.district ? getAssemblyConstituencies('Chhattisgarh', formData.district) : [];

  const categories = ['Infrastructure', 'Utilities', 'Sanitation', 'Environment', 'Public Works', 'Education', 'Health', 'Energy', 'Transport'];
  const priorities = ['Critical', 'High', 'Medium', 'Low'];

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.constituency) newErrors.constituency = 'Constituency is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newComplaint = {
      id: `CMP${String(200 + COMPLAINTS.length + 1).padStart(4, '0')}`,
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      location: formData.location,
      district: formData.district,
      constituency: formData.constituency,
      description: formData.description || 'No description provided',
      status: 'Open',
      progress: 0,
      date: new Date().toISOString().split('T')[0],
      submittedBy: 'Citizen',
      assignedTo: 'Pending',
      voterId: `CG/RAI/${String(100000 + Math.floor(Math.random() * 10000)).padStart(6, '0')}`
    };

    COMPLAINTS.push(newComplaint);
    if (onCreate) onCreate();
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
              Submit New Complaint
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Report a citizen complaint</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Complaint Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Brief title of the complaint"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.title ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.title && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.title}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Category <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.category ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.category}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Priority <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              District <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value, constituency: ''})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.district ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.district && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.district}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Constituency <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.constituency}
              onChange={(e) => setFormData({...formData, constituency: e.target.value})}
              disabled={!formData.district}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.constituency ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Constituency</option>
              {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.constituency && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.constituency}</span>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Location <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Specific location or address"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.location ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.location && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.location}</span>}
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Detailed description of the complaint..."
              rows="3"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Submit Complaint
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

// View Complaint Details Modal
const ViewComplaintModal = ({ isOpen, onClose, complaint }) => {
  if (!isOpen || !complaint) return null;

  const getStatusColor = (status) => {
    const colors = {
      'Open': 'status-pending',
      'In Progress': 'status-scheduled',
      'Resolved': 'status-completed',
      'Closed': 'status-inactive'
    };
    return colors[status] || 'status-pending';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Critical': '#dc2626',
      'High': '#f59e0b',
      'Medium': '#3b82f6',
      'Low': '#22c55e'
    };
    return colors[priority] || '#737373';
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
        style={{ maxWidth: '550px', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertTriangle size={22} color="#b91c1c" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>
                Complaint Details
              </h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              <Hash size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />
              {complaint.id} · Submitted on {complaint.date}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          {/* Title & Status */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a' }}>{complaint.title}</h4>
              <span className={`status-badge ${getStatusColor(complaint.status)}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                {complaint.status}
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#404040', lineHeight: '1.6' }}>
              {complaint.description || complaint.details || 'No detailed description provided.'}
            </p>
          </div>

          {/* Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>Category</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1a1a' }}>{complaint.category}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>Priority</div>
              <div style={{ 
                fontSize: '0.8rem', 
                fontWeight: '600', 
                color: getPriorityColor(complaint.priority)
              }}>
                {complaint.priority}
              </div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>District</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1a1a' }}>{complaint.district}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>Constituency</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1a1a' }}>{complaint.constituency}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>Location</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1a1a' }}>{complaint.location}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>Submitted By</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1a1a' }}>{complaint.submittedBy || 'Citizen'}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>Assigned To</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1a1a' }}>{complaint.assignedTo || 'Pending'}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.5rem 0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#737373' }}>Voter ID</div>
              <div style={{ fontSize: '0.8rem', fontWeight: '500', color: '#1a1a1a' }}>{complaint.voterId || 'N/A'}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#737373', marginBottom: '0.15rem' }}>
              <span>Progress</span>
              <span style={{ fontWeight: '600' }}>{complaint.progress}%</span>
            </div>
            <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${complaint.progress}%`, 
                height: '100%', 
                background: complaint.progress > 70 ? '#22c55e' : complaint.progress > 40 ? '#f59e0b' : '#ef4444',
                borderRadius: '9999px' 
              }} />
            </div>
          </div>

          {/* Additional Info */}
          {complaint.notes && (
            <div style={{ marginTop: '0.75rem', background: '#fef3c7', padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: '1px solid #fde68a' }}>
              <div style={{ fontSize: '0.6rem', color: '#92400e' }}>Latest Update</div>
              <div style={{ fontSize: '0.8rem', color: '#78350f', marginTop: '0.1rem' }}>{complaint.notes}</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Close</button>
        </div>
      </motion.div>
    </div>
  );
};

const Complaints = () => {
  const { user } = useAuth();
  const isUser = user?.role === 'USER';
  const canUpdate = !isUser && canWrite(user);
  const canCreate = true;
  
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState(COMPLAINTS);

  const getFilteredComplaints = () => {
    let data = complaints;
    
    if (isUser) {
      data = complaints.filter(c => 
        c.submittedBy === 'Citizen' || 
        c.submittedBy === user?.name ||
        c.voterId === `CG/RAI/100000`
      );
    }
    
    return data.filter(c => 
      c.title.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === 'All' || c.status === filterStatus) &&
      (filterDistrict === '' || c.district === filterDistrict) &&
      (filterConstituency === '' || c.constituency === filterConstituency)
    );
  };

  const filtered = getFilteredComplaints();

  const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const districts = [...new Set(complaints.map(c => c.district))];
  const constituencies = filterDistrict ? [...new Set(complaints.filter(c => c.district === filterDistrict).map(c => c.constituency))] : [];

  const clearFilters = () => {
    setSearch('');
    setFilterStatus('All');
    setFilterDistrict('');
    setFilterConstituency('');
  };

  const hasActiveFilters = search || filterStatus !== 'All' || filterDistrict || filterConstituency;

  const handleUpdateComplaint = (updatedComplaint) => {
    const index = complaints.findIndex(c => c.id === updatedComplaint.id);
    if (index !== -1) {
      const newComplaints = [...complaints];
      newComplaints[index] = updatedComplaint;
      setComplaints(newComplaints);
      const origIndex = COMPLAINTS.findIndex(c => c.id === updatedComplaint.id);
      if (origIndex !== -1) {
        COMPLAINTS[origIndex] = updatedComplaint;
      }
    }
    setShowUpdateModal(false);
    setSelectedComplaint(null);
  };

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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>
              {isUser ? 'My Complaints' : 'Complaints'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              {isUser ? `Showing your complaints (${filtered.length})` : `Track citizen complaints · ${complaints.length} total`}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <button 
              className="btn-outline" 
              onClick={() => setShowReportModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
            >
              <FileText size={15} /> Report
            </button>
            {canCreate && (
              <button 
                className="btn-primary" 
                onClick={() => setShowCreateModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.8rem', fontSize: '0.75rem' }}
              >
                <Plus size={15} /> New Complaint
              </button>
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
                placeholder="Search complaints..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, padding: '0.3rem 0', border: 'none', outline: 'none', fontSize: '0.85rem', background: 'transparent' }}
              />
              {search && <XCircle size={14} color="#737373" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>
            
            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-outline btn-sm" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                Clear All
              </button>
            )}
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '0.3rem', 
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '0.2rem 0',
            borderTop: '1px solid #f5f5f5'
          }}>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select 
              value={filterDistrict} 
              onChange={(e) => { setFilterDistrict(e.target.value); setFilterConstituency(''); }}
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select 
              value={filterConstituency} 
              onChange={(e) => setFilterConstituency(e.target.value)} 
              disabled={!filterDistrict}
              style={{ minWidth: '100px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Constituencies</option>
              {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <div style={{ 
            marginBottom: '0.3rem', 
            padding: '0.2rem 0.6rem', 
            background: '#fef2f2', 
            borderRadius: '0.4rem',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            flexWrap: 'wrap',
            fontSize: '0.65rem',
            flexShrink: 0
          }}>
            <span style={{ fontWeight: '600', color: '#404040' }}>Active Filters:</span>
            {search && <span className="status-badge status-active" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>🔍 {search}</span>}
            {filterStatus !== 'All' && <span className="status-badge status-scheduled" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{filterStatus}</span>}
            {filterDistrict && <span className="status-badge status-completed" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{filterDistrict}</span>}
            {filterConstituency && <span className="status-badge status-active" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{filterConstituency}</span>}
          </div>
        )}

        {/* Complaints Table */}
        <div style={{ 
          flex: 1,
          overflow: 'auto',
          border: '1px solid #f0f0f0',
          borderRadius: '0.5rem',
          background: 'white',
          minHeight: '250px',
          maxHeight: 'calc(100vh - 400px)'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.75rem',
            minWidth: isUser ? '850px' : '950px'
          }}>
            <thead style={{ 
              position: 'sticky', 
              top: 0, 
              zIndex: 10,
              background: '#fafafa'
            }}>
              <tr>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '70px' }}>ID</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '120px' }}>Title</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '90px' }}>Category</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '90px' }}>District</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '100px' }}>Constituency</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '80px' }}>Status</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '60px' }}>Priority</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '80px' }}>Progress</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '80px' }}>Date</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '100px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((complaint, i) => (
                <motion.tr
                  key={complaint.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.005 }}
                  style={{ borderBottom: '1px solid #f5f5f5' }}
                >
                  <td style={{ padding: '0.3rem 0.4rem', fontWeight: '600', fontSize: '0.7rem' }}>{complaint.id}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.75rem' }}>{complaint.title}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.7rem' }}>{complaint.category}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.7rem' }}>{complaint.district}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.7rem' }}>{complaint.constituency}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>
                    <span className={`status-badge ${complaint.status === 'Open' ? 'status-pending' : complaint.status === 'In Progress' ? 'status-scheduled' : complaint.status === 'Resolved' ? 'status-completed' : 'status-inactive'}`} style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                      {complaint.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>
                    <span style={{ 
                      padding: '0.15rem 0.4rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.55rem', 
                      fontWeight: '600',
                      background: complaint.priority === 'Critical' ? '#fee2e2' : complaint.priority === 'High' ? '#fef3c7' : '#e5e5e5',
                      color: complaint.priority === 'Critical' ? '#991b1b' : complaint.priority === 'High' ? '#92400e' : '#737373'
                    }}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <div style={{ width: '40px', height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${complaint.progress}%`, height: '100%', background: '#b91c1c', borderRadius: '9999px' }} />
                      </div>
                      <span style={{ fontSize: '0.6rem', fontWeight: '600' }}>{complaint.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.65rem' }}>{complaint.date}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>
                    <div style={{ display: 'flex', gap: '0.2rem' }}>
                      <button 
                        onClick={() => { setSelectedComplaint(complaint); setShowViewModal(true); }}
                        className="btn-outline btn-sm" 
                        style={{ padding: '0.15rem 0.4rem', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                      >
                        <Eye size={12} /> View
                      </button>
                      {!isUser && (
                        <button 
                          onClick={() => { setSelectedComplaint(complaint); setShowUpdateModal(true); }}
                          className="btn-outline btn-sm" 
                          style={{ padding: '0.15rem 0.4rem', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
                          disabled={!canUpdate}
                        >
                          <Edit size={12} /> Update
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
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
            Showing {filtered.length} of {isUser ? 'your' : complaints.length} complaints
          </p>
        </div>

        {/* Modals */}
        <ComplaintReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          complaints={filtered}
        />

        <CreateComplaintModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={() => setComplaints([...COMPLAINTS])}
        />

        <UpdateStatusModal
          isOpen={showUpdateModal}
          onClose={() => { setShowUpdateModal(false); setSelectedComplaint(null); }}
          complaint={selectedComplaint}
          onUpdate={handleUpdateComplaint}
        />

        <ViewComplaintModal
          isOpen={showViewModal}
          onClose={() => { setShowViewModal(false); setSelectedComplaint(null); }}
          complaint={selectedComplaint}
        />
      </motion.div>
    </LayoutWrapper>
  );
};

export default Complaints;