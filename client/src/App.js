import { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:5000/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      
      setResponse(`Patient "${name}" was recorded with ID: ${data.id}`);
      
      // Clear the input after submission
      setName('');
      
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error adding patient'); // show error message
    }
  };

  return (
    <div className="App">
      <h1>React + Flask Test</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
      {response && <p>Response: {response}</p>}
    </div>
  );
}

export default App;