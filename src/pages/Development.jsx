import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { DEVELOPMENT_PROJECTS } from '../api/data';
import { useAuth } from '../context/AuthContext';

const Development = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const statuses = ['All', 'Active', 'In Progress', 'Upcoming', 'Completed'];
  const districts = [...new Set(DEVELOPMENT_PROJECTS.map(p => p.district))];
  const constituencies = [...new Set(DEVELOPMENT_PROJECTS.map(p => p.constituency))];

  const filtered = DEVELOPMENT_PROJECTS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === 'All' || p.status === filterStatus) &&
    (filterDistrict === '' || p.district === filterDistrict) &&
    (filterConstituency === '' || p.constituency === filterConstituency)
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Development Projects</h2>
            <p style={{ color: '#737373' }}>Track and manage development projects across the state</p>
          </div>
          <button className="btn-primary">+ Create New Project</button>
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '150px' }}
          />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            {statuses.filter(s => s !== 'All').map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterDistrict} onChange={(e) => setFilterDistrict(e.target.value)}>
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={filterConstituency} onChange={(e) => setFilterConstituency(e.target.value)}>
            <option value="">All Constituencies</option>
            {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
              style={{ background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0', padding: '1.25rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <h4 style={{ fontWeight: '600', fontSize: '1rem', color: '#1a1a1a' }}>{project.name}</h4>
                <span className={`status-badge ${project.status === 'Active' ? 'status-active' : project.status === 'In Progress' ? 'status-scheduled' : project.status === 'Upcoming' ? 'status-upcoming' : 'status-completed'}`}>
                  {project.status}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#737373' }}>{project.category} · {project.department}</p>
              <p style={{ fontSize: '0.85rem', color: '#404040', marginTop: '0.5rem' }}>{project.description}</p>
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#737373' }}>
                <div>📍 {project.district} · {project.constituency}</div>
                <div>🏘️ {project.block} · {project.village}</div>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#737373' }}>
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8 }}
                    style={{ height: '100%', background: '#b91c1c', borderRadius: '9999px' }} 
                  />
                </div>
              </div>
              <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#404040' }}>
                <span>💰 ₹{(project.budget/10000000).toFixed(1)}Cr</span>
                <span>📅 {project.expectedCompletion}</span>
              </div>
              <button 
                onClick={() => { setSelectedProject(project); setShowModal(true); }}
                className="btn-outline" 
                style={{ marginTop: '1rem', width: '100%', padding: '0.4rem', fontSize: '0.8rem' }}
              >
                View Details →
              </button>
            </motion.div>
          ))}
        </div>

        {showModal && selectedProject && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-content"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>{selectedProject.name}</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: '#404040' }}>{selectedProject.description}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1rem', fontSize: '0.9rem' }}>
                  <div><strong>Status:</strong> {selectedProject.status}</div>
                  <div><strong>Progress:</strong> {selectedProject.progress}%</div>
                  <div><strong>Budget:</strong> ₹{(selectedProject.budget/10000000).toFixed(1)}Cr</div>
                  <div><strong>Allocated:</strong> ₹{(selectedProject.allocated/10000000).toFixed(1)}Cr</div>
                  <div><strong>Start Date:</strong> {selectedProject.startDate}</div>
                  <div><strong>Expected Completion:</strong> {selectedProject.expectedCompletion}</div>
                  <div><strong>District:</strong> {selectedProject.district}</div>
                  <div><strong>Constituency:</strong> {selectedProject.constituency}</div>
                  <div><strong>Block:</strong> {selectedProject.block}</div>
                  <div><strong>Village:</strong> {selectedProject.village}</div>
                </div>
              </div>

              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Milestones</h4>
              {selectedProject.milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0', borderBottom: '1px solid #f5f5f5' }}>
                  <span>{m.completed ? '✅' : '⏳'}</span>
                  <span style={{ flex: 1 }}>{m.name}</span>
                  <span style={{ fontSize: '0.8rem', color: '#737373' }}>{m.date}</span>
                </div>
              ))}

              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <button className="btn-primary">📝 Update Progress</button>
                <button className="btn-outline">📊 View Report</button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </LayoutWrapper>
  );
};

export default Development;