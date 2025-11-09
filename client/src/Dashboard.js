import { useState } from 'react';
import { supabase } from './supabaseClient';

// We pass the session in as a prop from App.js
function Dashboard({ session }) {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // THIS IS YOUR "handleSubmit" LOGIC FROM THE OLD App.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setResponse('Sending...');
      const res = await fetch('http://127.0.0.1:5000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to add patient');
      }
      setResponse(`Patient "${name}" was recorded with ID: ${data.id}`);
      setName('');
    } catch (error) {
      console.error('Error:', error);
      setResponse(error.message);
    }
    setLoading(false);
  };

  return (
    <> {/* This is called a Fragment */}
      <p>Welcome, {session.user.email}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter patient's full name"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Patient"}
        </button>
      </form>
      {response && <p>{response}</p>}

      <button 
        style={{marginTop: "20px"}} 
        onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
    </>
  );
}

export default Dashboard;