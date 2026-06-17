import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  XCircle,
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
  MapPin,
  Users,
  IndianRupee,
  CheckCircle,
  Clock
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { SCHEMES } from '../api/data';
import { canWrite } from '../api/data';
import { useAuth } from '../context/AuthContext';

// Report Modal Component
const SchemeReportModal = ({ isOpen, onClose, schemes }) => {
  if (!isOpen) return null;

  const total = schemes.length;
  const active = schemes.filter(s => s.status === 'Active').length;
  const completed = schemes.filter(s => s.status === 'Completed').length;
  const upcoming = schemes.filter(s => s.status === 'Upcoming').length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  const totalBudget = schemes.reduce((sum, s) => sum + s.budget, 0);
  const totalAllocated = schemes.reduce((sum, s) => sum + s.allocated, 0);
  const totalBeneficiaries = schemes.reduce((sum, s) => sum + s.beneficiaries, 0);
  const avgProgress = total > 0 ? Math.round(schemes.reduce((sum, s) => sum + s.progress, 0) / total) : 0;
  
  const categoryData = {};
  schemes.forEach(s => {
    if (!categoryData[s.category]) categoryData[s.category] = 0;
    categoryData[s.category]++;
  });
  const topCategories = Object.entries(categoryData).sort((a, b) => b[1] - a[1]).slice(0, 5);

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
              Schemes Report
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Comprehensive overview of government schemes</p>
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
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1e40af' }}>{total}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Total Schemes</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>{active}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Active</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>{completed}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Completed</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>{upcoming}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Upcoming</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>{completionRate}%</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Completion Rate</div>
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
              Category Distribution
            </h4>
            {topCategories.map(([category, count], i) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={category} style={{ marginBottom: '0.3rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.15rem' }}>
                    <span>{category}</span>
                    <span style={{ fontWeight: '600' }}>{count} ({percentage}%)</span>
                  </div>
                  <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: '#b91c1c', borderRadius: '9999px' }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <IndianRupee size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Budget Overview
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#16a34a' }}>₹{(totalBudget/10000000).toFixed(1)}Cr</div>
                <div style={{ fontSize: '0.6rem', color: '#737373' }}>Total Budget</div>
              </div>
              <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2563eb' }}>₹{(totalAllocated/10000000).toFixed(1)}Cr</div>
                <div style={{ fontSize: '0.6rem', color: '#737373' }}>Allocated</div>
              </div>
              <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#8b5cf6' }}>
                  {totalBudget > 0 ? Math.round((totalAllocated / totalBudget) * 100) : 0}%
                </div>
                <div style={{ fontSize: '0.6rem', color: '#737373' }}>Utilization</div>
              </div>
              <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#9333ea' }}>{totalBeneficiaries.toLocaleString()}</div>
                <div style={{ fontSize: '0.6rem', color: '#737373' }}>Beneficiaries</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Create Scheme Modal
const CreateSchemeModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    department: '',
    description: '',
    budget: '',
    beneficiaries: '',
    launchDate: '',
    district: 'All Districts'
  });

  const [errors, setErrors] = useState({});
  const categories = ['Agriculture', 'Water', 'Health', 'Environment', 'Housing', 'Urban Development', 'Rural Development', 'Education', 'Industry', 'Energy', 'Sanitation', 'Digital', 'Employment', 'Nutrition', 'Infrastructure'];
  const departments = ['Agriculture', 'Water Resources', 'Health', 'Forest', 'Housing', 'Urban Administration', 'Rural Development', 'Education', 'Industries', 'Energy', 'PHE', 'Tribal Development', 'Skill Development', 'Women & Child', 'PWD'];
  const districts = ['All Districts', 'Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'];

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Scheme name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (!formData.launchDate) newErrors.launchDate = 'Launch date is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newScheme = {
      id: `sch${SCHEMES.length + 1}`,
      name: formData.name,
      category: formData.category,
      department: formData.department,
      description: formData.description || `${formData.category} scheme for the welfare of citizens.`,
      budget: parseFloat(formData.budget) * 10000000,
      allocated: parseFloat(formData.budget) * 7000000,
      beneficiaries: parseInt(formData.beneficiaries) || 10000,
      launchDate: formData.launchDate,
      district: formData.district,
      status: 'Upcoming',
      progress: 0,
      party: 'BJP',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop'
    };

    SCHEMES.push(newScheme);
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
              Create New Scheme
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Add a new government scheme</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Scheme Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter scheme name"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.name ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.name && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.name}</span>}
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
              <option value="">Select Category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.category}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Department <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.department ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Department</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            {errors.department && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.department}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Budget (in Crores) <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="number"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
              placeholder="Enter budget in crores"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.budget ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.budget && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.budget}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Beneficiaries
            </label>
            <input
              type="number"
              value={formData.beneficiaries}
              onChange={(e) => setFormData({...formData, beneficiaries: e.target.value})}
              placeholder="Number of beneficiaries"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Launch Date <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.launchDate}
              onChange={(e) => setFormData({...formData, launchDate: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.launchDate ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.launchDate && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.launchDate}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>District</label>
            <select
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description of the scheme..."
              rows="2"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Create Scheme
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

// Update Progress Modal
const UpdateProgressModal = ({ isOpen, onClose, scheme, onUpdate }) => {
  const [progress, setProgress] = useState(scheme?.progress || 0);
  const [status, setStatus] = useState(scheme?.status || 'Upcoming');
  const [notes, setNotes] = useState('');

  if (!isOpen || !scheme) return null;

  const statuses = ['Upcoming', 'Active', 'Completed'];

  const handleUpdate = () => {
    if (onUpdate) {
      onUpdate({
        ...scheme,
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
              Update Scheme Progress
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>{scheme?.name}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
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
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Update Notes</label>
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

// View Scheme Modal
const ViewSchemeModal = ({ isOpen, onClose, scheme, onUpdateClick }) => {
  if (!isOpen || !scheme) return null;

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'status-active',
      'Completed': 'status-completed',
      'Upcoming': 'status-upcoming'
    };
    return colors[status] || 'status-pending';
  };

  const canUpdate = scheme.status === 'Active' || scheme.status === 'Upcoming';

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
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={22} color="#b91c1c" />
              Scheme Details
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              {scheme.name}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Category</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{scheme.category}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Status</div>
              <span className={`status-badge ${getStatusColor(scheme.status)}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                {scheme.status}
              </span>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Department</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{scheme.department}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>District</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{scheme.district}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Budget</div>
              <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#16a34a' }}>₹{(scheme.budget/10000000).toFixed(1)}Cr</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Allocated</div>
              <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#2563eb' }}>₹{(scheme.allocated/10000000).toFixed(1)}Cr</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Beneficiaries</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{scheme.beneficiaries.toLocaleString()}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Launch Date</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{scheme.launchDate}</div>
            </div>
          </div>

          {scheme.description && (
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Description</div>
              <div style={{ fontSize: '0.85rem', color: '#404040', marginTop: '0.15rem' }}>{scheme.description}</div>
            </div>
          )}

          <div style={{ marginTop: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#737373' }}>
              <span>Progress</span>
              <span style={{ fontWeight: '600' }}>{scheme.progress}%</span>
            </div>
            <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ 
                width: `${scheme.progress}%`, 
                height: '100%', 
                background: scheme.progress > 70 ? '#22c55e' : scheme.progress > 40 ? '#eab308' : '#ef4444',
                borderRadius: '9999px' 
              }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          {canUpdate && (
            <button 
              className="btn-primary" 
              onClick={() => {
                onClose();
                if (onUpdateClick) onUpdateClick(scheme);
              }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <Edit size={18} /> Update Progress
            </button>
          )}
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Close</button>
        </div>
      </motion.div>
    </div>
  );
};

const Schemes = () => {
  const { user } = useAuth();
  const canCreate = canWrite(user);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [schemes, setSchemes] = useState(SCHEMES);

  const categories = ['All', ...new Set(schemes.map(s => s.category))];
  const filtered = schemes.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory === 'All' || s.category === filterCategory)
  );

  const clearFilters = () => {
    setSearch('');
    setFilterCategory('All');
  };

  const hasActiveFilters = search || filterCategory !== 'All';

  const handleUpdateScheme = (updatedScheme) => {
    const index = schemes.findIndex(s => s.id === updatedScheme.id);
    if (index !== -1) {
      const newSchemes = [...schemes];
      newSchemes[index] = updatedScheme;
      setSchemes(newSchemes);
      // Update the original array
      const origIndex = SCHEMES.findIndex(s => s.id === updatedScheme.id);
      if (origIndex !== -1) {
        SCHEMES[origIndex] = updatedScheme;
      }
    }
    setShowUpdateModal(false);
    setSelectedScheme(null);
  };

  const handleUpdateClick = (scheme) => {
    setSelectedScheme(scheme);
    setShowUpdateModal(true);
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>Government Schemes</h2>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>BJP government schemes and initiatives · {schemes.length} total</p>
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
                <Plus size={15} /> New Scheme
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
                placeholder="Search schemes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, padding: '0.3rem 0', border: 'none', outline: 'none', fontSize: '0.85rem', background: 'transparent' }}
              />
              {search && <XCircle size={14} color="#737373" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>
            
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ minWidth: '120px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-outline btn-sm" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Schemes Grid */}
        <div style={{ 
          flex: 1,
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '0.75rem',
          paddingBottom: '0.5rem'
        }}>
          {filtered.map((scheme, i) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              style={{ 
                background: 'white', 
                borderRadius: '0.75rem', 
                border: '1px solid #f0f0f0', 
                padding: '1rem',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h4 style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1a1a1a' }}>{scheme.name}</h4>
                <span className={`status-badge ${scheme.status === 'Active' ? 'status-active' : scheme.status === 'Completed' ? 'status-completed' : 'status-upcoming'}`} style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                  {scheme.status}
                </span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#737373', marginTop: '0.1rem' }}>{scheme.category} · {scheme.department}</p>
              <p style={{ fontSize: '0.75rem', color: '#404040', marginTop: '0.3rem', lineHeight: '1.4' }}>{scheme.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.3rem', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                <span><IndianRupee size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />₹{(scheme.budget/10000000).toFixed(1)}Cr</span>
                <span><Users size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />{scheme.beneficiaries.toLocaleString()}</span>
                <span><Calendar size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />{scheme.launchDate}</span>
                <span><MapPin size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />{scheme.district}</span>
              </div>
              <div style={{ marginTop: '0.3rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', color: '#737373' }}>
                  <span>Progress</span>
                  <span style={{ fontWeight: '600' }}>{scheme.progress}%</span>
                </div>
                <div style={{ height: '4px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${scheme.progress}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ 
                      height: '100%', 
                      background: scheme.progress > 70 ? '#22c55e' : scheme.progress > 40 ? '#eab308' : '#ef4444',
                      borderRadius: '9999px' 
                    }} 
                  />
                </div>
              </div>
              <button 
                className="btn-outline" 
                onClick={() => { setSelectedScheme(scheme); setShowViewModal(true); }}
                style={{ marginTop: '0.5rem', width: '100%', padding: '0.3rem', fontSize: '0.7rem' }}
              >
                View Details →
              </button>
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
            Showing {filtered.length} of {schemes.length} schemes
          </p>
        </div>

        {/* Modals */}
        <SchemeReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          schemes={filtered}
        />

        <CreateSchemeModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={() => setSchemes([...SCHEMES])}
        />

        <ViewSchemeModal
          isOpen={showViewModal}
          onClose={() => { setShowViewModal(false); setSelectedScheme(null); }}
          scheme={selectedScheme}
          onUpdateClick={handleUpdateClick}
        />

        <UpdateProgressModal
          isOpen={showUpdateModal}
          onClose={() => { setShowUpdateModal(false); setSelectedScheme(null); }}
          scheme={selectedScheme}
          onUpdate={handleUpdateScheme}
        />
      </motion.div>
    </LayoutWrapper>
  );
};

export default Schemes;