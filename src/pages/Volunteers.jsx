import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { VOLUNTEERS } from '../api/data';
import { useAuth } from '../context/AuthContext';

const Volunteers = () => {
  const { isCM, isMinister } = useAuth();
  const canApprove = isCM || isMinister;
  
  const [volunteers, setVolunteers] = useState(VOLUNTEERS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [filterArea, setFilterArea] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const areas = [...new Set(VOLUNTEERS.map(v => v.area))];
  
  const filtered = volunteers.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'All' || v.status === filter) &&
    (filterArea === '' || v.area === filterArea)
  );

  const pendingCount = volunteers.filter(v => v.status === 'Pending').length;

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Volunteers</h2>
            <p style={{ color: '#737373' }}>Manage volunteer registrations</p>
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
            placeholder="Search volunteers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Active">✅ Active</option>
            <option value="Pending">⏳ Pending</option>
            <option value="Inactive">❌ Inactive</option>
          </select>
          <select value={filterArea} onChange={(e) => setFilterArea(e.target.value)}>
            <option value="">All Areas</option>
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -4 }}
              style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '0.75rem', 
                border: v.status === 'Pending' ? '2px solid #fecaca' : '1px solid #f0f0f0',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '600', background: v.status === 'Active' ? '#dcfce7' : v.status === 'Pending' ? '#fef3c7' : '#fee2e2', color: v.status === 'Active' ? '#166534' : v.status === 'Pending' ? '#92400e' : '#991b1b' }}>
                {v.status === 'Active' ? '✅' : v.status === 'Pending' ? '⏳' : '❌'} {v.status}
              </div>
              <div>
                <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a' }}>{v.name}</h4>
                <p style={{ fontSize: '0.75rem', color: '#a3a3a3' }}>ID: {v.id}</p>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <p style={{ fontSize: '0.85rem', color: '#404040' }}>📱 {v.mobile}</p>
                <p style={{ fontSize: '0.85rem', color: '#404040' }}>📍 {v.area} · {v.constituency}</p>
                <p style={{ fontSize: '0.85rem', color: '#404040' }}>📅 Joined: {v.joinDate}</p>
                <span style={{ fontSize: '0.7rem', background: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '9999px', color: '#404040' }}>🛠️ {v.skills}</span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                {canApprove && v.status === 'Pending' ? (
                  <button 
                    className="btn-primary" 
                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem' }}
                    onClick={() => { setSelectedVolunteer(v); setShowModal(true); }}
                  >
                    📋 Review
                  </button>
                ) : (
                  <>
                    <button className="btn-primary" style={{ padding: '0.4rem', fontSize: '0.75rem', flex: 1 }}>📋 Assign Task</button>
                    <button className="btn-outline" style={{ padding: '0.4rem', fontSize: '0.75rem', flex: 1 }}>👤 Profile</button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#737373' }}>
          Showing {filtered.length} volunteers
        </p>

        {showModal && selectedVolunteer && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content">
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
      </motion.div>
    </LayoutWrapper>
  );
};

export default Volunteers;