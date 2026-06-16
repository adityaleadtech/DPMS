import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { MEETINGS } from '../api/data';

const Meetings = () => {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');

  const statuses = ['All', 'Pending', 'Scheduled', 'Completed', 'Rescheduled', 'Cancelled'];
  const districts = [...new Set(MEETINGS.map(m => m.district))];
  const constituencies = filterDistrict ? [...new Set(MEETINGS.filter(m => m.district === filterDistrict).map(m => m.constituency))] : [];

  const filtered = MEETINGS.filter(m => 
    (filterStatus === 'All' || m.status === filterStatus) &&
    (filterDistrict === '' || m.district === filterDistrict) &&
    (filterConstituency === '' || m.constituency === filterConstituency)
  );

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Meeting Requests</h2>
            <p style={{ color: '#737373' }}>Manage citizen meeting requests</p>
          </div>
          <button className="btn-primary">+ Schedule Meeting</button>
        </div>

        <div className="filter-group">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterDistrict} onChange={(e) => { setFilterDistrict(e.target.value); setFilterConstituency(''); }}>
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={filterConstituency} onChange={(e) => setFilterConstituency(e.target.value)} disabled={!filterDistrict}>
            <option value="">All Constituencies</option>
            {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1rem' }}>
          {filtered.map((meeting, i) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              style={{ background: 'white', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h4 style={{ fontWeight: '600', color: '#1a1a1a' }}>{meeting.citizenName}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#404040' }}>{meeting.purpose}</p>
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.8rem', color: '#737373', flexWrap: 'wrap' }}>
                    <span>📅 {meeting.dateRequested}</span>
                    <span>📍 {meeting.location}</span>
                    <span>🗳️ {meeting.constituency}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`status-badge ${meeting.status === 'Pending' ? 'status-pending' : meeting.status === 'Scheduled' ? 'status-scheduled' : meeting.status === 'Completed' ? 'status-completed' : 'status-inactive'}`}>
                    {meeting.status}
                  </span>
                  <div style={{ marginTop: '0.25rem', fontSize: '0.7rem', color: '#737373', fontWeight: '500' }}>
                    {meeting.priority}
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                <button className="btn-primary btn-sm">📝 Respond</button>
                <button className="btn-outline btn-sm">📅 Reschedule</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Meetings;