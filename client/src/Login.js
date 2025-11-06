import { useState } from 'react';
import { supabase } from './supabaseClient';

// Pass `showRegister` as a prop
function Login({ showRegister }) { // <--- MODIFIED
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
      setMessage('Logged in! The page will refresh.');
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
      
      {/* --- THIS IS THE NEW LINK --- */}
      <a href="#" onClick={(e) => { e.preventDefault(); showRegister(); }}>
        Don't have an account? Register
      </a>
    </div>
  );
}

export default Login;