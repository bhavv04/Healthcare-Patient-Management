import { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import Login from './login';
import Register from './Register'; // <--- IMPORT REGISTER

function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // --- NEW STATE TO MANAGE LOGIN/REGISTER VIEW ---
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    // ... (This function is the same as before, no changes)
    e.preventDefault();
    setLoading(true);
    if (!session) {
      setResponse('Error: You must be logged in to add a patient.');
      setLoading(false);
      return;
    }
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


  // 1. If user is logged in, show the app
  if (session) {
    return (
      <div className="App">
        <h1>Patient Monitoring System</h1>
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
      </div>
    );
  }

  // 2. If user is NOT logged in, show EITHER Login or Register
  return (
    <div className="App">
      <h1>Patient Monitoring System</h1>
      { showLogin ? (
          <Login showRegister={() => setShowLogin(false)} />
        ) : (
          <Register showLogin={() => setShowLogin(true)} />
        )
      }
    </div>
  );
}

export default App;