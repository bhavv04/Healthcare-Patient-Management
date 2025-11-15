import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      // This is the URL your user will be sent to
      // after they click the link in their email.
      redirectTo: 'http://localhost:3000/update-password',
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('Password reset link sent! Please check your email.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email to receive a password reset link.</p>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p>{message}</p>}
      
      <Link to="/login">
        Remembered your password? Login
      </Link>
    </div>
  );
}

export default ForgotPassword;