import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { JANSABHA } from '../api/data';

const Jansabha = () => {
  const navigate = useNavigate();

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Jan Sabha (Public Meetings)</h2>
            <p style={{ color: '#737373' }}>Upcoming public meetings and agenda</p>
          </div>
          <button className="btn-primary">+ Schedule New</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {JANSABHA.map((meeting, i) => (
            <motion.div
              key={meeting.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0', overflow: 'hidden' }}
            >
              <div style={{ height: '160px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
                <img src={meeting.image} alt={meeting.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: meeting.status === 'Upcoming' ? '#fef3c7' : '#dcfce7', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: '600', color: meeting.status === 'Upcoming' ? '#92400e' : '#166534' }}>
                  {meeting.status}
                </div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a' }}>{meeting.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#737373' }}>📅 {meeting.date} at {meeting.time}</p>
                <p style={{ fontSize: '0.85rem', color: '#737373' }}>📍 {meeting.venue}</p>
                <p style={{ fontSize: '0.85rem', color: '#404040', marginTop: '0.5rem' }}>{meeting.purpose}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {meeting.agenda.map((item) => (
                    <span key={item.id} style={{ fontSize: '0.65rem', background: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '9999px', color: '#404040' }}>
                      {item.title}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => navigate(`/jansabha/${meeting.id}`)}
                  style={{ marginTop: '1rem', width: '100%', padding: '0.5rem', background: '#b91c1c', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontWeight: '500' }}
                  onMouseEnter={(e) => e.target.style.background = '#991b1b'}
                  onMouseLeave={(e) => e.target.style.background = '#b91c1c'}
                >
                  View Full Agenda →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Jansabha;