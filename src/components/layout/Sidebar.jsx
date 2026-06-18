import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { canAccessPage } from '../../api/data';

const Sidebar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const allMenuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/development', icon: '🏗️', label: 'Development' },
    { path: '/mla-led-fund', icon: '💵', label: 'MLA LAD Fund' },
    { path: '/voters', icon: '👥', label: 'Voter List' },
    { path: '/complaints', icon: '⚠️', label: 'Complaints' },
    { path: '/meetings', icon: '📅', label: 'Meetings' },
    { path: '/schemes', icon: '🏛️', label: 'Schemes' },
    { path: '/news', icon: '📰', label: 'News' },
    { path: '/jansabha', icon: '🎤', label: 'Jan Sabha' },
    { path: '/notifications', icon: '🔔', label: 'Notifications' },
    { path: '/registration', icon: '📝', label: 'Registration' },
    { path: '/volunteers', icon: '🤝', label: 'Volunteers' },
    { path: '/funding', icon: '💰', label: 'Funding' },
     // Added MLA LED Fund
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter(item => {
    const page = item.path.replace('/', '');
    return canAccessPage(user, page);
  });

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: '260px',
        background: 'white',
        borderRight: '1px solid #fecaca',
        boxShadow: '2px 0 12px rgba(185, 28, 28, 0.08)',
        zIndex: 50,
        overflowY: 'auto'
      }}
    >
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #fef2f2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: '#b91c1c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.125rem'
          }}>
            DP
          </div>
          <div>
            <h2 style={{ fontWeight: 'bold', fontSize: '1rem', color: '#1a1a1a' }}>DPMS</h2>
            <p style={{ fontSize: '0.7rem', color: '#b91c1c', fontWeight: '600' }}>
              {user?.role || 'Dashboard'}
            </p>
          </div>
        </div>
        {user && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#737373' }}>
            👤 {user.name}
          </div>
        )}
      </div>

      <nav style={{ padding: '0.75rem' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.7rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.3s',
                background: isActive ? '#b91c1c' : 'transparent',
                color: isActive ? 'white' : '#4a4a4a',
                marginBottom: '0.15rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = '#fef2f2';
                  e.currentTarget.style.color = '#b91c1c';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#4a4a4a';
                }
              }}
            >
              <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '500' }}>{item.label}</span>
            </Link>
          );
        })}

        <button
          onClick={logout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.7rem 1rem',
            borderRadius: '0.5rem',
            border: 'none',
            background: 'transparent',
            color: '#b91c1c',
            cursor: 'pointer',
            width: '100%',
            marginTop: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: '500',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span style={{ fontSize: '1.125rem' }}>🚪</span>
          <span>Logout</span>
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;