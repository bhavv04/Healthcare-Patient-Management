import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { supabase } from './supabaseClient';
import Login from './login';
import Register from './Register'; 
import ForgotPassword from './forgotPassword';
import UpdatePassword from './UpdatePassword'; // Import the new page
import Dashboard from './Dashboard'; // Import the dashboard



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
  }, []); // Run only once on app load

  // --- Main Render Logic ---
  // We now use <Routes> instead of "if (session)"
  return (
    <div className="App">
      <h1>Patient Monitoring System</h1>
      <Routes>
        <Route 
          path="/" 
          element={
            // If no session, show the AuthPage.
            // If there is a session, automatically send to /dashboard
            !session ? <AuthPage /> : <Navigate to="/dashboard" />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            // If there is a session, show the Dashboard.
            // If no session, send back to the login page
            session ? <Dashboard session={session} /> : <Navigate to="/" />
          } 
        />
        <Route 
          path="/update-password" 
          element={<UpdatePassword />} 
        />
      </Routes>
    </div>
  );
}

// --- NEW HELPER COMPONENT ---
// This component now holds all the logic for switching
// between Login, Register, and ForgotPassword.
function AuthPage() {
  const [view, setView] = useState('login');

  if (view === 'login') {
    return <Login 
              showRegister={() => setView('register')} 
              showForgotPassword={() => setView('forgotPassword')} 
           />;
  }
  if (view === 'register') {
    return <Register 
              showLogin={() => setView('login')} 
           />;
  }
  // This will show if view is 'forgotPassword'
  return <ForgotPassword 
            showLogin={() => setView('login')} 
         />;
}

export default App;