import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { NOTIFICATIONS } from '../api/data';

const Notifications = () => {
  const [filter, setFilter] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const types = ['All', 'Info', 'Success', 'Warning', 'Alert'];
  const districts = [...new Set(NOTIFICATIONS.map(n => n.district))];

  const filtered = NOTIFICATIONS.filter(n => 
    (filter === 'All' || n.type === filter) &&
    (filterDistrict === '' || n.district === filterDistrict)
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Notifications</h2>
            <p style={{ color: '#737373' }}>All system notifications</p>
          </div>
          <button className="btn-outline">Mark All Read</button>
        </div>

        <div className="filter-group">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.01 }}
              style={{ 
                background: n.read ? 'white' : '#fef2f2', 
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: '1px solid #f0f0f0', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}
            >
              <div>
                <h4 style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.9rem' }}>{n.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#737373' }}>{n.message}</p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#a3a3a3', marginTop: '0.25rem' }}>
                  <span>{n.date}</span>
                  <span>{n.district} · {n.constituency}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: '9999px', 
                  fontSize: '0.6rem', 
                  fontWeight: '600', 
                  background: n.type === 'Info' ? '#dbeafe' : n.type === 'Success' ? '#dcfce7' : n.type === 'Warning' ? '#fef3c7' : '#fee2e2',
                  color: n.type === 'Info' ? '#1e40af' : n.type === 'Success' ? '#166534' : n.type === 'Warning' ? '#92400e' : '#991b1b'
                }}>
                  {n.type}
                </span>
                {!n.read && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#b91c1c' }} />}
              </div>
            </motion.div>
          ))}
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#737373' }}>
          Showing {filtered.length} notifications
        </p>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Notifications;