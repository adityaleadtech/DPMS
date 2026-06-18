import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Search, 
  XCircle, 
  Users, 
  MapPin, 
  IndianRupee,
  Download,
  Printer,
  User,
  Calendar,
  FileText,
  Filter,
  Eye
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { FUNDING } from '../api/data';
import { canAccessPage } from '../api/data';
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

// Contributor Detail Modal
const ContributorDetailModal = ({ contributor, onClose }) => {
  if (!contributor) return null;

  return (
    <div className="modal-overlay" style={{ zIndex: 2000 }}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-content"
        style={{ maxWidth: '500px', padding: '2rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={22} color="#b91c1c" /> Contributor Details
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#737373' }}>Voter contribution information</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}>×</button>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '0.75rem',
          marginBottom: '1rem',
          padding: '1rem',
          background: '#fafafa',
          borderRadius: '0.75rem',
          border: '1px solid #f0f0f0'
        }}>
          <div><strong>Name:</strong> {contributor.name}</div>
          <div><strong>Voter ID:</strong> {contributor.voterId}</div>
          <div><strong>Amount:</strong> <span style={{ color: '#b91c1c', fontWeight: 'bold' }}>₹{contributor.amount.toLocaleString()}</span></div>
          <div><strong>Date:</strong> {contributor.date}</div>
          <div><strong>District:</strong> {contributor.district}</div>
          <div><strong>Constituency:</strong> {contributor.constituency}</div>
          <div><strong>Block:</strong> {contributor.block}</div>
          <div><strong>Project:</strong> {contributor.projectName}</div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid #f0f0f0', paddingTop: '1rem' }}>
          <button className="btn-primary" style={{ flex: 1 }} onClick={onClose}>Close</button>
          <button className="btn-outline" style={{ flex: 1 }}>Print Details</button>
        </div>
      </motion.div>
    </div>
  );
};

const Funding = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('Chhattisgarh');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedAssembly, setSelectedAssembly] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedPanchayat, setSelectedPanchayat] = useState('');
  const [selectedBooth, setSelectedBooth] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedContributor, setSelectedContributor] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
        </div>
      </LayoutWrapper>
    );
  }

  // Extract all contributors from all funding records
  const allContributors = [];
  FUNDING.forEach(fund => {
    if (fund.voterContributions && fund.voterContributions.length > 0) {
      fund.voterContributions.forEach(vc => {
        allContributors.push({
          ...vc,
          state: fund.state || 'Chhattisgarh',
          district: fund.district,
          constituency: fund.constituency,
          block: fund.block,
          panchayat: fund.panchayat || 'Not Specified',
          pollingBooth: fund.pollingBooth || 'Not Specified',
          village: fund.village || 'Not Specified',
          projectName: fund.projectName,
          fundSource: fund.source,
          fundStatus: fund.status
        });
      });
    }
  });

  // Get unique values for filters using hierarchy
  const states = getStates();
  
  const getFilteredDistricts = (state) => {
    if (!state) return [];
    const allDistricts = getDistricts(state);
    return allDistricts.filter(d => allContributors.some(c => c.state === state && c.district === d));
  };
  
  const getFilteredConstituencies = (state, district) => {
    if (!state || !district) return [];
    const allConstituencies = getAssemblyConstituencies(state, district);
    return allConstituencies.filter(c => allContributors.some(contrib => contrib.state === state && contrib.district === district && contrib.constituency === c));
  };
  
  const getFilteredBlocks = (state, district, constituency) => {
    if (!state || !district || !constituency) return [];
    const allBlocks = getBlocks(state, district, constituency);
    return allBlocks.filter(b => allContributors.some(c => c.state === state && c.district === district && c.constituency === constituency && c.block === b));
  };
  
  const getFilteredPanchayats = (state, district, constituency, block) => {
    if (!state || !district || !constituency || !block) return [];
    const allPanchayats = getPanchayats(state, district, constituency, block);
    return allPanchayats.filter(p => allContributors.some(c => c.state === state && c.district === district && c.constituency === constituency && c.block === block && c.panchayat === p));
  };
  
  const getFilteredBooths = (state, district, constituency, block, panchayat) => {
    if (!state || !district || !constituency || !block || !panchayat) return [];
    const allBooths = getPollingBooths(state, district, constituency, block, panchayat);
    return allBooths.filter(b => allContributors.some(c => c.state === state && c.district === district && c.constituency === constituency && c.block === block && c.panchayat === panchayat && c.pollingBooth === b));
  };
  
  const getFilteredVillages = (state, district, constituency, block, panchayat, booth) => {
    if (!state || !district || !constituency || !block || !panchayat || !booth) return [];
    const allVillages = getVillages(state, district, constituency, block, panchayat, booth);
    return allVillages.filter(v => allContributors.some(c => c.state === state && c.district === district && c.constituency === constituency && c.block === block && c.panchayat === panchayat && c.pollingBooth === booth && c.village === v));
  };

  const districts = getFilteredDistricts(selectedState);
  const constituencies = getFilteredConstituencies(selectedState, selectedDistrict);
  const blocks = getFilteredBlocks(selectedState, selectedDistrict, selectedAssembly);
  const panchayats = getFilteredPanchayats(selectedState, selectedDistrict, selectedAssembly, selectedBlock);
  const booths = getFilteredBooths(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat);
  const villages = getFilteredVillages(selectedState, selectedDistrict, selectedAssembly, selectedBlock, selectedPanchayat, selectedBooth);

  // Filter contributors
  const filteredContributors = allContributors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.voterId.toLowerCase().includes(search.toLowerCase());
    const matchesState = selectedState === '' || c.state === selectedState;
    const matchesDistrict = selectedDistrict === '' || c.district === selectedDistrict;
    const matchesConstituency = selectedAssembly === '' || c.constituency === selectedAssembly;
    const matchesBlock = selectedBlock === '' || c.block === selectedBlock;
    const matchesPanchayat = selectedPanchayat === '' || c.panchayat === selectedPanchayat;
    const matchesBooth = selectedBooth === '' || c.pollingBooth === selectedBooth;
    const matchesVillage = selectedVillage === '' || c.village === selectedVillage;
    
    return matchesSearch && matchesState && matchesDistrict && matchesConstituency && 
           matchesBlock && matchesPanchayat && matchesBooth && matchesVillage;
  });

  // Sort by amount (highest first)
  const sortedContributors = [...filteredContributors].sort((a, b) => b.amount - a.amount);

  // Stats
  const totalContributors = allContributors.length;
  const totalAmount = allContributors.reduce((sum, c) => sum + c.amount, 0);
  const avgAmount = totalContributors > 0 ? Math.round(totalAmount / totalContributors) : 0;

  const clearFilters = () => {
    setSearch('');
    setSelectedState('Chhattisgarh');
    setSelectedDistrict('');
    setSelectedAssembly('');
    setSelectedBlock('');
    setSelectedPanchayat('');
    setSelectedBooth('');
    setSelectedVillage('');
  };

  const hasActiveFilters = search || selectedState !== 'Chhattisgarh' || selectedDistrict || selectedAssembly || 
                           selectedBlock || selectedPanchayat || selectedBooth || selectedVillage;

  // Export CSV
  const exportCSV = () => {
    const headers = ['S.No', 'Voter ID', 'Name', 'Amount', 'Date', 'State', 'District', 'Constituency', 'Block', 'Panchayat', 'Polling Booth', 'Village', 'Project'];
    const rows = sortedContributors.map((c, i) => [
      i + 1,
      c.voterId,
      c.name,
      c.amount,
      c.date,
      c.state,
      c.district,
      c.constituency,
      c.block,
      c.panchayat || 'N/A',
      c.pollingBooth || 'N/A',
      c.village || 'N/A',
      c.projectName
    ]);

    let csvContent = '\uFEFF';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      const escapedRow = row.map(field => {
        if (typeof field === 'string' && (field.includes(',') || field.includes('"') || field.includes('\n'))) {
          return `"${field.replace(/"/g, '""')}"`;
        }
        return field;
      });
      csvContent += escapedRow.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `contributors_list_${new Date().toISOString().split('T')[0]}.csv`);
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
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={24} color="#b91c1c" /> Contributors List
            </h2>
            <p style={{ color: '#737373' }}>View all voters who have contributed to development projects</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-outline" onClick={exportCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={18} /> Export CSV
            </button>
            <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Printer size={18} /> Print
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Total Contributors</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>{totalContributors}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Unique voters</div>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Total Contribution</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#b91c1c' }}>₹{(totalAmount / 100000).toFixed(1)}L</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Overall collected</div>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Average Contribution</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f59e0b' }}>₹{avgAmount.toLocaleString()}</div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Per contributor</div>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#737373' }}>Highest Contribution</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#22c55e' }}>
              ₹{allContributors.length > 0 ? Math.max(...allContributors.map(c => c.amount)).toLocaleString() : 0}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#737373' }}>Top donor amount</div>
          </div>
        </div>

        {/* Filters - Now with Hierarchy */}
        <div style={{ 
          background: 'white',
          padding: '1rem',
          borderRadius: '0.75rem',
          border: '1px solid #f0f0f0',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fafafa', border: '1px solid #e5e5e5', borderRadius: '0.5rem', padding: '0 0.75rem' }}>
              <Search size={16} color="#737373" />
              <input
                type="text"
                placeholder="Search by name or voter ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ flex: 1, padding: '0.4rem 0', border: 'none', outline: 'none', fontSize: '0.85rem', background: 'transparent' }}
              />
              {search && <XCircle size={14} color="#737373" style={{ cursor: 'pointer' }} onClick={() => setSearch('')} />}
            </div>

            {hasActiveFilters && (
              <button onClick={clearFilters} className="btn-outline btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.6rem' }}>
                <XCircle size={14} /> Clear All
              </button>
            )}
          </div>

          {/* Hierarchy Filters */}
          <div style={{ 
            display: 'flex', 
            gap: '0.3rem', 
            flexWrap: 'wrap',
            alignItems: 'center',
            padding: '0.2rem 0',
            borderTop: '1px solid #f5f5f5'
          }}>
            <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.7rem' }}>
              <MapPin size={12} style={{ display: 'inline', marginRight: '0.2rem' }} />
              Location:
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '100px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Constituencies</option>
              {constituencies.map(c => <option key={c} value={c}>{c}</option>)}
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '100px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
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
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Booths</option>
              {booths.map(b => <option key={b} value={b}>{b}</option>)}
            </select>

            <select 
              value={selectedVillage} 
              onChange={(e) => setSelectedVillage(e.target.value)} 
              disabled={!selectedBooth}
              style={{ minWidth: '90px', padding: '0.2rem 0.4rem', fontSize: '0.7rem', border: '1px solid #e5e5e5', borderRadius: '0.4rem', background: 'white' }}
            >
              <option value="">All Villages</option>
              {villages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>

          {/* Filter Summary */}
          {hasActiveFilters && (
            <div style={{ 
              display: 'flex', 
              gap: '0.3rem', 
              flexWrap: 'wrap',
              paddingTop: '0.3rem',
              borderTop: '1px solid #f5f5f5',
              fontSize: '0.7rem'
            }}>
              <span style={{ fontWeight: '600', color: '#404040' }}>Active Filters:</span>
              {search && <span className="status-badge status-active" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>🔍 {search}</span>}
              {selectedState && selectedState !== 'Chhattisgarh' && <span className="status-badge status-active" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>📍 {selectedState}</span>}
              {selectedDistrict && <span className="status-badge status-scheduled" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>📍 {selectedDistrict}</span>}
              {selectedAssembly && <span className="status-badge status-completed" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem' }}>🏛️ {selectedAssembly}</span>}
              {selectedBlock && <span className="status-badge" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', background: '#dbeafe', color: '#1e40af' }}>📋 {selectedBlock}</span>}
              {selectedPanchayat && <span className="status-badge" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', background: '#fef3c7', color: '#92400e' }}>🏘️ {selectedPanchayat}</span>}
              {selectedBooth && <span className="status-badge" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', background: '#f0fdf4', color: '#166534' }}>🗳️ {selectedBooth}</span>}
              {selectedVillage && <span className="status-badge" style={{ fontSize: '0.55rem', padding: '0.1rem 0.4rem', background: '#fce4ec', color: '#c62828' }}>🏡 {selectedVillage}</span>}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#737373' }}>
            Showing {sortedContributors.length} of {allContributors.length} contributors
          </p>
        </div>

        {/* Contributors Table */}
        <div style={{ 
          overflow: 'auto',
          border: '1px solid #f0f0f0',
          borderRadius: '0.75rem',
          background: 'white'
        }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            fontSize: '0.85rem'
          }}>
            <thead style={{ background: '#fafafa' }}>
              <tr>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>#</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Voter ID</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Name</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Amount</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Date</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>State</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>District</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Constituency</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Block</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Project</th>
                <th style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: '600', color: '#404040', borderBottom: '2px solid #f0f0f0' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedContributors.map((contributor, i) => (
                <motion.tr
                  key={`${contributor.voterId}-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.005 }}
                  style={{ borderBottom: '1px solid #f5f5f5' }}
                >
                  <td style={{ padding: '0.6rem 1rem', color: '#737373' }}>{i + 1}</td>
                  <td style={{ padding: '0.6rem 1rem', fontFamily: 'monospace', fontSize: '0.75rem' }}>{contributor.voterId}</td>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: '500' }}>{contributor.name}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'right', fontWeight: '600', color: '#b91c1c' }}>
                    ₹{contributor.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', color: '#737373' }}>{contributor.date}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>
                    <span style={{ 
                      padding: '0.15rem 0.5rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.65rem', 
                      fontWeight: '500',
                      background: contributor.state === 'Chhattisgarh' ? '#fef3c7' : '#dbeafe',
                      color: contributor.state === 'Chhattisgarh' ? '#92400e' : '#1e40af'
                    }}>
                      {contributor.state}
                    </span>
                  </td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>{contributor.district}</td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>{contributor.constituency}</td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>{contributor.block}</td>
                  <td style={{ padding: '0.6rem 1rem', fontSize: '0.75rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {contributor.projectName}
                  </td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center' }}>
                    <button 
                      className="btn-outline btn-sm" 
                      onClick={() => { setSelectedContributor(contributor); setShowModal(true); }}
                      style={{ padding: '0.2rem 0.6rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.3rem', margin: '0 auto' }}
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedContributors.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: '0.75rem', border: '1px solid #f0f0f0' }}>
            <Users size={48} color="#737373" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a1a1a' }}>No contributors found</h3>
            <p style={{ color: '#737373', marginTop: '0.25rem' }}>Try adjusting your filters</p>
          </div>
        )}

        {/* Contributor Detail Modal */}
        <ContributorDetailModal 
          contributor={selectedContributor}
          onClose={() => { setShowModal(false); setSelectedContributor(null); }}
        />
      </motion.div>
    </LayoutWrapper>
  );
};

export default Funding;