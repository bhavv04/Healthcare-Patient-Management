import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './styles/login.css';

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(''); // Pre-filled from design
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [portalType, setPortalType] = useState('administrator'); // 'patient' or 'administrator'
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (portalType === 'patient') {
      // Patient login with username only
      try {
        console.log('Attempting patient login with username:', email.trim());
        
        const { data, error } = await supabase
          .from('patients')
          .select('*')
          .eq('username', email.trim());

        console.log('Query response - data:', data);
        console.log('Query response - error:', error);

        if (error) {
          console.error('Database error:', error);
          setMessage(`Login failed: ${error.message}`);
          setLoading(false);
          return;
        }

        if (!data || data.length === 0) {
          console.log('No patient found with username:', email.trim());
          setMessage('Login failed: Invalid username. Please check your username and try again.');
          setLoading(false);
          return;
        }

        const patient = data[0];
        console.log('Patient found:', patient);

        // Store patient info in localStorage for patient dashboard
        localStorage.setItem('patientData', JSON.stringify(patient));
        localStorage.setItem('portalType', 'patient');
        
        setMessage('Logged in! Redirecting...');
        setTimeout(() => {
          navigate('/patient-dashboard');
        }, 1500);
        setLoading(false);
      } catch (err) {
        console.error('Caught exception:', err);
        setMessage(`Login failed: ${err.message}`);
        setLoading(false);
      }
    } else {
      // Administrator login with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setMessage(`Login failed: ${error.message}`);
        setLoading(false);
      } else {
        if (data.user) {
          localStorage.setItem('portalType', 'administrator');
        }
        
        setMessage('Logged in! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <div className="logo">
          {/* Simple inline SVG for the heart icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0007 21.3512C11.459 21.1205 10.9607 20.817 10.5172 20.449C4.71794 15.378 1.66699 12.3364 1.66699 8.50001C1.66699 5.25001 4.16699 2.75 7.41699 2.75C9.42072 2.75 11.1682 3.81182 12.0007 5.34149C12.8331 3.81182 14.5806 2.75 16.5843 2.75C19.8343 2.75 22.3343 5.25001 22.3343 8.50001C22.3343 12.3364 19.2834 15.378 13.4841 20.449C13.0406 20.817 12.5424 21.1205 12.0007 21.3512Z" fill="white"/>
          </svg>
        </div>
        <h1>HealthCare Portal</h1>
        <p>Secure access to patient management and real-time health monitoring</p>
        
        <div className="feature-list">
          <div className="feature-item">Real-time vital monitoring</div>
          <div className="feature-item">HIPAA-compliant encryption</div>
          <div className="feature-item">24/7 emergency alerts</div>
          <div className="feature-item">Comprehensive patient records</div>
        </div>
      </header>

      <main className="login-card">
        <h2>Sign In</h2>
        <p className="subtitle">Choose your portal to continue</p>

        <div className="portal-toggle">
          <button 
            className={`toggle-btn ${portalType === 'patient' ? 'active' : ''}`}
            type="button"
            onClick={() => setPortalType('patient')}
          >
            Patient
          </button>
          <button 
            className={`toggle-btn ${portalType === 'administrator' ? 'active' : ''}`}
            type="button"
            onClick={() => setPortalType('administrator')}
          >
            Administrator
          </button>
        </div>

        {/* This is your login form, now with the new styles */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">{portalType === 'patient' ? 'Username' : 'Email'}</label>
            <input
              type={portalType === 'patient' ? 'text' : 'email'}
              id="email"
              placeholder={portalType === 'patient' ? 'Enter your username' : 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          {portalType === 'administrator' && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* Your logic for the message is included here */}
          {message && <p className="form-message">{message}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : `Sign In as ${portalType === 'patient' ? 'Patient' : 'Administrator'}`}
          </button>
        </form>

        <Link to="/" className="homepage">
          Homepage
        </Link>        

        {/* Use React Router's <Link> for navigation */}
        <Link to="/forgot-password" className="forgot-password">
          Forgot Password?
        </Link>
        
        {portalType === 'administrator' ? (
          <Link to="/register" className="register-link">
            Don't have an account? Register
          </Link>
        ) : (
          <p className="register-link" style={{cursor: 'default', color: '#666'}}>
            Consult your doctor for username and password
          </p>
        )}
      </main>

      {/* This is the footer, now part of your React component */}
      <footer className="login-footer">
        <p>Secured by HIPAA-compliant encryption</p>
      </footer>
    </div>
  );
}

export default Login;