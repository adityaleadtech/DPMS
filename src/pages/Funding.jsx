import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Search, Filter, Plus, XCircle, Users, MapPin, IndianRupee, Eye } from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { FUNDING } from '../api/data';
import { canAccessPage } from '../api/data';
import { useAuth } from '../context/AuthContext';

const Funding = () => {
  const { user, isPM, isCM, isMinister } = useAuth();
  const canManageFunding = isPM || isCM || isMinister;
  
  const [search, setSearch] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');
  const [selectedFund, setSelectedFund] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Check if user can access funding
  if (!canAccessPage(user, 'funding')) {
    return (
      <LayoutWrapper>
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem', 
          background: 'white', 
          borderRadius: '0.75rem', 
          border: '1px solid #f0f0f0' 
        }}>
          <Wallet size={48} color="#737373" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#b91c1c', marginTop: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#737373' }}>You don't have permission to view funding.</p>
          <p style={{ color: '#737373', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Please contact your administrator for access.
          </p>
        </div>
      </LayoutWrapper>
    );
  }

  const districts = [...new Set(FUNDING.map(f => f.district))];
  const constituencies = filterDistrict ? [...new Set(FUNDING.filter(f => f.district === filterDistrict).map(f => f.constituency))] : [];

  const filtered = FUNDING.filter(f => 
    f.projectName.toLowerCase().includes(search.toLowerCase()) &&
    (filterDistrict === '' || f.district === filterDistrict) &&
    (filterConstituency === '' || f.constituency === filterConstituency)
  );

  const [newFund, setNewFund] = useState({
    projectName: '',
    district: '',
    constituency: '',
    block: '',
    amount: '',
    source: 'State Budget',
    department: 'PWD'
  });

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Funding Management</h2>
            <p style={{ color: '#737373' }}>Track fund allocation and voter contributions</p>
          </div>
          {canManageFunding && (
            <button className="btn-primary" onClick={() => setShowCreateModal(true)}>+ Create Fund</button>
          )}
        </div>

        <div className="filter-group">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '0.5rem 1rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
          />
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
                <th>Project</th>
                <th>District</th>
                <th>Constituency</th>
                <th>Allocated</th>
                <th>Utilized</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((fund, i) => (
                <motion.tr
                  key={fund.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.01 }}
                >
                  <td><strong>{fund.projectName}</strong></td>
                  <td>{fund.district}</td>
                  <td>{fund.constituency}</td>
                  <td>₹{(fund.allocated/100000).toFixed(1)}L</td>
                  <td>₹{(fund.utilized/100000).toFixed(1)}L</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '60px', height: '6px', background: '#f0f0f0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${fund.utilization}%`, height: '100%', background: fund.utilization > 70 ? '#22c55e' : fund.utilization > 40 ? '#eab308' : '#ef4444', borderRadius: '9999px' }} />
                      </div>
                      <span style={{ fontSize: '0.7rem', fontWeight: '600' }}>{fund.utilization}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${fund.status === 'Active' ? 'status-active' : fund.status === 'Completed' ? 'status-completed' : fund.status === 'Approved' ? 'status-scheduled' : 'status-pending'}`}>
                      {fund.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn-outline btn-sm" 
                      onClick={() => { setSelectedFund(fund); setShowModal(true); }}
                    >
                      View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Fund Details Modal */}
        {showModal && selectedFund && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>{selectedFund.projectName}</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <div><strong>District:</strong> {selectedFund.district}</div>
                <div><strong>Constituency:</strong> {selectedFund.constituency}</div>
                <div><strong>Block:</strong> {selectedFund.block}</div>
                <div><strong>Department:</strong> {selectedFund.department}</div>
                <div><strong>Source:</strong> {selectedFund.source}</div>
                <div><strong>Status:</strong> {selectedFund.status}</div>
                <div><strong>Allocated:</strong> ₹{(selectedFund.allocated/100000).toFixed(1)}L</div>
                <div><strong>Utilized:</strong> ₹{(selectedFund.utilized/100000).toFixed(1)}L</div>
              </div>

              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Voter Contributions</h4>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Voter ID</th>
                      <th>Name</th>
                      <th>Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFund.voterContributions.map((vc, i) => (
                      <tr key={i}>
                        <td>{vc.voterId}</td>
                        <td>{vc.name}</td>
                        <td>₹{vc.amount.toLocaleString()}</td>
                        <td>{vc.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}

        {/* Create Fund Modal */}
        {showCreateModal && canManageFunding && (
          <div className="modal-overlay">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>Create New Fund</h3>
                <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Project Name</label>
                  <input
                    type="text"
                    value={newFund.projectName}
                    onChange={(e) => setNewFund({...newFund, projectName: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem' }}
                    placeholder="Enter project name"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>District</label>
                  <select
                    value={newFund.district}
                    onChange={(e) => setNewFund({...newFund, district: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem' }}
                  >
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Constituency</label>
                  <select
                    value={newFund.constituency}
                    onChange={(e) => setNewFund({...newFund, constituency: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem' }}
                    disabled={!newFund.district}
                  >
                    <option value="">Select Constituency</option>
                    {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Amount (₹)</label>
                  <input
                    type="number"
                    value={newFund.amount}
                    onChange={(e) => setNewFund({...newFund, amount: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem' }}
                    placeholder="Enter amount"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Source</label>
                  <select
                    value={newFund.source}
                    onChange={(e) => setNewFund({...newFund, source: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem' }}
                  >
                    <option value="State Budget">State Budget</option>
                    <option value="Central Share">Central Share</option>
                    <option value="PPP Model">PPP Model</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>Department</label>
                  <select
                    value={newFund.department}
                    onChange={(e) => setNewFund({...newFund, department: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem' }}
                  >
                    <option value="PWD">PWD</option>
                    <option value="Urban">Urban</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Tribal">Tribal</option>
                    <option value="Industries">Industries</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                <button className="btn-primary" style={{ flex: 1 }}>Create Fund</button>
                <button className="btn-outline" onClick={() => setShowCreateModal(false)}>Cancel</button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </LayoutWrapper>
  );
};

export default Funding;