import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  XCircle,
  MapPin,
  Users,
  ChevronDown,
  FileSpreadsheet,
  Printer,
  Eye,
  FileText,
  BarChart3,
  PieChart,
  TrendingUp,
  Award,
  Calendar,
  UserPlus,
  X
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { VOTERS } from '../api/data';
import { useAuth } from '../context/AuthContext';
import { 
  getStates,
  getDistricts,
  getAssemblyConstituencies,
  getBlocks,
  getPanchayats,
  getPollingBooths,
  getVillages,
  canAccessPage
} from '../api/data';

// Report Modal Component
const VoterReportModal = ({ isOpen, onClose, voters }) => {
  if (!isOpen) return null;

  const totalVoters = voters.length;
  const activeVoters = voters.filter(v => v.status === 'Active').length;
  const inactiveVoters = voters.filter(v => v.status === 'Inactive').length;
  
  const maleCount = voters.filter(v => v.gender === 'Male').length;
  const femaleCount = voters.filter(v => v.gender === 'Female').length;
  const otherCount = voters.filter(v => v.gender === 'Other').length;
  
  const casteData = {};
  voters.forEach(v => {
    if (!casteData[v.caste]) casteData[v.caste] = 0;
    casteData[v.caste]++;
  });
  const topCastes = Object.entries(casteData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const districtData = {};
  voters.forEach(v => {
    if (!districtData[v.district]) districtData[v.district] = 0;
    districtData[v.district]++;
  });
  const topDistricts = Object.entries(districtData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const ageGroups = {
    '18-25': 0,
    '26-35': 0,
    '36-50': 0,
    '51-65': 0,
    '65+': 0
  };
  voters.forEach(v => {
    if (v.age >= 18 && v.age <= 25) ageGroups['18-25']++;
    else if (v.age >= 26 && v.age <= 35) ageGroups['26-35']++;
    else if (v.age >= 36 && v.age <= 50) ageGroups['36-50']++;
    else if (v.age >= 51 && v.age <= 65) ageGroups['51-65']++;
    else if (v.age > 65) ageGroups['65+']++;
  });

  const maxAgeGroup = Math.max(...Object.values(ageGroups), 1);

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
              Voter Report
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Comprehensive overview of voter demographics</p>
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
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb' }}>{totalVoters}</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Total Voters</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>{activeVoters}</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Active Voters</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>{inactiveVoters}</div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Inactive Voters</div>
          </div>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {totalVoters > 0 ? Math.round((activeVoters / totalVoters) * 100) : 0}%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Active Rate</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <PieChart size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Gender Distribution
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {(() => {
                    const total = totalVoters || 1;
                    const data = [
                      { value: maleCount, color: '#3b82f6', label: 'Male' },
                      { value: femaleCount, color: '#ec4899', label: 'Female' },
                      { value: otherCount, color: '#8b5cf6', label: 'Other' }
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
                  { label: 'Male', value: maleCount, color: '#3b82f6' },
                  { label: 'Female', value: femaleCount, color: '#ec4899' },
                  { label: 'Other', value: otherCount, color: '#8b5cf6' }
                ].filter(d => d.value > 0).map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: item.color }} />
                    <span style={{ color: '#404040' }}>{item.label}:</span>
                    <span style={{ fontWeight: '600', color: '#1a1a1a' }}>{item.value}</span>
                    <span style={{ color: '#737373', fontSize: '0.65rem' }}>
                      ({totalVoters > 0 ? Math.round((item.value / totalVoters) * 100) : 0}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.75rem', color: '#1a1a1a' }}>
              <TrendingUp size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Age Distribution
            </h4>
            <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '0.5rem', paddingTop: '0.5rem' }}>
              {Object.entries(ageGroups).map(([group, count]) => (
                <div key={group} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '100%', 
                    height: `${(count / maxAgeGroup) * 70}px`, 
                    background: count > 0 ? '#b91c1c' : '#f0f0f0',
                    borderRadius: '4px 4px 0 0',
                    minHeight: '4px',
                    transition: 'height 0.8s ease'
                  }} />
                  <span style={{ fontSize: '0.5rem', color: '#737373', marginTop: '0.25rem' }}>{group}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#737373', marginTop: '0.25rem' }}>
              {Object.entries(ageGroups).map(([group, count]) => (
                <span key={group}>{count}</span>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1a1a1a' }}>
              <Award size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Top Castes
            </h4>
            {topCastes.map(([caste, count], i) => (
              <div key={caste} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0', borderBottom: '1px solid #f5f5f5' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#b91c1c', width: '20px' }}>#{i + 1}</span>
                <span style={{ flex: 1, fontSize: '0.8rem' }}>{caste}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a' }}>{count}</span>
                <span style={{ fontSize: '0.65rem', color: '#737373' }}>
                  ({totalVoters > 0 ? Math.round((count / totalVoters) * 100) : 0}%)
                </span>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1a1a1a' }}>
              <MapPin size={16} style={{ display: 'inline', marginRight: '0.3rem' }} />
              Top Districts
            </h4>
            {topDistricts.map(([district, count], i) => (
              <div key={district} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0', borderBottom: '1px solid #f5f5f5' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#b91c1c', width: '20px' }}>#{i + 1}</span>
                <span style={{ flex: 1, fontSize: '0.8rem' }}>{district}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a' }}>{count}</span>
                <span style={{ fontSize: '0.65rem', color: '#737373' }}>
                  ({totalVoters > 0 ? Math.round((count / totalVoters) * 100) : 0}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Add Voter Modal
const AddVoterModal = ({ isOpen, onClose, onVoterAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    voterId: '',
    state: '',
    district: '',
    constituency: '',
    block: '',
    panchayat: '',
    village: '',
    pollingBooth: '',
    houseNumber: '',
    age: '',
    gender: 'Male',
    caste: 'General',
    phoneNumber: '',
    email: '',
    relationName: '',
    relationType: 'Father'
  });

  const [errors, setErrors] = useState({});
  const states = getStates();
  const districts = getDistricts(formData.state);
  const constituencies = getAssemblyConstituencies(formData.state, formData.district);
  const blocks = getBlocks(formData.state, formData.district, formData.constituency);
  const panchayats = getPanchayats(formData.state, formData.district, formData.constituency, formData.block);
  const booths = getPollingBooths(formData.state, formData.district, formData.constituency, formData.block, formData.panchayat);
  const villages = getVillages(formData.state, formData.district, formData.constituency, formData.block, formData.panchayat, formData.pollingBooth);

  const castes = ['General', 'OBC', 'SC', 'ST'];
  const genders = ['Male', 'Female', 'Other'];
  const relationTypes = ['Father', 'Mother', 'Husband', 'Wife'];

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.voterId) newErrors.voterId = 'Voter ID is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.constituency) newErrors.constituency = 'Constituency is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newVoter = {
      id: `VOT${String(1000 + VOTERS.length + 1).padStart(4, '0')}`,
      name: formData.name,
      voterId: formData.voterId,
      state: formData.state,
      district: formData.district,
      constituency: formData.constituency,
      block: formData.block || 'Not Specified',
      panchayat: formData.panchayat || 'Not Specified',
      village: formData.village || 'Not Specified',
      pollingBooth: formData.pollingBooth || 'Not Specified',
      houseNumber: formData.houseNumber || 'N/A',
      age: parseInt(formData.age),
      gender: formData.gender,
      caste: formData.caste,
      phoneNumber: formData.phoneNumber,
      email: formData.email || 'Not Provided',
      relationName: formData.relationName || 'N/A',
      relationType: formData.relationType,
      status: 'Active',
      dateOfBirth: `19${80 - parseInt(formData.age) + 20}-01-01`,
      registeredDate: new Date().toISOString().split('T')[0]
    };

    VOTERS.push(newVoter);
    if (onVoterAdded) onVoterAdded();
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
              <UserPlus size={22} color="#b91c1c" />
              Add New Voter
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Register a new voter in the system</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter full name"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.name ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.name && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.name}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Voter ID <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.voterId}
              onChange={(e) => setFormData({...formData, voterId: e.target.value})}
              placeholder="Enter voter ID"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.voterId ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.voterId && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.voterId}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              State <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.state}
              onChange={(e) => setFormData({...formData, state: e.target.value, district: '', constituency: '', block: '', panchayat: '', village: ''})}
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
              onChange={(e) => setFormData({...formData, district: e.target.value, constituency: '', block: '', panchayat: '', village: ''})}
              disabled={!formData.state}
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
              onChange={(e) => setFormData({...formData, constituency: e.target.value, block: '', panchayat: '', village: ''})}
              disabled={!formData.district}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.constituency ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Constituency</option>
              {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.constituency && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.constituency}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Block</label>
            <select
              value={formData.block}
              onChange={(e) => setFormData({...formData, block: e.target.value, panchayat: '', village: ''})}
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
              onChange={(e) => setFormData({...formData, panchayat: e.target.value, village: ''})}
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
              disabled={!formData.panchayat}
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
              disabled={!formData.pollingBooth}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Village</option>
              {villages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>House Number</label>
            <input
              type="text"
              value={formData.houseNumber}
              onChange={(e) => setFormData({...formData, houseNumber: e.target.value})}
              placeholder="House number"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Age <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="Age"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.age ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.age && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.age}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Caste</label>
            <select
              value={formData.caste}
              onChange={(e) => setFormData({...formData, caste: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              {castes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Phone Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              placeholder="Phone number"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.phoneNumber ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.phoneNumber && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.phoneNumber}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Email address"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Relation Name</label>
            <input
              type="text"
              value={formData.relationName}
              onChange={(e) => setFormData({...formData, relationName: e.target.value})}
              placeholder="Relation name"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Relation Type</label>
            <select
              value={formData.relationType}
              onChange={(e) => setFormData({...formData, relationType: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              {relationTypes.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <UserPlus size={18} /> Add Voter
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

const Voters = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [filterCaste, setFilterCaste] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAddVoterModal, setShowAddVoterModal] = useState(false);
  const [voters, setVoters] = useState(VOTERS);
  const [showAll, setShowAll] = useState(false);

  // Check if user can access voters
  if (!canAccessPage(user, 'voters')) {
    return (
      <LayoutWrapper>
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
          <Users size={48} color="#737373" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#b91c1c', marginTop: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#737373' }}>You don't have permission to view the voters list.</p>
        </div>
      </LayoutWrapper>
    );
  }

  // Get hierarchy options (filtered based on data availability)
  const states = getStates();
  
  const getFilteredDistricts = (state) => {
    if (!state) return [];
    const allDistricts = getDistricts(state);
    return allDistricts.filter(d => voters.some(v => v.state === state && v.district === d));
  };
  
  const getFilteredConstituencies = (state, district) => {
    if (!state || !district) return [];
    const allConstituencies = getAssemblyConstituencies(state, district);
    return allConstituencies.filter(c => voters.some(v => v.state === state && v.district === district && v.constituency === c));
  };
  
  const getFilteredBlocks = (state, district, constituency) => {
    if (!state || !district || !constituency) return [];
    const allBlocks = getBlocks(state, district, constituency);
    return allBlocks.filter(b => voters.some(v => v.state === state && v.district === district && v.constituency === constituency && v.block === b));
  };
  
  const getFilteredPanchayats = (state, district, constituency, block) => {
    if (!state || !district || !constituency || !block) return [];
    const allPanchayats = getPanchayats(state, district, constituency, block);
    return allPanchayats.filter(p => voters.some(v => v.state === state && v.district === district && v.constituency === constituency && v.block === block && v.panchayat === p));
  };
  
  const getFilteredBooths = (state, district, constituency, block, panchayat) => {
    if (!state || !district || !constituency || !block || !panchayat) return [];
    const allBooths = getPollingBooths(state, district, constituency, block, panchayat);
    return allBooths.filter(b => voters.some(v => v.state === state && v.district === district && v.constituency === constituency && v.block === block && v.panchayat === panchayat && v.pollingBooth === b));
  };
  
  const getFilteredVillages = (state, district, constituency, block, panchayat, booth) => {
    if (!state || !district || !constituency || !block || !panchayat || !booth) return [];
    const allVillages = getVillages(state, district, constituency, block, panchayat, booth);
    return allVillages.filter(v => voters.some(voter => voter.state === state && voter.district === district && voter.constituency === constituency && voter.block === block && voter.panchayat === panchayat && voter.pollingBooth === booth && voter.village === v));
  };

  const districts = getFilteredDistricts(selectedState);
  const constituencies = getFilteredConstituencies(selectedState, selectedDistrict);
  const blocks = getFilteredBlocks(selectedState, selectedDistrict, selectedAssembly);
  const panchayats = getFilteredPanchayats(selectedState, selectedDistrict, selectedAssembly, selectedBlock);
  const booths = getFilteredBooths(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat);
  const villages = getFilteredVillages(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat, selectedBooth);

  const castes = [...new Set(voters.map(v => v.caste))].sort();
  const genders = ['Male', 'Female', 'Other'];
  const statuses = ['Active', 'Inactive'];

  const filteredVoters = voters.filter(v => {
    let match = true;
    if (search) {
      const searchLower = search.toLowerCase();
      const nameMatch = v.name.toLowerCase().includes(searchLower);
      const idMatch = v.voterId.toLowerCase().includes(searchLower);
      const phoneMatch = v.phoneNumber.includes(search);
      if (!nameMatch && !idMatch && !phoneMatch) match = false;
    }
    if (selectedState && v.state !== selectedState) match = false;
    if (selectedDistrict && v.district !== selectedDistrict) match = false;
    if (selectedAssembly && v.constituency !== selectedAssembly) match = false;
    if (selectedBlock && v.block !== selectedBlock) match = false;
    if (selectedPanchayat && v.panchayat !== selectedPanchayat) match = false;
    if (selectedBooth && v.pollingBooth !== selectedBooth) match = false;
    if (selectedVillage && v.village !== selectedVillage) match = false;
    if (filterCaste && v.caste !== filterCaste) match = false;
    if (filterGender && v.gender !== filterGender) match = false;
    if (filterStatus && v.status !== filterStatus) match = false;
    return match;
  });

  const clearFilters = () => {
    setSearch('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedAssembly('');
    setSelectedBlock('');
    setSelectedPanchayat('');
    setSelectedBooth('');
    setSelectedVillage('');
    setFilterCaste('');
    setFilterGender('');
    setFilterStatus('');
  };

  const hasActiveFilters = search || selectedState || selectedDistrict || selectedAssembly || selectedBlock || selectedPanchayat || selectedBooth || selectedVillage || filterCaste || filterGender || filterStatus;

  // Export CSV
  const exportCSV = () => {
    const headers = ['S.No', 'State', 'District', 'Name', 'Voter ID', 'Constituency', 'Block', 'Panchayat', 'Polling Booth', 'Village', 'House No', 'Age', 'Gender', 'Caste', 'Relation Name', 'Relation Type', 'Phone', 'Email', 'DOB', 'Status', 'Registration Date'];
    const rows = filteredVoters.map((v, i) => [
      i + 1, v.state, v.district, v.name, v.voterId, v.constituency, v.block, v.panchayat, v.pollingBooth, v.village, v.houseNumber, v.age, v.gender, v.caste, v.relationName, v.relationType, v.phoneNumber, v.email, v.dateOfBirth, v.status, v.registeredDate
    ]);
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      const escapedRow = row.map(field => {
        if (typeof field === 'string' && field.includes(',')) return `"${field}"`;
        return field;
      });
      csvContent += escapedRow.join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `voters_list_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const displayVoters = showAll ? filteredVoters : filteredVoters.slice(0, 50);

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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>Voter List</h2>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>{voters.length.toLocaleString()} total voters</p>
          </div>
        </div>

        {/* Search and Filters */}
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
              minWidth: '200px', 
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
                placeholder="Search by name, ID, or phone..."
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

          {/* Hierarchy Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '0.3rem', 
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '0.2rem 0',
            borderTop: '1px solid #f5f5f5'
          }}>
            <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.7rem' }}>
              <MapPin size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />
              Location:
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '100px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Constituencies</option>
              {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '100px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Booths</option>
              {booths.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select 
              value={selectedVillage} 
              onChange={(e) => setSelectedVillage(e.target.value)} 
              disabled={!selectedBooth}
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Villages</option>
              {villages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          {/* Demographics Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '0.3rem', 
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '0.2rem 0',
            borderTop: '1px solid #f5f5f5'
          }}>
            <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.7rem' }}>
              <Users size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />
              Demographics:
            </span>

            <select 
              value={filterCaste} 
              onChange={(e) => setFilterCaste(e.target.value)}
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Castes</option>
              {castes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
              value={filterGender} 
              onChange={(e) => setFilterGender(e.target.value)}
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Genders</option>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
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
            {selectedState && <span className="status-badge status-active" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{selectedState}</span>}
            {selectedDistrict && <span className="status-badge status-scheduled" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{selectedDistrict}</span>}
            {selectedAssembly && <span className="status-badge status-completed" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{selectedAssembly}</span>}
            {filterCaste && <span className="status-badge status-active" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{filterCaste}</span>}
            {filterGender && <span className="status-badge status-scheduled" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{filterGender}</span>}
            {filterStatus && <span className="status-badge status-completed" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>{filterStatus}</span>}
          </div>
        )}

        {/* Actions - All buttons grouped together */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '0.3rem',
          flexWrap: 'wrap',
          gap: '0.3rem',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setShowReportModal(true)}
              className="btn-outline" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}
            >
              <FileText size={14} /> Report
            </button>
            <button onClick={exportCSV} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}>
              <FileSpreadsheet size={14} /> Export CSV
            </button>
            <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.25rem 0.6rem', fontSize: '0.7rem' }}>
              <Printer size={14} /> Print
            </button>
            <button 
              className="btn-primary" 
              onClick={() => setShowAddVoterModal(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', padding: '0.25rem 0.6rem', fontSize: '0.7rem', background: '#22c55e' }}
            >
              <UserPlus size={14} /> Add Voter
            </button>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#737373' }}>
            {filteredVoters.length} of {voters.length} voters
          </p>
        </div>

        {/* Voter Table - Scrollable */}
        <div style={{ 
          flex: 1,
          overflow: 'auto',
          border: '1px solid #f0f0f0',
          borderRadius: '0.5rem',
          background: 'white',
          minHeight: '250px',
          maxHeight: 'calc(100vh - 440px)'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.75rem',
            minWidth: '1900px'
          }}>
            <thead style={{ 
              position: 'sticky', 
              top: 0, 
              zIndex: 10,
              background: '#fafafa'
            }}>
              <tr>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '35px' }}>#</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '85px' }}>State</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '95px' }}>District</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '130px' }}>Name</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '110px' }}>Voter ID</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '110px' }}>Constituency</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '100px' }}>Block</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '110px' }}>Panchayat</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '85px' }}>Booth</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '85px' }}>Village</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '60px' }}>House</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '40px' }}>Age</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '60px' }}>Gender</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '65px' }}>Caste</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '85px' }}>Relation</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '100px' }}>Phone</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '130px' }}>Email</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '85px' }}>DOB</th>
                <th style={{ padding: '0.35rem 0.4rem', textAlign: 'left', fontWeight: '600', color: '#737373', borderBottom: '2px solid #f0f0f0', minWidth: '65px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {displayVoters.map((voter, i) => (
                <motion.tr
                  key={voter.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.002 }}
                  style={{ borderBottom: '1px solid #f5f5f5' }}
                >
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.65rem', color: '#737373', textAlign: 'center' }}>{i + 1}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>
                    <span style={{ 
                      padding: '0.1rem 0.3rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.5rem', 
                      fontWeight: '600',
                      background: voter.state === 'Chhattisgarh' ? '#fef3c7' : '#dbeafe',
                      color: voter.state === 'Chhattisgarh' ? '#92400e' : '#1e40af'
                    }}>
                      {voter.state}
                    </span>
                  </td>
                  <td style={{ padding: '0.3rem 0.4rem', fontWeight: '500' }}>{voter.district}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontWeight: '600' }}>{voter.name}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.65rem' }}>{voter.voterId}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.7rem' }}>{voter.constituency}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.7rem' }}>{voter.block}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.7rem' }}>{voter.panchayat}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.65rem' }}>{voter.pollingBooth}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.7rem' }}>{voter.village}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>{voter.houseNumber}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>{voter.age}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>{voter.gender}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>{voter.caste}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.65rem' }}>
                    {voter.relationName}<br/>
                    <span style={{ fontSize: '0.5rem', color: '#737373' }}>({voter.relationType})</span>
                  </td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.65rem' }}>{voter.phoneNumber}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.6rem' }}>{voter.email}</td>
                  <td style={{ padding: '0.3rem 0.4rem', fontSize: '0.6rem' }}>{voter.dateOfBirth}</td>
                  <td style={{ padding: '0.3rem 0.4rem' }}>
                    <span className={`status-badge ${voter.status === 'Active' ? 'status-active' : 'status-inactive'}`} style={{ fontSize: '0.55rem', padding: '0.1rem 0.3rem' }}>
                      {voter.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer - Show all toggle */}
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
            Showing {displayVoters.length} of {filteredVoters.length} voters
            {filteredVoters.length > 50 && !showAll && (
              <button 
                onClick={() => setShowAll(true)}
                style={{ 
                  marginLeft: '0.5rem', 
                  color: '#b91c1c', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.7rem',
                  textDecoration: 'underline'
                }}
              >
                Show All ({filteredVoters.length})
              </button>
            )}
            {showAll && (
              <button 
                onClick={() => setShowAll(false)}
                style={{ 
                  marginLeft: '0.5rem', 
                  color: '#737373', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.7rem',
                  textDecoration: 'underline'
                }}
              >
                Show Less
              </button>
            )}
          </p>
        </div>

        {/* Modals */}
        <VoterReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          voters={filteredVoters}
        />

        <AddVoterModal
          isOpen={showAddVoterModal}
          onClose={() => setShowAddVoterModal(false)}
          onVoterAdded={() => setVoters([...VOTERS])}
        />
      </motion.div>
    </LayoutWrapper>
  );
};

export default Voters;