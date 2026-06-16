import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { JANSABHA } from '../api/data';

const JansabhaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = JANSABHA.find(m => m.id === id);

  if (!meeting) {
    return (
      <LayoutWrapper>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h2>Meeting not found</h2>
          <button className="btn-primary" onClick={() => navigate('/jansabha')}>Go Back</button>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button onClick={() => navigate('/jansabha')} style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: '500' }}>
          ← Back to Jan Sabha
        </button>

        <div style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0', overflow: 'hidden' }}>
          <div style={{ height: '200px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
            <img src={meeting.image} alt={meeting.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>{meeting.title}</h2>
                  <p style={{ color: '#e5e5e5' }}>{meeting.purpose}</p>
                </div>
                <span style={{ padding: '0.4rem 1.2rem', borderRadius: '9999px', background: meeting.status === 'Upcoming' ? '#fef3c7' : '#dcfce7', color: meeting.status === 'Upcoming' ? '#92400e' : '#166534', fontWeight: '600', fontSize: '0.8rem' }}>
                  {meeting.status}
                </span>
              </div>
            </div>
          </div>

          <div style={{ padding: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: '#fafafa', borderRadius: '0.5rem' }}>
              <div><strong>📅 Date:</strong> {meeting.date}</div>
              <div><strong>⏰ Time:</strong> {meeting.time}</div>
              <div><strong>📍 Venue:</strong> {meeting.venue}</div>
              <div><strong>🏛️ District:</strong> {meeting.district}</div>
              <div><strong>🗳️ Constituency:</strong> {meeting.constituency}</div>
              <div><strong>🏘️ Block:</strong> {meeting.block}</div>
            </div>

            <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#1a1a1a' }}>
              📋 Agenda Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {meeting.agenda.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ padding: '1.25rem', border: '1px solid #f0f0f0', borderRadius: '0.5rem', background: index % 2 === 0 ? 'white' : '#fafafa' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#1a1a1a' }}>{index + 1}. {item.title}</h4>
                    <span style={{ fontSize: '0.75rem', color: '#737373', background: '#f0f0f0', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>⏱ {item.duration}</span>
                  </div>
                  <p style={{ color: '#404040', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '0.5rem' }}>{item.details}</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#737373' }}>
                    <span><strong>Responsible:</strong> {item.responsible}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
              <button className="btn-primary">📝 Add Minutes</button>
              <button className="btn-outline">📊 Update Status</button>
            </div>
          </div>
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};

export default JansabhaDetail;