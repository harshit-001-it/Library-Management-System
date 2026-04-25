import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPortal from './pages/AuthPortal';
import StudentDashboard from './pages/StudentDashboard';
import LibrarianDashboard from './pages/LibrarianDashboard';
import BackgroundCanvas from './components/BackgroundCanvas';
import './styles/DesignSystem.css';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c1324] text-primary">
      <div className="neural-pulse scale-150" />
    </div>
  );

  if (!user) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'admin' || user?.role === 'staff') {
    return <Navigate to="/librarian" />;
  }
  return <Navigate to="/student" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <BackgroundCanvas />
        <Routes>
          <Route path="/login" element={<AuthPortal />} />
          
          <Route 
            path="/student" 
            element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentDashboard />
              </PrivateRoute>
            } 
          />
          
          <Route 
            path="/librarian" 
            element={
              <PrivateRoute allowedRoles={['admin', 'staff']}>
                <LibrarianDashboard />
              </PrivateRoute>
            } 
          />

          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardRedirect />
              </PrivateRoute>
            } 
          />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
