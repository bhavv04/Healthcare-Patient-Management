import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { supabase } from './supabaseClient';
import Login from './login';
import Register from './Register'; 
import ForgotPassword from './ForgotPassword';
import UpdatePassword from './UpdatePassword';
import Dashboard from './Dashboard';
import Home from './Home';



function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes (login, logout, password recovery)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* Home route */}
        <Route 
          path="/" 
          element={
            session ? <Navigate to="/dashboard" /> : <Home />
          } 
        />
        
        {/* Login route */}
        <Route 
          path="/login" 
          element={
            !session ? <Login /> : <Navigate to="/dashboard" />
          } 
        />
        
        {/* Register route */}
        <Route 
          path="/register" 
          element={
            !session ? <Register /> : <Navigate to="/dashboard" />
          } 
        />
        
        {/* Forgot Password route */}
        <Route 
          path="/forgot-password" 
          element={
            !session ? <ForgotPassword /> : <Navigate to="/dashboard" />
          } 
        />
        
        {/* Update Password route */}
        <Route 
          path="/update-password" 
          element={<UpdatePassword />} 
        />
        
        {/* Dashboard route */}
        <Route 
          path="/dashboard" 
          element={
            session ? <Dashboard session={session} /> : <Navigate to="/login" />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;