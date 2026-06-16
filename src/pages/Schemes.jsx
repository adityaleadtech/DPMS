import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { SCHEMES } from '../api/data';

const Schemes = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(SCHEMES.map(s => s.category))];
  const filtered = SCHEMES.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory === 'All' || s.category === filterCategory)
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Government Schemes</h2>
            <p style={{ color: '#737373' }}>BJP government schemes and initiatives</p>
          </div>
          <button className="btn-primary">+ New Scheme</button>
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((scheme, i) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0', padding: '1.25rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a' }}>{scheme.name}</h4>
                <span className={`status-badge ${scheme.status === 'Active' ? 'status-active' : scheme.status === 'Completed' ? 'status-completed' : 'status-upcoming'}`}>
                  {scheme.status}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#737373' }}>{scheme.category} · {scheme.department}</p>
              <p style={{ fontSize: '0.85rem', color: '#404040', marginTop: '0.5rem', lineHeight: '1.4' }}>{scheme.description}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                <span>💰 ₹{(scheme.budget/10000000).toFixed(1)}Cr</span>
                <span>👤 {scheme.beneficiaries.toLocaleString()}</span>
                <span>📅 {scheme.launchDate}</span>
                <span>🏛️ {scheme.district}</span>
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#737373' }}>
                  <span>Progress</span>
                  <span>{scheme.progress}%</span>
                </div>
                <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${scheme.progress}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ height: '100%', background: scheme.progress > 70 ? '#22c55e' : scheme.progress > 40 ? '#eab308' : '#ef4444', borderRadius: '9999px' }} 
                  />
                </div>
              </div>
              <button className="btn-outline" style={{ marginTop: '1rem', width: '100%', padding: '0.4rem', fontSize: '0.85rem' }}>View Details →</button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Schemes;