import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Filter, 
  Plus, 
  XCircle, 
  Clock, 
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
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MapPin as MapPinIcon,
  User,
  MessageSquare,
  Check,
  X as XIcon
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { MEETINGS } from '../api/data';
import { canAccessPage, canWrite } from '../api/data';
import { useAuth } from '../context/AuthContext';
import { getDistricts, getAssemblyConstituencies } from '../api/data';

// Report Modal Component
const MeetingReportModal = ({ isOpen, onClose, meetings }) => {
  if (!isOpen) return null;

  const total = meetings.length;
  const pending = meetings.filter(m => m.status === 'Pending').length;
  const scheduled = meetings.filter(m => m.status === 'Scheduled').length;
  const completed = meetings.filter(m => m.status === 'Completed').length;
  const rescheduled = meetings.filter(m => m.status === 'Rescheduled').length;
  const cancelled = meetings.filter(m => m.status === 'Cancelled').length;
  
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const high = meetings.filter(m => m.priority === 'High').length;
  const urgent = meetings.filter(m => m.priority === 'Urgent').length;
  const medium = meetings.filter(m => m.priority === 'Medium').length;
  const low = meetings.filter(m => m.priority === 'Low').length;
  
  const districtData = {};
  meetings.forEach(m => {
    if (!districtData[m.district]) districtData[m.district] = 0;
    districtData[m.district]++;
  });
  const topDistricts = Object.entries(districtData).sort((a, b) => b[1] - a[1]).slice(0, 5);
  
  const purposeData = {};
  meetings.forEach(m => {
    if (!purposeData[m.purpose]) purposeData[m.purpose] = 0;
    purposeData[m.purpose]++;
  });
  const topPurposes = Object.entries(purposeData).sort((a, b) => b[1] - a[1]).slice(0, 5);

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
              Meeting Report
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Comprehensive overview of meeting requests</p>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#8b5cf6' }}>{total}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Total Meetings</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#f59e0b' }}>{pending}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Pending</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3b82f6' }}>{scheduled}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Scheduled</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>{completed}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Completed</div>
          </div>
          <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #f0f0f0', textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#22c55e' }}>{completionRate}%</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Completion Rate</div>
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
                { label: 'Urgent', value: urgent, color: '#dc2626' },
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
              Top Purposes
            </h4>
            {topPurposes.map(([purpose, count], i) => {
              const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={purpose} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.2rem 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span style={{ fontSize: '0.65rem', fontWeight: '600', color: '#b91c1c', width: '20px' }}>#{i + 1}</span>
                  <span style={{ flex: 1, fontSize: '0.75rem' }}>{purpose}</span>
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
            Top Districts by Meetings
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

// Create Meeting Modal
const CreateMeetingModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    citizenName: '',
    purpose: '',
    district: '',
    constituency: '',
    location: '',
    dateRequested: '',
    priority: 'Medium',
    agenda: ''
  });

  const [errors, setErrors] = useState({});
  const districts = getDistricts('Chhattisgarh');
  const constituencies = formData.district ? getAssemblyConstituencies('Chhattisgarh', formData.district) : [];

  const purposes = ['Development Discussion', 'Infrastructure Review', 'Health Planning', 'Education Meeting', 'Employment Strategy', 'Water Management', 'Road Construction', 'Housing Scheme', 'Sanitation Drive', 'Agriculture Planning'];
  const priorities = ['High', 'Medium', 'Low', 'Urgent'];

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.citizenName) newErrors.citizenName = 'Citizen name is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.district) newErrors.district = 'District is required';
    if (!formData.constituency) newErrors.constituency = 'Constituency is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.dateRequested) newErrors.dateRequested = 'Date is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newMeeting = {
      id: `MTG${String(400 + MEETINGS.length + 1).padStart(4, '0')}`,
      citizenName: formData.citizenName,
      purpose: formData.purpose,
      district: formData.district,
      constituency: formData.constituency,
      location: formData.location,
      dateRequested: formData.dateRequested,
      scheduledDate: formData.dateRequested,
      priority: formData.priority,
      agenda: formData.agenda || 'General Discussion',
      status: 'Pending'
    };

    MEETINGS.push(newMeeting);
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
              <Calendar size={22} color="#b91c1c" />
              Schedule New Meeting
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Schedule a meeting with a citizen</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Citizen Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.citizenName}
              onChange={(e) => setFormData({...formData, citizenName: e.target.value})}
              placeholder="Enter citizen name"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.citizenName ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.citizenName && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.citizenName}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Purpose <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.purpose ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">Select Purpose</option>
              {purposes.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            {errors.purpose && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.purpose}</span>}
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

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Location <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="Meeting location"
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.location ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.location && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.location}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Date <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="date"
              value={formData.dateRequested}
              onChange={(e) => setFormData({...formData, dateRequested: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: `1px solid ${errors.dateRequested ? '#ef4444' : '#e5e5e5'}`, borderRadius: '0.5rem', outline: 'none' }}
            />
            {errors.dateRequested && <span style={{ fontSize: '0.75rem', color: '#ef4444' }}>{errors.dateRequested}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Agenda</label>
            <textarea
              value={formData.agenda}
              onChange={(e) => setFormData({...formData, agenda: e.target.value})}
              placeholder="Meeting agenda items..."
              rows="2"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Calendar size={18} /> Schedule Meeting
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

// Respond Modal
const RespondModal = ({ isOpen, onClose, meeting, onRespond }) => {
  const [response, setResponse] = useState('Accept');
  const [scheduledDate, setScheduledDate] = useState(meeting?.dateRequested || '');
  const [scheduledTime, setScheduledTime] = useState('10:00');
  const [venue, setVenue] = useState(meeting?.location || '');
  const [notes, setNotes] = useState('');

  if (!isOpen || !meeting) return null;

  const handleSubmit = () => {
    const status = response === 'Accept' ? 'Scheduled' : 'Cancelled';
    if (onRespond) {
      onRespond({
        ...meeting,
        status: status,
        scheduledDate: scheduledDate,
        scheduledTime: scheduledTime,
        venue: venue,
        responseNotes: notes,
        respondedOn: new Date().toISOString().split('T')[0]
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
              <MessageSquare size={22} color="#b91c1c" />
              Respond to Meeting Request
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              {meeting.citizenName} - {meeting.purpose}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Response <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setResponse('Accept')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  background: response === 'Accept' ? '#dcfce7' : '#f5f5f5',
                  border: response === 'Accept' ? '2px solid #22c55e' : '1px solid #e5e5e5',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: response === 'Accept' ? '#166534' : '#737373',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem'
                }}
              >
                <Check size={16} /> Accept
              </button>
              <button
                onClick={() => setResponse('Reject')}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  background: response === 'Reject' ? '#fee2e2' : '#f5f5f5',
                  border: response === 'Reject' ? '2px solid #ef4444' : '1px solid #e5e5e5',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: response === 'Reject' ? '#991b1b' : '#737373',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.3rem'
                }}
              >
                <XIcon size={16} /> Reject
              </button>
            </div>
          </div>

          {response === 'Accept' && (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                    Scheduled Date <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                    Scheduled Time <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                  Venue <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Meeting venue"
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
                />
              </div>
            </>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional information..."
              rows="2"
              style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Check size={18} /> Send Response
          </button>
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        </div>
      </motion.div>
    </div>
  );
};

// View Meeting Modal
const ViewMeetingModal = ({ isOpen, onClose, meeting }) => {
  if (!isOpen || !meeting) return null;

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'status-pending',
      'Scheduled': 'status-scheduled',
      'Completed': 'status-completed',
      'Rescheduled': 'status-upcoming',
      'Cancelled': 'status-inactive'
    };
    return colors[status] || 'status-pending';
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
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={22} color="#b91c1c" />
              Meeting Details
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>
              Request from {meeting.citizenName}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Citizen</div>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: '#1a1a1a' }}>{meeting.citizenName}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Status</div>
              <span className={`status-badge ${getStatusColor(meeting.status)}`} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                {meeting.status}
              </span>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Purpose</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem', color: '#1a1a1a' }}>{meeting.purpose}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Priority</div>
              <div style={{ 
                fontWeight: '600', 
                fontSize: '0.85rem',
                color: meeting.priority === 'Urgent' ? '#dc2626' : meeting.priority === 'High' ? '#f59e0b' : '#3b82f6'
              }}>
                {meeting.priority}
              </div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>District</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem' }}>{meeting.district}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Constituency</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem' }}>{meeting.constituency}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Location</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem' }}>{meeting.location}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Requested Date</div>
              <div style={{ fontWeight: '500', fontSize: '0.85rem' }}>{meeting.dateRequested}</div>
            </div>
          </div>

          {meeting.scheduledDate && meeting.status === 'Scheduled' && (
            <div style={{ background: '#dcfce7', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #bbf7d0', marginBottom: '0.75rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={16} /> Scheduled
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginTop: '0.25rem', fontSize: '0.85rem' }}>
                <div><strong>Date:</strong> {meeting.scheduledDate}</div>
                <div><strong>Time:</strong> {meeting.scheduledTime || '10:00 AM'}</div>
                <div><strong>Venue:</strong> {meeting.venue || meeting.location}</div>
              </div>
            </div>
          )}

          {meeting.agenda && (
            <div style={{ background: '#fafafa', padding: '0.75rem', borderRadius: '0.5rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#737373' }}>Agenda</div>
              <div style={{ fontSize: '0.85rem', color: '#404040', marginTop: '0.15rem' }}>{meeting.agenda}</div>
            </div>
          )}

          {meeting.responseNotes && (
            <div style={{ background: '#fef3c7', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #fde68a', marginTop: '0.75rem' }}>
              <div style={{ fontSize: '0.65rem', color: '#92400e' }}>Response Notes</div>
              <div style={{ fontSize: '0.85rem', color: '#78350f', marginTop: '0.15rem' }}>{meeting.responseNotes}</div>
              {meeting.respondedOn && (
                <div style={{ fontSize: '0.6rem', color: '#92400e', marginTop: '0.25rem' }}>Responded on: {meeting.respondedOn}</div>
              )}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          {meeting.status === 'Pending' && (
            <button 
              className="btn-primary" 
              onClick={() => { onClose(); /* Open respond modal */ }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
            >
              <MessageSquare size={18} /> Respond
            </button>
          )}
          {meeting.status === 'Scheduled' && (
            <button className="btn-outline" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <ClockIcon size={18} /> Reschedule
            </button>
          )}
          <button className="btn-outline" onClick={onClose} style={{ flex: 1 }}>Close</button>
        </div>
      </motion.div>
    </div>
  );
};

const Meetings = () => {
  const { user } = useAuth();
  const canCreate = canWrite(user);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [meetings, setMeetings] = useState(MEETINGS);

  // Check if user can access meetings
  if (!canAccessPage(user, 'meetings')) {
    return (
      <LayoutWrapper>
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem', 
          background: 'white', 
          borderRadius: '0.75rem', 
          border: '1px solid #f0f0f0' 
        }}>
          <Calendar size={48} color="#737373" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#b91c1c', marginTop: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#737373' }}>You don't have permission to view meetings.</p>
          <p style={{ color: '#737373', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Please contact your administrator for access.
          </p>
        </div>
      </LayoutWrapper>
    );
  }

  const statuses = ['All', 'Pending', 'Scheduled', 'Completed', 'Rescheduled', 'Cancelled'];
  const districts = [...new Set(meetings.map(m => m.district))];
  const constituencies = filterDistrict ? [...new Set(meetings.filter(m => m.district === filterDistrict).map(m => m.constituency))] : [];

  const filtered = meetings.filter(m => 
    (filterStatus === 'All' || m.status === filterStatus) &&
    (filterDistrict === '' || m.district === filterDistrict) &&
    (filterConstituency === '' || m.constituency === filterConstituency)
  );

  const clearFilters = () => {
    setFilterStatus('All');
    setFilterDistrict('');
    setFilterConstituency('');
  };

  const hasActiveFilters = filterStatus !== 'All' || filterDistrict || filterConstituency;

  const handleRespond = (updatedMeeting) => {
    const index = meetings.findIndex(m => m.id === updatedMeeting.id);
    if (index !== -1) {
      const newMeetings = [...meetings];
      newMeetings[index] = updatedMeeting;
      setMeetings(newMeetings);
      const origIndex = MEETINGS.findIndex(m => m.id === updatedMeeting.id);
      if (origIndex !== -1) {
        MEETINGS[origIndex] = updatedMeeting;
      }
    }
    setShowRespondModal(false);
    setSelectedMeeting(null);
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>Meeting Requests</h2>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Manage citizen meeting requests · {meetings.length} total</p>
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
                <Plus size={15} /> Schedule Meeting
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
            gap: '0.3rem', 
            flexWrap: 'wrap',
            alignItems: 'center'
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
            
            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-outline btn-sm" style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}>
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Meetings Grid - Removed duplicate Pending badge */}
        <div style={{ 
          flex: 1,
          overflow: 'auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '0.75rem',
          paddingBottom: '0.5rem'
        }}>
          {filtered.map((meeting, i) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              style={{ 
                background: 'white', 
                padding: '1rem', 
                borderRadius: '0.75rem', 
                border: meeting.status === 'Pending' ? '2px solid #fecaca' : '1px solid #f0f0f0',
                boxShadow: meeting.status === 'Pending' ? '0 0 20px rgba(185, 28, 28, 0.05)' : 'none',
                position: 'relative'
              }}
            >
              {/* Removed the duplicate Pending badge - only status badge below remains */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.95rem' }}>
                    <User size={14} style={{ display: 'inline', marginRight: '0.3rem' }} />
                    {meeting.citizenName}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#404040', marginTop: '0.1rem' }}>
                    {meeting.purpose}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.3rem', fontSize: '0.7rem', color: '#737373', flexWrap: 'wrap' }}>
                    <span><CalendarIcon size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />{meeting.dateRequested}</span>
                    <span><MapPinIcon size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />{meeting.location}</span>
                    <span>🗳️ {meeting.constituency}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '0.5rem' }}>
                  {/* Only one status badge - no duplicate */}
                  <span className={`status-badge ${meeting.status === 'Pending' ? 'status-pending' : meeting.status === 'Scheduled' ? 'status-scheduled' : meeting.status === 'Completed' ? 'status-completed' : 'status-inactive'}`} style={{ fontSize: '0.6rem', padding: '0.1rem 0.4rem' }}>
                    {meeting.status}
                  </span>
                  <div style={{ marginTop: '0.15rem', fontSize: '0.6rem', color: '#737373', fontWeight: '500' }}>
                    {meeting.priority}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.3rem' }}>
                {meeting.status === 'Pending' ? (
                  <button 
                    className="btn-primary btn-sm" 
                    onClick={() => { setSelectedMeeting(meeting); setShowRespondModal(true); }}
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
                  >
                    <MessageSquare size={12} /> Respond
                  </button>
                ) : (
                  <button 
                    className="btn-outline btn-sm" 
                    onClick={() => { setSelectedMeeting(meeting); setShowViewModal(true); }}
                    style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}
                  >
                    <Eye size={12} /> View
                  </button>
                )}
                {meeting.status === 'Scheduled' && (
                  <button className="btn-outline btn-sm" style={{ flex: 1, padding: '0.25rem', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                    <ClockIcon size={12} /> Reschedule
                  </button>
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
            Showing {filtered.length} of {meetings.length} meetings
          </p>
        </div>

        {/* Modals */}
        <MeetingReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          meetings={filtered}
        />

        <CreateMeetingModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreate={() => setMeetings([...MEETINGS])}
        />

        <RespondModal
          isOpen={showRespondModal}
          onClose={() => { setShowRespondModal(false); setSelectedMeeting(null); }}
          meeting={selectedMeeting}
          onRespond={handleRespond}
        />

        <ViewMeetingModal
          isOpen={showViewModal}
          onClose={() => { setShowViewModal(false); setSelectedMeeting(null); }}
          meeting={selectedMeeting}
        />
      </motion.div>
    </LayoutWrapper>
  );
};

export default Meetings;