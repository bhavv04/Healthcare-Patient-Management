import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h2>Welcome to Patient Monitoring System</h2>
      <p>Please login or register to continue.</p>
      
      <Link to="/login">
        <button>Login</button>
      </Link>
      <br />
      <Link to="/register">
        <button>Sign Up</button>
      </Link>
    </div>
  );
}

export default Home;