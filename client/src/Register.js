import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './styles/register.css';

function Register() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    // --- Client-side validation ---
    if (password !== confirmPassword) {
      setMessage("Error: Passwords do not match.");
      setMessageType('error');
      return;
    }
    
    setLoading(true);

    // --- Supabase auth.signUp() call ---
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName 
        }
      }
    });

    if (error) {
      setMessage(`Registration failed: ${error.message}`);
      setMessageType('error');
    } else {
      setMessage('Registration successful! Please check your email to confirm your account.');
      setMessageType('success');
      // Optionally redirect to login after a delay
      setTimeout(() => navigate('/login'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <div className="logo">
          {/* Simple inline SVG for the heart icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0007 21.3512C11.459 21.1205 10.9607 20.817 10.5172 20.449C4.71794 15.378 1.66699 12.3364 1.66699 8.50001C1.66699 5.25001 4.16699 2.75 7.41699 2.75C9.42072 2.75 11.1682 3.81182 12.0007 5.34149C12.8331 3.81182 14.5806 2.75 16.5843 2.75C19.8343 2.75 22.3343 5.25001 22.3343 8.50001C22.3343 12.3364 19.2834 15.378 13.4841 20.449C13.0406 20.817 12.5424 21.1205 12.0007 21.3512Z" fill="white"/>
          </svg>
        </div>
        <h1>HealthCare<br/>Portal</h1>
        <p>Join our healthcare management system for secure patient monitoring</p>
        
        <div className="feature-list">
          <div className="feature-item">Real-time vital monitoring</div>
          <div className="feature-item">HIPAA-compliant encryption</div>
          <div className="feature-item">24/7 emergency alerts</div>
          <div className="feature-item">Comprehensive patient records</div>
        </div>
      </header>

      <main className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Start monitoring patient health today</p>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {message && <p className={`form-message ${messageType}`}>{message}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <Link to="/login" className="login-link">
          Already have an account? Sign In
        </Link>
      </main>

      <footer className="register-footer">
        <p>Secured by HIPAA-compliant encryption</p>
      </footer>
    </div>
  );
}

export default Register;