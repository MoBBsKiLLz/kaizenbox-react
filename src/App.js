import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import FacilityList from './components/FacilityList';
import FacilityForm from './components/FacilityForm';

const App = () => {
  // This logic should check if the user is authenticated. Here I am using localStorage for simplicity.
  const isAuthenticated = localStorage.getItem('authToken');

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Route: Checks if the user is authenticated */}
      <Route 
        path="/facilities" 
        element={isAuthenticated ? <FacilityList /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/" 
        element={isAuthenticated ? <LoginPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/facility-form" 
        element={isAuthenticated ? <FacilityForm /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/facilities/edit/:facilityId" 
        element={isAuthenticated ? <FacilityForm /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
