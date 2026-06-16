import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { COMPLAINTS } from '../api/data';
import { useAuth } from '../context/AuthContext';

const Complaints = () => {
  const { user, isUser } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    category: 'Infrastructure',
    priority: 'Medium',
    location: '',
    district: '',
    constituency: ''
  });

  const statuses = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const districts = [...new Set(COMPLAINTS.map(c => c.district))];
  const constituencies = filterDistrict ? [...new Set(COMPLAINTS.filter(c => c.district === filterDistrict).map(c => c.constituency))] : [];

  let complaints = COMPLAINTS;
  if (isUser) {
    complaints = COMPLAINTS.filter(c => c.submittedBy === user?.name || c.voterId === `CG/RAI/100000`);
  }

  const filtered = complaints.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === 'All' || c.status === filterStatus) &&
    (filterDistrict === '' || c.district === filterDistrict) &&
    (filterConstituency === '' || c.constituency === filterConstituency)
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Complaints</h2>
            <p style={{ color: '#737373' }}>{isUser ? 'Your complaints' : 'Track citizen complaints'}</p>
          </div>
          <button className="btn-primary" onClick={() => setShowCreateModal(true)}>+ New Complaint</button>
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            {statuses.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
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

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>District</th>
                <th>Constituency</th>
                <th>Status</th>
                <th>Priority</th>
                <th>Progress</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((complaint, i) => (
                <motion.tr
                  key={complaint.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.005 }}
                >
                  <td><strong>{complaint.id}</strong></td>
                  <td>{complaint.title}</td>
                  <td>{complaint.category}</td>
                  <td>{complaint.district}</td>
                  <td>{complaint.constituency}</td>
                  <td>
                    <span className={`status-badge ${complaint.status === 'Open' ? 'status-pending' : complaint.status === 'In Progress' ? 'status-scheduled' : complaint.status === 'Resolved' ? 'status-completed' : 'status-inactive'}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td>
                    <span style={{ padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '600', background: complaint.priority === 'Critical' ? '#fee2e2' : complaint.priority === 'High' ? '#fef3c7' : '#e5e5e5', color: complaint.priority === 'Critical' ? '#991b1b' : complaint.priority === 'High' ? '#92400e' : '#737373' }}>
                      {complaint.priority}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '50px', height: '6px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${complaint.progress}%`, height: '100%', background: '#b91c1c', borderRadius: '9999px' }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>{complaint.progress}%</span>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>{complaint.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#737373' }}>
          Showing {filtered.length} complaints
        </p>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Complaints;