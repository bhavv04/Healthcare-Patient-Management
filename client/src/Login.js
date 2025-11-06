import { useState } from 'react';
import { supabase } from './supabaseClient'; // Import our client

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // This is the Supabase auth call
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(`Login failed: ${error.message}`);
    } else {
      setMessage('Logged in! The page will refresh.');
      // The onAuthStateChange in App.js will detect this and show the app
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
        
        {/* --- THIS IS THE CORRECTED PART --- */}
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {/* --- END OF CORRECTIONS --- */}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;