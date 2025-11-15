import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
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

    if (password !== confirmPassword) {
      setMessage("Error: Passwords do not match.");
      return;
    }

    if (!session) {
      setMessage("Error: Invalid or expired password reset link.");
      return;
    }

    setLoading(true);

    // Update the password for the temporarily logged-in user
    const { error } = await supabase.auth.updateUser({
      password: password
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Password updated successfully! Redirecting to login...');
      // Log the user out of the temporary session
      await supabase.auth.signOut();
      // Send them to the login page after 3 seconds
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Update Your Password</h2>
      <form onSubmit={handleUpdatePassword}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br/>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdatePassword;