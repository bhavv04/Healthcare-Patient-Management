import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { Heart } from 'lucide-react';
import './styles/forgotPassword.css';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // This is the URL your user will be sent to
      // after they click the link in their email.
      redirectTo: 'http://localhost:3000/update-password',
    });

    if (error) {
      setMessage(error.message);
      setMessageType('error');
    } else {
      setMessage('Password reset link sent! Please check your email.');
      setMessageType('success');
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-header">
        <div className="logo">
          <Heart size={32} strokeWidth={2.5} />
        </div>
        <h1>HealthCare<br/>Portal</h1>
        <p>Secure password recovery for your healthcare account</p>
        <div className="feature-list">
          <div className="feature-item">Secure email verification</div>
          <div className="feature-item">Encrypted reset links</div>
          <div className="feature-item">Quick account recovery</div>
          <div className="feature-item">24/7 support available</div>
        </div>
      </div>

      <div className="forgot-password-card">
        <h2>Forgot Password?</h2>
        <p className="subtitle">Enter your email to receive a password reset link</p>
        
        {message && <p className={`form-message ${messageType}`}>{message}</p>}
        
        <form onSubmit={handleReset}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
          </button>
        </form>
        
        <Link to="/login" className="login-link">
          Remembered your password? Login
        </Link>
      </div>

      <div className="forgot-password-footer">
        <p>256-bit encrypted connection</p>
      </div>
    </div>
  );
}

export default ForgotPassword;