import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { NEWS } from '../api/data';

const News = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...new Set(NEWS.map(n => n.category))];
  const filtered = NEWS.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) &&
    (filterCategory === 'All' || n.category === filterCategory)
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>News & Updates</h2>
            <p style={{ color: '#737373' }}>Latest news from Chhattisgarh</p>
          </div>
          <button className="btn-primary">+ Add News</button>
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -4 }}
              style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0', overflow: 'hidden' }}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
                <img src={news.image} alt={news.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(185,28,28,0.9)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '600' }}>
                  {news.category}
                </div>
                {news.importance === 'High' && (
                  <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#ef4444', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '600' }}>
                    🔴 High
                  </div>
                )}
              </div>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#737373' }}>{news.source}</span>
                  <span style={{ fontSize: '0.75rem', color: '#737373' }}>{news.publishDate}</span>
                </div>
                <h4 style={{ fontWeight: '600', fontSize: '0.95rem', color: '#1a1a1a' }}>{news.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#737373', marginTop: '0.5rem', lineHeight: '1.4' }}>{news.summary}</p>
                <button className="btn-outline" style={{ marginTop: '1rem', padding: '0.3rem 1rem', fontSize: '0.8rem' }}>Read More →</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};

export default News;