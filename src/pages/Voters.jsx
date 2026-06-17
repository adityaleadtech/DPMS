import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  XCircle,
  MapPin,
  Users,
  ChevronDown,
  FileSpreadsheet,
  Printer,
  Eye
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { VOTERS } from '../api/data';
import { useAuth } from '../context/AuthContext';
import { 
  getStates,
  getDistricts,
  getAssemblyConstituencies,
  getBlocks,
  getPanchayats,
  getPollingBooths,
  getVillages
} from '../api/data';

const Voters = () => {
  const { isUser } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [filterCaste, setFilterCaste] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  if (isUser) {
    return (
      <LayoutWrapper>
        <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
          <Users size={48} color="#737373" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: '#b91c1c', marginTop: '1rem' }}>Access Denied</h2>
          <p style={{ color: '#737373' }}>You don't have permission to view the voters list.</p>
        </div>
      </LayoutWrapper>
    );
  }

  // Get hierarchy options
  const states = getStates();
  const districts = getDistricts(selectedState);
  const assemblies = getAssemblyConstituencies(selectedState, selectedDistrict);
  const blocks = getBlocks(selectedState, selectedDistrict, selectedAssembly);
  const panchayats = getPanchayats(selectedState, selectedDistrict, selectedAssembly, selectedBlock);
  const booths = getPollingBooths(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat);
  const villages = getVillages(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat, selectedBooth);

  // Get unique values for other filters
  const castes = [...new Set(VOTERS.map(v => v.caste))].sort();
  const genders = ['Male', 'Female', 'Other'];
  const statuses = ['Active', 'Inactive'];

  // Filter voters based on all criteria
  const filteredVoters = VOTERS.filter(v => {
    let match = true;
    
    // Search filter (name, voter ID, phone)
    if (search) {
      const searchLower = search.toLowerCase();
      const nameMatch = v.name.toLowerCase().includes(searchLower);
      const idMatch = v.voterId.toLowerCase().includes(searchLower);
      const phoneMatch = v.phoneNumber.includes(search);
      if (!nameMatch && !idMatch && !phoneMatch) match = false;
    }
    
    // Hierarchy filters
    if (selectedState && v.state !== selectedState) match = false;
    if (selectedDistrict && v.district !== selectedDistrict) match = false;
    if (selectedAssembly && v.constituency !== selectedAssembly) match = false;
    if (selectedBlock && v.block !== selectedBlock) match = false;
    if (selectedPanchayat && v.panchayat !== selectedPanchayat) match = false;
    if (selectedBooth && v.pollingBooth !== selectedBooth) match = false;
    if (selectedVillage && v.village !== selectedVillage) match = false;
    
    // Demographics filters
    if (filterCaste && v.caste !== filterCaste) match = false;
    if (filterGender && v.gender !== filterGender) match = false;
    if (filterStatus && v.status !== filterStatus) match = false;
    
    return match;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearch('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedAssembly('');
    setSelectedBlock('');
    setSelectedPanchayat('');
    setSelectedBooth('');
    setSelectedVillage('');
    setFilterCaste('');
    setFilterGender('');
    setFilterStatus('');
  };

  const hasActiveFilters = search || selectedState || selectedDistrict || selectedAssembly || selectedBlock || selectedPanchayat || selectedBooth || selectedVillage || filterCaste || filterGender || filterStatus;

  // Export CSV function
  const exportCSV = () => {
    const headers = [
      'S.No', 'State', 'District', 'Name', 'Voter ID', 'Constituency', 
      'Block', 'Panchayat', 'Polling Booth', 'Village', 'House No', 
      'Age', 'Gender', 'Caste', 'Relation Name', 'Relation Type', 
      'Phone', 'Email', 'DOB', 'Status', 'Registration Date'
    ];
    
    const rows = filteredVoters.map((v, i) => [
      i + 1,
      v.state,
      v.district,
      v.name,
      v.voterId,
      v.constituency,
      v.block,
      v.panchayat,
      v.pollingBooth,
      v.village,
      v.houseNumber,
      v.age,
      v.gender,
      v.caste,
      v.relationName,
      v.relationType,
      v.phoneNumber,
      v.email,
      v.dateOfBirth,
      v.status,
      v.registeredDate
    ]);
    
    let csvContent = headers.join(',') + '\n';
    rows.forEach(row => {
      const escapedRow = row.map(field => {
        if (typeof field === 'string' && field.includes(',')) {
          return `"${field}"`;
        }
        return field;
      });
      csvContent += escapedRow.join(',') + '\n';
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `voters_list_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <LayoutWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div style={{ 
          marginBottom: '1.5rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>
              Voter List
            </h2>
            <p style={{ color: '#737373' }}>
              Complete voter database with hierarchy filters · {VOTERS.length.toLocaleString()} total voters
            </p>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ 
          background: 'white',
          padding: '1rem',
          borderRadius: '0.75rem',
          border: '1px solid #f0f0f0',
          marginBottom: '1rem'
        }}>
          {/* Search Bar */}
          <div style={{ 
            display: 'flex', 
            gap: '0.75rem', 
            flexWrap: 'wrap',
            marginBottom: '0.75rem'
          }}>
            <div style={{ 
              flex: 1, 
              minWidth: '250px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              background: '#fafafa', 
              border: '1px solid #e5e5e5', 
              borderRadius: '0.5rem', 
              padding: '0 0.75rem'
            }}>
              <Search size={18} color="#737373" />
              <input
                type="text"
                placeholder="Search voters by name, voter ID, or phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ 
                  flex: 1, 
                  padding: '0.6rem 0', 
                  border: 'none', 
                  outline: 'none', 
                  fontSize: '0.9rem',
                  background: 'transparent'
                }}
              />
              {search && (
                <XCircle 
                  size={16} 
                  color="#737373" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSearch('')}
                />
              )}
            </div>
            
            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <XCircle size={14} /> Clear All
              </button>
            )}
          </div>

          {/* Hierarchy Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderTop: '1px solid #f5f5f5'
          }}>
            <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <MapPin size={14} /> Location:
            </span>

            <select 
              value={selectedState} 
              onChange={(e) => { 
                setSelectedState(e.target.value); 
                setSelectedDistrict(''); 
                setSelectedAssembly(''); 
                setSelectedBlock(''); 
                setSelectedPanchayat(''); 
                setSelectedBooth(''); 
                setSelectedVillage('');
              }}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All States</option>
              {states.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select 
              value={selectedDistrict} 
              onChange={(e) => { 
                setSelectedDistrict(e.target.value); 
                setSelectedAssembly(''); 
                setSelectedBlock(''); 
                setSelectedPanchayat(''); 
                setSelectedBooth(''); 
                setSelectedVillage('');
              }} 
              disabled={!selectedState}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>

            <select 
              value={selectedAssembly} 
              onChange={(e) => { 
                setSelectedAssembly(e.target.value); 
                setSelectedBlock(''); 
                setSelectedPanchayat(''); 
                setSelectedBooth(''); 
                setSelectedVillage('');
              }} 
              disabled={!selectedDistrict}
              style={{ minWidth: '130px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Constituencies</option>
              {assemblies.map(a => <option key={a} value={a}>{a}</option>)}
            </select>

            <select 
              value={selectedBlock} 
              onChange={(e) => { 
                setSelectedBlock(e.target.value); 
                setSelectedPanchayat(''); 
                setSelectedBooth(''); 
                setSelectedVillage('');
              }} 
              disabled={!selectedAssembly}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Blocks</option>
              {blocks.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select 
              value={selectedPanchayat} 
              onChange={(e) => { 
                setSelectedPanchayat(e.target.value); 
                setSelectedBooth(''); 
                setSelectedVillage('');
              }} 
              disabled={!selectedBlock}
              style={{ minWidth: '130px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Panchayats</option>
              {panchayats.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select 
              value={selectedBooth} 
              onChange={(e) => { 
                setSelectedBooth(e.target.value); 
                setSelectedVillage('');
              }} 
              disabled={!selectedPanchayat}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Booths</option>
              {booths.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select 
              value={selectedVillage} 
              onChange={(e) => setSelectedVillage(e.target.value)} 
              disabled={!selectedBooth}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Villages</option>
              {villages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          {/* Demographics Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '0.5rem 0',
            borderTop: '1px solid #f5f5f5'
          }}>
            <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Users size={14} /> Demographics:
            </span>

            <select 
              value={filterCaste} 
              onChange={(e) => setFilterCaste(e.target.value)}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Castes</option>
              {castes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select 
              value={filterGender} 
              onChange={(e) => setFilterGender(e.target.value)}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Genders</option>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ minWidth: '120px', padding: '0.3rem 0.6rem', fontSize: '0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
            >
              <option value="">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '0.5rem 1rem', 
            background: '#fef2f2', 
            borderRadius: '0.5rem',
            border: '1px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            fontSize: '0.8rem'
          }}>
            <span style={{ fontWeight: '600', color: '#404040' }}>Active Filters:</span>
            {search && <span className="status-badge status-active">🔍 {search}</span>}
            {selectedState && <span className="status-badge status-active">{selectedState}</span>}
            {selectedDistrict && <span className="status-badge status-scheduled">{selectedDistrict}</span>}
            {selectedAssembly && <span className="status-badge status-completed">{selectedAssembly}</span>}
            {selectedBlock && <span className="status-badge status-upcoming">{selectedBlock}</span>}
            {selectedPanchayat && <span className="status-badge status-active">{selectedPanchayat}</span>}
            {selectedBooth && <span className="status-badge status-scheduled">{selectedBooth}</span>}
            {selectedVillage && <span className="status-badge status-completed">{selectedVillage}</span>}
            {filterCaste && <span className="status-badge status-active">{filterCaste}</span>}
            {filterGender && <span className="status-badge status-scheduled">{filterGender}</span>}
            {filterStatus && <span className="status-badge status-completed">{filterStatus}</span>}
          </div>
        )}

        {/* Actions and Results Count */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={exportCSV}
              className="btn-primary" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem',
                padding: '0.4rem 1rem',
                fontSize: '0.8rem'
              }}
            >
              <FileSpreadsheet size={16} /> Export CSV
            </button>
            <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
              <Printer size={16} /> Print
            </button>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1rem', fontSize: '0.8rem', background: '#22c55e' }}>
              <Plus size={16} /> Add Voter
            </button>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            Showing {filteredVoters.length} of {VOTERS.length} voters
          </p>
        </div>

        {/* Voter Table - State and District BEFORE Name */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th style={{ minWidth: '100px' }}>State</th>
                <th style={{ minWidth: '110px' }}>District</th>
                <th style={{ minWidth: '150px' }}>Name</th>
                <th style={{ minWidth: '130px' }}>Voter ID</th>
                <th style={{ minWidth: '130px' }}>Constituency</th>
                <th style={{ minWidth: '120px' }}>Block</th>
                <th style={{ minWidth: '130px' }}>Panchayat</th>
                <th style={{ minWidth: '100px' }}>Booth</th>
                <th style={{ minWidth: '100px' }}>Village</th>
                <th style={{ width: '70px' }}>House</th>
                <th style={{ width: '50px' }}>Age</th>
                <th style={{ width: '70px' }}>Gender</th>
                <th style={{ width: '80px' }}>Caste</th>
                <th style={{ minWidth: '100px' }}>Relation</th>
                <th style={{ minWidth: '120px' }}>Phone</th>
                <th style={{ minWidth: '150px' }}>Email</th>
                <th style={{ minWidth: '100px' }}>DOB</th>
                <th style={{ width: '80px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.slice(0, 50).map((voter, i) => (
                <motion.tr
                  key={voter.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.002 }}
                >
                  <td style={{ fontSize: '0.75rem', color: '#737373', textAlign: 'center' }}>{i + 1}</td>
                  <td>
                    <span style={{ 
                      padding: '0.15rem 0.4rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.6rem', 
                      fontWeight: '600',
                      background: voter.state === 'Chhattisgarh' ? '#fef3c7' : '#dbeafe',
                      color: voter.state === 'Chhattisgarh' ? '#92400e' : '#1e40af'
                    }}>
                      {voter.state}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.85rem', fontWeight: '500' }}>{voter.district}</td>
                  <td><strong>{voter.name}</strong></td>
                  <td style={{ fontSize: '0.75rem' }}>{voter.voterId}</td>
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
        
        {/* Pagination / Footer */}
        <div style={{ 
          marginTop: '1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            Showing {Math.min(filteredVoters.length, 50)} of {filteredVoters.length} voters
            {filteredVoters.length > 50 && ' · Scroll to see more'}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-outline btn-sm" disabled>Previous</button>
            <span style={{ padding: '0.3rem 0.8rem', background: '#b91c1c', color: 'white', borderRadius: '0.5rem', fontSize: '0.8rem' }}>1</span>
            <button className="btn-outline btn-sm">2</button>
            <button className="btn-outline btn-sm">3</button>
            <button className="btn-outline btn-sm">Next</button>
          </div>
        </div>
      </motion.div>
    </LayoutWrapper>
  );
};

export default Voters;