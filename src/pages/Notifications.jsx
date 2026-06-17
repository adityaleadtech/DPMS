import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Filter, 
  Plus, 
  XCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Eye,
  Trash2,
  Check,
  Users,
  MapPin
} from 'lucide-react';
import LayoutWrapper from '../components/layout/LayoutWrapper';
import { NOTIFICATIONS, USERS } from '../api/data';
import { useAuth } from '../context/AuthContext';
import { 
  getStates,
  getDistricts,
  getAssemblyConstituencies
} from '../api/data';

const Notifications = () => {
  const { user, isPM, isCM, isMinister } = useAuth();
  const [filterType, setFilterType] = useState('All');
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterRead, setFilterRead] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  // New notification form state
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'Info',
    district: '',
    constituency: '',
    priority: 'Medium'
  });

  // Check if user can create notifications for all
  const canCreateForAll = isPM || isCM;
  const canCreateForOwn = isMinister || isMP || isMLA;

  // Get user's region for filtering
  const getUserRegion = () => {
    if (isPM) return 'India';
    if (isCM) return 'Chhattisgarh';
    if (isMinister) return user?.region || 'Chhattisgarh';
    if (isMP) return user?.region || 'Raipur';
    if (isMLA) return user?.region || 'Raipur City South';
    return 'Chhattisgarh';
  };

  // Get available districts based on user role
  const getAvailableDistricts = () => {
    if (isPM) return ['All Districts', 'Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'];
    if (isCM) return ['All Districts', 'Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'];
    if (isMinister) return ['All Districts', 'Raipur', 'Bilaspur', 'Durg'];
    if (isMP) return ['All Districts', 'Raipur'];
    if (isMLA) return ['All Districts', 'Raipur'];
    return ['Raipur'];
  };

  // Get available constituencies based on user role
  const getAvailableConstituencies = (district) => {
    if (isPM || isCM) {
      const allConstituencies = ['Raipur City South', 'Raipur City North', 'Bilaspur', 'Durg City', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari'];
      return district === 'All Districts' ? ['All Constituencies', ...allConstituencies] : allConstituencies;
    }
    if (isMinister) {
      return ['All Constituencies', 'Raipur City South', 'Raipur City North'];
    }
    if (isMP) {
      return ['All Constituencies', 'Raipur City South', 'Raipur City North'];
    }
    if (isMLA) {
      return ['All Constituencies', 'Raipur City South'];
    }
    return ['All Constituencies'];
  };

  const types = ['All', 'Info', 'Success', 'Warning', 'Alert', 'Critical'];
  const readStatuses = ['All', 'Read', 'Unread'];
  const districts = ['All Districts', 'Raipur', 'Bilaspur', 'Durg', 'Raigarh', 'Jagdalpur', 'Korba', 'Rajnandgaon', 'Ambikapur', 'Dhamtari', 'Mahasamund'];

  // Filter notifications
  const filtered = notifications.filter(n => {
    let match = true;
    if (filterType !== 'All' && n.type !== filterType) match = false;
    if (filterDistrict !== 'All Districts' && filterDistrict !== '' && n.district !== filterDistrict) match = false;
    if (filterRead === 'Read' && !n.read) match = false;
    if (filterRead === 'Unread' && n.read) match = false;
    return match;
  });

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Delete notification (only for PM/CM)
  const deleteNotification = (id) => {
    if (isPM || isCM) {
      setNotifications(notifications.filter(n => n.id !== id));
    }
  };

  // Create notification
  const createNotification = () => {
    const newNotif = {
      id: `NOTIF${String(700 + notifications.length + 1).padStart(4, '0')}`,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      date: new Date().toISOString().split('T')[0],
      read: false,
      district: newNotification.district === 'All Districts' ? 'All Districts' : newNotification.district,
      constituency: newNotification.constituency === 'All Constituencies' ? 'All' : newNotification.constituency,
      createdBy: user?.name,
      createdByRole: user?.role,
      priority: newNotification.priority
    };
    
    setNotifications([newNotif, ...notifications]);
    setShowCreateModal(false);
    setNewNotification({
      title: '',
      message: '',
      type: 'Info',
      district: '',
      constituency: '',
      priority: 'Medium'
    });
  };

  // Get type icon
  const getTypeIcon = (type) => {
    const icons = {
      'Info': <Info size={16} color="#3b82f6" />,
      'Success': <CheckCircle size={16} color="#22c55e" />,
      'Warning': <AlertTriangle size={16} color="#f59e0b" />,
      'Alert': <AlertCircle size={16} color="#ef4444" />,
      'Critical': <AlertCircle size={16} color="#dc2626" />
    };
    return icons[type] || <Info size={16} color="#737373" />;
  };

  // Get type color
  const getTypeColor = (type) => {
    const colors = {
      'Info': '#dbeafe',
      'Success': '#dcfce7',
      'Warning': '#fef3c7',
      'Alert': '#fee2e2',
      'Critical': '#fecaca'
    };
    return colors[type] || '#f0f0f0';
  };

  const getTypeTextColor = (type) => {
    const colors = {
      'Info': '#1e40af',
      'Success': '#166534',
      'Warning': '#92400e',
      'Alert': '#991b1b',
      'Critical': '#7f1d1d'
    };
    return colors[type] || '#737373';
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
              <Bell size={24} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Notifications
            </h2>
            <p style={{ color: '#737373' }}>
              All system notifications · {notifications.filter(n => !n.read).length} unread
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(isPM || isCM || isMinister || isMP || isMLA) && (
              <button 
                className="btn-primary" 
                onClick={() => setShowCreateModal(true)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <Plus size={18} /> Create Notification
              </button>
            )}
            <button 
              className="btn-outline" 
              onClick={markAllAsRead}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <Check size={16} /> Mark All Read
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="filter-group" style={{ flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '600', color: '#404040', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Filter size={16} /> Filters:
          </span>
          
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white', outline: 'none', minWidth: '120px' }}
          >
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select 
            value={filterDistrict} 
            onChange={(e) => setFilterDistrict(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white', outline: 'none', minWidth: '140px' }}
          >
            <option value="">All Districts</option>
            {districts.filter(d => d !== 'All Districts').map(d => <option key={d} value={d}>{d}</option>)}
          </select>

          <select 
            value={filterRead} 
            onChange={(e) => setFilterRead(e.target.value)}
            style={{ padding: '0.4rem 0.8rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white', outline: 'none', minWidth: '120px' }}
          >
            {readStatuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Filter Summary */}
        {(filterType !== 'All' || filterDistrict || filterRead !== 'All') && (
          <div style={{ 
            marginBottom: '1rem', 
            padding: '0.4rem 1rem', 
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
            {filterType !== 'All' && <span className="status-badge status-active">{filterType}</span>}
            {filterDistrict && <span className="status-badge status-scheduled">{filterDistrict}</span>}
            {filterRead !== 'All' && <span className="status-badge status-completed">{filterRead}</span>}
            <span style={{ marginLeft: 'auto', color: '#737373' }}>
              {filtered.length} notifications
            </span>
          </div>
        )}

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filtered.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.02 }}
              style={{ 
                background: n.read ? 'white' : '#fef2f2', 
                padding: '1rem 1.25rem', 
                borderRadius: '0.75rem', 
                border: `1px solid ${n.read ? '#f0f0f0' : '#fecaca'}`,
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              whileHover={{ boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
              onClick={() => { setSelectedNotification(n); setShowDetailModal(true); }}
            >
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ 
                    padding: '0.15rem 0.6rem', 
                    borderRadius: '9999px', 
                    fontSize: '0.6rem', 
                    fontWeight: '600',
                    background: getTypeColor(n.type),
                    color: getTypeTextColor(n.type),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    {getTypeIcon(n.type)} {n.type}
                  </span>
                  <h4 style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.9rem' }}>
                    {n.title}
                  </h4>
                  {!n.read && (
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: '#b91c1c',
                      display: 'inline-block'
                    }} />
                  )}
                  {n.priority === 'High' && (
                    <span style={{ 
                      fontSize: '0.55rem', 
                      background: '#fee2e2', 
                      color: '#991b1b',
                      padding: '0.1rem 0.4rem',
                      borderRadius: '9999px',
                      fontWeight: '600'
                    }}>
                      High Priority
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.85rem', color: '#737373', marginTop: '0.25rem' }}>
                  {n.message}
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#a3a3a3', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                  <span>📅 {n.date}</span>
                  <span>📍 {n.district} · {n.constituency}</span>
                  {n.createdBy && (
                    <span>✏️ By: {n.createdBy} ({n.createdByRole})</span>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {!n.read && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                    className="btn-outline btn-sm"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                  >
                    Mark Read
                  </button>
                )}
                {(isPM || isCM) && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }}
                    className="btn-danger btn-sm"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.7rem' }}
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            background: 'white',
            borderRadius: '0.75rem',
            border: '1px solid #f0f0f0'
          }}>
            <Bell size={48} color="#737373" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1a1a1a' }}>No notifications found</h3>
            <p style={{ color: '#737373', marginTop: '0.25rem' }}>
              {filterType !== 'All' || filterDistrict || filterRead !== 'All' 
                ? 'Try adjusting your filters' 
                : 'All caught up! No new notifications'}
            </p>
          </div>
        )}

        {/* Create Notification Modal */}
        {showCreateModal && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-content"
              style={{ maxWidth: '600px' }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'start', 
                marginBottom: '1.5rem',
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '1rem'
              }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>
                    <Bell size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                    Create Notification
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#737373' }}>
                    {canCreateForAll 
                      ? 'You can send notifications to all districts' 
                      : `You can send notifications to your region: ${getUserRegion()}`}
                  </p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(false)} 
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}
                >
                  ×
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                    Title <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    placeholder="Enter notification title"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                    Message <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <textarea
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    placeholder="Enter notification message"
                    rows="3"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                    Type
                  </label>
                  <select
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({...newNotification, type: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
                  >
                    <option value="Info">Info</option>
                    <option value="Success">Success</option>
                    <option value="Warning">Warning</option>
                    <option value="Alert">Alert</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                    Priority
                  </label>
                  <select
                    value={newNotification.priority}
                    onChange={(e) => setNewNotification({...newNotification, priority: e.target.value})}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                {canCreateForAll ? (
                  // PM/CM can choose any district and constituency
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                        District
                      </label>
                      <select
                        value={newNotification.district}
                        onChange={(e) => setNewNotification({...newNotification, district: e.target.value})}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
                      >
                        <option value="All Districts">All Districts</option>
                        {districts.filter(d => d !== 'All Districts').map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                        Constituency
                      </label>
                      <select
                        value={newNotification.constituency}
                        onChange={(e) => setNewNotification({...newNotification, constituency: e.target.value})}
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: 'white' }}
                      >
                        <option value="All Constituencies">All Constituencies</option>
                        <option value="Raipur City South">Raipur City South</option>
                        <option value="Raipur City North">Raipur City North</option>
                        <option value="Bilaspur">Bilaspur</option>
                        <option value="Durg City">Durg City</option>
                        <option value="Raigarh">Raigarh</option>
                        <option value="Jagdalpur">Jagdalpur</option>
                        <option value="Korba">Korba</option>
                        <option value="Rajnandgaon">Rajnandgaon</option>
                        <option value="Ambikapur">Ambikapur</option>
                        <option value="Dhamtari">Dhamtari</option>
                      </select>
                    </div>
                  </>
                ) : (
                  // Ministers/MP/MLA can only send to their region
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                        District <span style={{ fontSize: '0.7rem', color: '#737373' }}>(Your Region)</span>
                      </label>
                      <input
                        type="text"
                        value={getUserRegion()}
                        disabled
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: '#f5f5f5', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>
                        Constituency <span style={{ fontSize: '0.7rem', color: '#737373' }}>(Your Constituency)</span>
                      </label>
                      <input
                        type="text"
                        value={user?.region || 'Raipur City South'}
                        disabled
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #e5e5e5', borderRadius: '0.5rem', background: '#f5f5f5', outline: 'none' }}
                      />
                    </div>
                  </>
                )}
              </div>

              <div style={{ 
                marginTop: '1.5rem', 
                display: 'flex', 
                gap: '1rem',
                borderTop: '1px solid #f0f0f0',
                paddingTop: '1rem'
              }}>
                <button 
                  className="btn-primary" 
                  onClick={createNotification}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <Bell size={18} /> Send Notification
                </button>
                <button 
                  className="btn-outline" 
                  onClick={() => setShowCreateModal(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Notification Detail Modal */}
        {showDetailModal && selectedNotification && (
          <div className="modal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="modal-content"
              style={{ maxWidth: '500px' }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'start', 
                marginBottom: '1rem',
                borderBottom: '1px solid #f0f0f0',
                paddingBottom: '1rem'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ 
                      padding: '0.15rem 0.6rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.6rem', 
                      fontWeight: '600',
                      background: getTypeColor(selectedNotification.type),
                      color: getTypeTextColor(selectedNotification.type)
                    }}>
                      {selectedNotification.type}
                    </span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1a1a1a' }}>
                      {selectedNotification.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setShowDetailModal(false)} 
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#737373' }}
                >
                  ×
                </button>
              </div>

              <p style={{ color: '#404040', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                {selectedNotification.message}
              </p>

              <div style={{ 
                background: '#fafafa', 
                padding: '1rem', 
                borderRadius: '0.5rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.85rem'
              }}>
                <div><strong>Date:</strong> {selectedNotification.date}</div>
                <div><strong>District:</strong> {selectedNotification.district}</div>
                <div><strong>Constituency:</strong> {selectedNotification.constituency}</div>
                <div><strong>Status:</strong> {selectedNotification.read ? 'Read' : 'Unread'}</div>
                {selectedNotification.createdBy && (
                  <div style={{ gridColumn: '1 / -1' }}>
                    <strong>Created By:</strong> {selectedNotification.createdBy} ({selectedNotification.createdByRole})
                  </div>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                {!selectedNotification.read && (
                  <button 
                    className="btn-primary" 
                    onClick={() => { markAsRead(selectedNotification.id); setShowDetailModal(false); }}
                    style={{ flex: 1 }}
                  >
                    Mark as Read
                  </button>
                )}
                <button className="btn-outline" onClick={() => setShowDetailModal(false)} style={{ flex: 1 }}>
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </LayoutWrapper>
  );
};

export default Notifications;