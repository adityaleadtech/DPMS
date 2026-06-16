import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { REGISTRATIONS } from '../api/data';
import { useAuth } from '../context/AuthContext';

const Registration = () => {
  const { isCM, isMinister } = useAuth();
  const canApprove = isCM || isMinister;
  
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [selectedReg, setSelectedReg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [registrations, setRegistrations] = useState(REGISTRATIONS);

  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];
  const districts = [...new Set(REGISTRATIONS.map(r => r.district))];

  const handleAction = (id, action) => {
    const updated = registrations.map(r => r.id === id ? { ...r, status: action } : r);
    setRegistrations(updated);
    setShowModal(false);
  };

  const filtered = registrations.filter(r => 
    (filter === 'All' || r.status === filter) &&
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterDistrict === '' || r.district === filterDistrict)
  );

  const pendingCount = registrations.filter(r => r.status === 'Pending').length;

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Voter Registration</h2>
            <p style={{ color: '#737373' }}>Manage citizen registrations</p>
          </div>
          {canApprove && (
            <div style={{ background: '#fef3c7', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: '600', color: '#92400e' }}>
              ⏳ {pendingCount} Pending
            </div>
          )}
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>District</th>
                <th>Constituency</th>
                <th>Volunteer</th>
                <th>Status</th>
                {canApprove && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td>
                    <div style={{ fontWeight: '500', fontSize: '0.85rem' }}>{r.name}</div>
                    <div style={{ fontSize: '0.7rem', color: '#737373' }}>{r.occupation} · {r.age}</div>
                  </td>
                  <td style={{ fontSize: '0.85rem' }}>{r.mobile}</td>
                  <td style={{ fontSize: '0.85rem' }}>{r.district}</td>
                  <td style={{ fontSize: '0.85rem' }}>{r.constituency}</td>
                  <td>
                    {r.wantsVolunteer ? 
                      <span style={{ background: '#dbeafe', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '600', color: '#1e40af' }}>Yes</span> : 
                      <span style={{ background: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '600', color: '#737373' }}>No</span>
                    }
                  </td>
                  <td>
                    <span className={`status-badge ${r.status === 'Approved' ? 'status-active' : r.status === 'Pending' ? 'status-pending' : 'status-inactive'}`}>
                      {r.status}
                    </span>
                  </td>
                  {canApprove && r.status === 'Pending' && (
                    <td>
                      <button 
                        className="btn-primary btn-sm" 
                        onClick={() => { setSelectedReg(r); setShowModal(true); }}
                      >
                        Review
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#737373' }}>
          Showing {filtered.length} registrations
        </p>

        {showModal && selectedReg && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content">
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>📋 Review Registration</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <strong>Name:</strong> <span>{selectedReg.name}</span>
                <strong>Mobile:</strong> <span>{selectedReg.mobile}</span>
                <strong>District:</strong> <span>{selectedReg.district}</span>
                <strong>Constituency:</strong> <span>{selectedReg.constituency}</span>
                <strong>Wants Volunteer:</strong> <span>{selectedReg.wantsVolunteer ? '✅ Yes' : 'No'}</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-success" style={{ flex: 1 }} onClick={() => handleAction(selectedReg.id, 'Approved')}>✅ Approve</button>
                <button className="btn-danger" style={{ flex: 1 }} onClick={() => handleAction(selectedReg.id, 'Rejected')}>❌ Reject</button>
              </div>
              <button className="btn-outline" style={{ width: '100%', marginTop: '0.75rem' }} onClick={() => setShowModal(false)}>Close</button>
            </motion.div>
          </div>
        )}
      </motion.div>
    </LayoutWrapper>
  );
};

export default Registration;