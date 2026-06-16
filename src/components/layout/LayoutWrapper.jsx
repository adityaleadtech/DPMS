import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const LayoutWrapper = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fcf7f5' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '260px' }}>
        <Header />
        <main style={{ padding: '1.5rem 2rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;