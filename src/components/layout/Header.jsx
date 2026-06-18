import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user } = useAuth();

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #fecaca',
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a1a1a' }}>
          नमस्ते, <span style={{ color: '#b91c1c' }}>{user?.name} </span>  जी
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#737373' }}>
          {user?.role} · {user?.region} {user?.department && `· ${user.department}`}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: '1.25rem', cursor: 'pointer' }}>🔔</span>
          <span style={{
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            width: '18px',
            height: '18px',
            background: '#b91c1c',
            color: 'white',
            fontSize: '0.625rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            5
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid #e5e5e5' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: '#b91c1c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.875rem'
          }}>
            {user?.name?.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;