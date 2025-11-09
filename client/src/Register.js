import { useState } from 'react';
import { supabase } from './supabaseClient'; // Import our client

// Pass `showLogin` as a prop so we can switch back
function Register({ showLogin }) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    // --- Client-side validation ---
    if (password !== confirmPassword) {
      setMessage("Error: Passwords do not match.");
      return;
    }
    
    setLoading(true);

    // --- Supabase auth.signUp() call ---
    // This is the "Registration" use case 
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // We can store the 'full_name' in the user's metadata
        data: {
          full_name: fullName 
        }
      }
    });

    if (error) {
      setMessage(`Registration failed: ${error.message}`);
    } else {
      setMessage('Registration successful! Please check your email to confirm your account.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Register New User</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Your Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        /><br/>
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br/>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        /><br/>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p>{message}</p>}
      
      <a href="#" onClick={(e) => { e.preventDefault(); showLogin(); }}>
        Already have an account? Login
      </a>
    </div>
  );
}

export default Register;