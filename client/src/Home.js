import { Link } from 'react-router-dom';
import './Home.css';   

function Home() {
  return (
    <div className="home-container">
      <h2 className="home-title">Welcome to Patient Monitoring System</h2>
      <p className="home-text">Please login or register to continue.</p>
      
      <Link to="/login">
        <button className="home-btn">Login</button>
      </Link>

      <br />

      <Link to="/register">
        <button className="home-btn">Register</button>
      </Link>
    </div>
  );
}

export default Home;
