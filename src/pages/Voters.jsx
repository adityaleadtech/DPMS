import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { VOTERS } from '../api/data';
import { useAuth } from '../context/AuthContext';

const Voters = () => {
  const { isUser } = useAuth();
  const [search, setSearch] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterConstituency, setFilterConstituency] = useState('');
  const [filterBlock, setFilterBlock] = useState('');
  const [filterPanchayat, setFilterPanchayat] = useState('');
  const [filterBooth, setFilterBooth] = useState('');
  const [filterVillage, setFilterVillage] = useState('');
  const [filterCaste, setFilterCaste] = useState('');
  const [filterGender, setFilterGender] = useState('');

  if (isUser) {
    return (
      <LayoutWrapper>
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
          <span style={{ fontSize: '3rem' }}>🔒</span>
          <h2 style={{ fontSize: '1.5rem', color: '#b91c1c', marginTop: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#737373' }}>You don't have permission to view the voters list.</p>
        </div>
      </LayoutWrapper>
    );
  }

  // Get unique values for filters
  const states = [...new Set(VOTERS.map(v => v.state))].sort();
  const districts = filterState ? [...new Set(VOTERS.filter(v => v.state === filterState).map(v => v.district))].sort() : [];
  const constituencies = filterDistrict ? [...new Set(VOTERS.filter(v => v.district === filterDistrict).map(v => v.constituency))].sort() : [];
  const blocks = filterConstituency ? [...new Set(VOTERS.filter(v => v.constituency === filterConstituency).map(v => v.block))].sort() : [];
  const panchayats = filterBlock ? [...new Set(VOTERS.filter(v => v.block === filterBlock).map(v => v.panchayat))].sort() : [];
  const booths = filterPanchayat ? [...new Set(VOTERS.filter(v => v.panchayat === filterPanchayat).map(v => v.pollingBooth))].sort() : [];
  const villages = filterBooth ? [...new Set(VOTERS.filter(v => v.pollingBooth === filterBooth).map(v => v.village))].sort() : [];
  const castes = [...new Set(VOTERS.map(v => v.caste))].sort();
  const genders = ['Male', 'Female', 'Other'];

  const filtered = VOTERS.filter(v => 
    v.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterState === '' || v.state === filterState) &&
    (filterDistrict === '' || v.district === filterDistrict) &&
    (filterConstituency === '' || v.constituency === filterConstituency) &&
    (filterBlock === '' || v.block === filterBlock) &&
    (filterPanchayat === '' || v.panchayat === filterPanchayat) &&
    (filterBooth === '' || v.pollingBooth === filterBooth) &&
    (filterVillage === '' || v.village === filterVillage) &&
    (filterCaste === '' || v.caste === filterCaste) &&
    (filterGender === '' || v.gender === filterGender)
  );

  // Clear all filters
  const clearFilters = () => {
    setFilterState('');
    setFilterDistrict('');
    setFilterConstituency('');
    setFilterBlock('');
    setFilterPanchayat('');
    setFilterBooth('');
    setFilterVillage('');
    setFilterCaste('');
    setFilterGender('');
    setSearch('');
  };

  const hasActiveFilters = filterState || filterDistrict || filterConstituency || filterBlock || filterPanchayat || filterBooth || filterVillage || filterCaste || filterGender || search;

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>Voter List</h2>
          <p style={{ color: '#737373' }}>
            Complete voter database with hierarchy filters · {VOTERS.length.toLocaleString()} total voters across {states.length} states
          </p>
        </div>

        {/* Search */}
        <div className="filter-group">
          <input
            type="text"
            placeholder="🔍 Search voters by name, voter ID, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '200px', padding: '0.6rem 1rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', fontSize: '0.9rem' }}
          />
          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn-outline btn-sm">
              Clear All Filters
            </button>
          )}
        </div>

        {/* Hierarchy Filters */}
        <div className="filter-group" style={{ flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.85rem', marginRight: '0.25rem' }}>📍 Location:</span>
          
          <select 
            value={filterState} 
            onChange={(e) => { 
              setFilterState(e.target.value); 
              setFilterDistrict(''); 
              setFilterConstituency(''); 
              setFilterBlock(''); 
              setFilterPanchayat(''); 
              setFilterBooth(''); 
              setFilterVillage('');
            }}
            style={{ minWidth: '140px' }}
          >
            <option value="">All States</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            value={filterDistrict} 
            onChange={(e) => { 
              setFilterDistrict(e.target.value); 
              setFilterConstituency(''); 
              setFilterBlock(''); 
              setFilterPanchayat(''); 
              setFilterBooth(''); 
              setFilterVillage('');
            }} 
            disabled={!filterState}
            style={{ minWidth: '140px' }}
          >
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select 
            value={filterConstituency} 
            onChange={(e) => { 
              setFilterConstituency(e.target.value); 
              setFilterBlock(''); 
              setFilterPanchayat(''); 
              setFilterBooth(''); 
              setFilterVillage('');
            }} 
            disabled={!filterDistrict}
            style={{ minWidth: '140px' }}
          >
            <option value="">All Constituencies</option>
            {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select 
            value={filterBlock} 
            onChange={(e) => { 
              setFilterBlock(e.target.value); 
              setFilterPanchayat(''); 
              setFilterBooth(''); 
              setFilterVillage('');
            }} 
            disabled={!filterConstituency}
            style={{ minWidth: '140px' }}
          >
            <option value="">All Blocks</option>
            {blocks.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={filterPanchayat} 
            onChange={(e) => { 
              setFilterPanchayat(e.target.value); 
              setFilterBooth(''); 
              setFilterVillage('');
            }} 
            disabled={!filterBlock}
            style={{ minWidth: '140px' }}
          >
            <option value="">All Panchayats</option>
            {panchayats.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select 
            value={filterBooth} 
            onChange={(e) => { 
              setFilterBooth(e.target.value); 
              setFilterVillage('');
            }} 
            disabled={!filterPanchayat}
            style={{ minWidth: '140px' }}
          >
            <option value="">All Polling Booths</option>
            {booths.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            value={filterVillage} 
            onChange={(e) => setFilterVillage(e.target.value)} 
            disabled={!filterBooth}
            style={{ minWidth: '140px' }}
          >
            <option value="">All Villages</option>
            {villages.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        {/* Demographics Filters */}
        <div className="filter-group">
          <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.85rem', marginRight: '0.25rem' }}>👤 Demographics:</span>
          <select value={filterCaste} onChange={(e) => setFilterCaste(e.target.value)} style={{ minWidth: '120px' }}>
            <option value="">All Castes</option>
            {castes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)} style={{ minWidth: '120px' }}>
            <option value="">All Genders</option>
            {genders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        {/* Results Count */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            Showing {filtered.length} of {VOTERS.length} voters
            {filterState && ` in ${filterState}`}
            {filterDistrict && ` · ${filterDistrict}`}
            {filterConstituency && ` · ${filterConstituency}`}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-outline btn-sm">📥 Export CSV</button>
            <button className="btn-primary btn-sm">+ Add Voter</button>
          </div>
        </div>

        {/* Voter Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Voter ID</th>
                <th>State</th>
                <th>District</th>
                <th>Constituency</th>
                <th>Block</th>
                <th>Panchayat</th>
                <th>Booth</th>
                <th>Village</th>
                <th>House</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Caste</th>
                <th>Relation</th>
                <th>Phone</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((voter, i) => (
                <motion.tr
                  key={voter.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.002 }}
                >
                  <td style={{ fontSize: '0.75rem', color: '#737373' }}>{i + 1}</td>
                  <td><strong>{voter.name}</strong></td>
                  <td style={{ fontSize: '0.75rem' }}>{voter.voterId}</td>
                  <td><span style={{ 
                    padding: '0.15rem 0.5rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.6rem', 
                    fontWeight: '600',
                    background: voter.state === 'Chhattisgarh' ? '#fef3c7' : '#dbeafe',
                    color: voter.state === 'Chhattisgarh' ? '#92400e' : '#1e40af'
                  }}>{voter.state}</span></td>
                  <td>{voter.district}</td>
                  <td style={{ fontSize: '0.8rem' }}>{voter.constituency}</td>
                  <td style={{ fontSize: '0.8rem' }}>{voter.block}</td>
                  <td style={{ fontSize: '0.8rem' }}>{voter.panchayat}</td>
                  <td style={{ fontSize: '0.75rem' }}>{voter.pollingBooth}</td>
                  <td style={{ fontSize: '0.8rem' }}>{voter.village}</td>
                  <td>{voter.houseNumber}</td>
                  <td>{voter.age}</td>
                  <td>{voter.gender}</td>
                  <td>{voter.caste}</td>
                  <td style={{ fontSize: '0.75rem' }}>
                    {voter.relationName}<br/>
                    <span style={{ fontSize: '0.6rem', color: '#737373' }}>({voter.relationType})</span>
                  </td>
                  <td style={{ fontSize: '0.75rem' }}>{voter.phoneNumber}</td>
                  <td style={{ fontSize: '0.7rem' }}>{voter.email}</td>
                  <td style={{ fontSize: '0.7rem' }}>{voter.dateOfBirth}</td>
                  <td>
                    <span className={`status-badge ${voter.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                      {voter.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#737373' }}>
          Showing {Math.min(filtered.length, 50)} of {filtered.length} voters
          {filtered.length > 50 && ' · Scroll to see more'}
        </p>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Voters;