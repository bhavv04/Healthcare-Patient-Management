import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import './styles/updatePassword.css';

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setSession(session); // User is now in a temporary session
      }
    });
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType('error');
      return;
    }

    if (!session) {
      setMessage("Invalid or expired password reset link.");
      setMessageType('error');
      return;
    }

    setLoading(true);

    // Update the password for the temporarily logged-in user
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setMessage(error.message);
      setMessageType('error');
    } else {
      setMessage('Password updated successfully! Redirecting to login...');
      setMessageType('success');
      // Log the user out of the temporary session
      await supabase.auth.signOut();
      // Send them to the login page after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="update-password-container">
      <div className="update-password-header">
        <div className="logo">
          <Heart size={32} strokeWidth={2.5} />
        </div>
        <h1>HealthCare<br/>Portal</h1>
        <p>Secure password reset for your healthcare account</p>
        <div className="feature-list">
          <div className="feature-item">Strong password encryption</div>
          <div className="feature-item">HIPAA-compliant security</div>
          <div className="feature-item">Instant account protection</div>
          <div className="feature-item">Secure session management</div>
        </div>
      </div>

      <div className="update-password-card">
        <h2>Update Your Password</h2>
        <p className="subtitle">Choose a strong password to protect your account</p>
        
        {message && <p className={`form-message ${messageType}`}>{message}</p>}
        
        <form onSubmit={handleUpdatePassword}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>

      <div className="update-password-footer">
        <p>256-bit encrypted connection</p>
      </div>
    </div>
  );
}

export default UpdatePassword;