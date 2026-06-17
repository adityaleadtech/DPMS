import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import { canAccessPage } from './api/data';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Development from './pages/Development';
import Voters from './pages/Voters';
import Complaints from './pages/Complaints';
import Meetings from './pages/Meetings';
import Schemes from './pages/Schemes';
import News from './pages/News';
import Jansabha from './pages/Jansabha';
import JansabhaDetail from './pages/JansabhaDetail';
import Notifications from './pages/Notifications';
import Registration from './pages/Registration';
import Volunteers from './pages/Volunteers';
import Funding from './pages/Funding';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          
          {/* Routes with RBAC protection */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/development" 
            element={
              <ProtectedRoute>
                <Development />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/voters" 
            element={
              <ProtectedRoute>
                <Voters />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/complaints" 
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/meetings" 
            element={
              <ProtectedRoute>
                <Meetings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/schemes" 
            element={
              <ProtectedRoute>
                <Schemes />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/news" 
            element={
              <ProtectedRoute>
                <News />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jansabha" 
            element={
              <ProtectedRoute>
                <Jansabha />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/jansabha/:id" 
            element={
              <ProtectedRoute>
                <JansabhaDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/registration" 
            element={
              <ProtectedRoute>
                <Registration />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/volunteers" 
            element={
              <ProtectedRoute>
                <Volunteers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/funding" 
            element={
              <ProtectedRoute>
                <Funding />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;