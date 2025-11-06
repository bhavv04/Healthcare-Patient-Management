import { useState, useEffect } from 'react'; // Added useEffect
import './App.css';
import { supabase } from './supabaseClient'; // Import our client
import Login from './Login'; // Import the login component

function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');
  const [session, setSession] = useState(null); // Will hold the user's session
  const [loading, setLoading] = useState(false); // To prevent double-clicks

  // This hook runs when the app first loads
  useEffect(() => {
    // Check if the user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes (this fires on login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    // Cleanup the listener when the component unmounts
    return () => subscription.unsubscribe();
  }, []); // The empty array means this only runs once on load

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Make sure we have a session before fetching
    if (!session) {
      setResponse('Error: You must be logged in to add a patient.');
      setLoading(false);
      return;
    }

    try {
      setResponse('Sending...');
      
      // This is your original fetch call, with one key addition:
      const res = await fetch('http://127.0.0.1:5000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // THIS IS THE CRITICAL LINE
          // It proves to your Flask server that the user is logged in.
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        // If Flask sent an error (like 401), this will catch it
        throw new Error(data.error || 'Failed to add patient');
      }

      setResponse(`Patient "${name}" was recorded with ID: ${data.id}`);
      setName('');
      
    } catch (error) {
      console.error('Error:', error);
      setResponse(error.message); // Show the error from Flask
    }
    
    setLoading(false);
  };

  // --- Main Render Logic ---

  // 1. If there is NO session, show the Login component
  if (!session) {
    return (
      <div className="App">
        <h1>Patient Monitoring System</h1>
        <Login />
      </div>
    );
  }

  // 2. If there IS a session, show the main app
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

export default App;