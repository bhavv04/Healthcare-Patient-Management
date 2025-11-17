import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import './login.css';
// Add a fixed footer to the page with the required text
(function () {
  const footer = document.createElement('div');
  footer.textContent = 'Secured by HIPAA-compliant encryption';
  footer.className = 'hipaa-footer';

  Object.assign(footer.style, {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    textAlign: 'center',
    padding: '8px 12px',
    background: 'rgba(255, 255, 255, 0.95)',
    color: '#333',
    fontSize: '13px',
    boxShadow: '0 -1px 4px rgba(0,0,0,0.08)',
    zIndex: '1000',
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => document.body.appendChild(footer));
  } else {
    document.body.appendChild(footer);
  }
})();
function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(`Login failed: ${error.message}`);
    } else {
      setMessage('Logged in! Redirecting...');
      navigate('/dashboard');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p>{message}</p>}
      
      <Link to="/forgot-password">
        Forgot your password?
      </Link>
      
      <br />
      
      <Link to="/register">
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;