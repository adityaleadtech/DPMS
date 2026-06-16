import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Minister');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password, role);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px -12px rgba(185, 28, 28, 0.2)',
          maxWidth: '420px',
          width: '100%',
          padding: '2.5rem',
          border: '1px solid #fecaca'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: '#b91c1c',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.5rem'
          }}>
            DP
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' }}>
            Development Monitoring
          </h1>
          <p style={{ color: '#737373', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Login to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#404040', marginBottom: '0.25rem' }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                border: '2px solid #e5e5e5',
                borderRadius: '0.5rem',
                outline: 'none',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
              onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
              placeholder="Enter username"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#404040', marginBottom: '0.25rem' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                border: '2px solid #e5e5e5',
                borderRadius: '0.5rem',
                outline: 'none',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#b91c1c'}
              onBlur={(e) => e.target.style.borderColor = '#e5e5e5'}
              placeholder="Enter password"
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#404040', marginBottom: '0.25rem' }}>
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                border: '2px solid #e5e5e5',
                borderRadius: '0.5rem',
                outline: 'none',
                fontSize: '1rem',
                background: 'white'
              }}
            >
              <option value="PM">Prime Minister</option>
              <option value="CM">Chief Minister</option>
              <option value="Minister">Minister</option>
              <option value="MP">Member of Parliament</option>
              <option value="MLA">Member of Legislative Assembly</option>
              <option value="USER">Citizen</option>
            </select>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#fef2f2',
                color: '#b91c1c',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #fecaca',
                fontSize: '0.875rem'
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#b91c1c',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.3s',
              marginTop: '0.5rem'
            }}
            onMouseEnter={(e) => e.target.style.background = '#991b1b'}
            onMouseLeave={(e) => e.target.style.background = '#b91c1c'}
          >
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#a3a3a3' }}>
          <p>Demo Credentials:</p>
          <p style={{ marginTop: '0.25rem' }}>
            <strong>Minister:</strong> Ram Vichar Netam / minister123
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;