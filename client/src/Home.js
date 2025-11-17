import { Link } from 'react-router-dom';
import { Heart, Activity, Shield, Clock, Users, TrendingUp, Bell, Database, Zap, CheckCircle } from 'lucide-react';
import './styles/home.css';   

function Home() {
  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <Heart size={20} strokeWidth={2.5} />
          </div>
          HealthCare Portal
        </div>
        <div className="nav-buttons">
          <Link to="/login" className="nav-btn login">Login</Link>
          <Link to="/register" className="nav-btn signup">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Zap size={14} />
          Real-time Patient Monitoring
        </div>
        <h1 className="hero-title">
          Advanced Healthcare<br/>Monitoring System
        </h1>
        <p className="hero-subtitle">
          Monitor patient vitals in real-time with AI-powered alerts, secure data management, 
          and HIPAA-compliant infrastructure. Your complete solution for modern healthcare.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="home-btn primary">Get Started Free</Link>
          <Link to="/login" className="home-btn secondary">Login to Dashboard</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Active Patients</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime Guaranteed</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Real-time Monitoring</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">HIPAA Compliant</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-header">
          <h2 className="features-title">Everything You Need</h2>
          <p className="features-subtitle">
            Comprehensive patient monitoring tools designed for healthcare professionals
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Activity size={24} strokeWidth={2} />
            </div>
            <h3 className="feature-title">Real-time Vital Monitoring</h3>
            <p className="feature-description">
              Track heart rate, blood pressure, oxygen levels, and temperature in real-time with instant updates and visual indicators.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Bell size={24} strokeWidth={2} />
            </div>
            <h3 className="feature-title">Intelligent Alerts</h3>
            <p className="feature-description">
              Receive instant notifications when patient vitals exceed safe thresholds with customizable alert rules.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={24} strokeWidth={2} />
            </div>
            <h3 className="feature-title">HIPAA Compliant</h3>
            <p className="feature-description">
              Enterprise-grade security with 256-bit encryption, ensuring full compliance with healthcare regulations.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Database size={24} strokeWidth={2} />
            </div>
            <h3 className="feature-title">Patient Records</h3>
            <p className="feature-description">
              Comprehensive patient profiles with medical history, vital trends, and detailed health analytics.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={24} strokeWidth={2} />
            </div>
            <h3 className="feature-title">Analytics Dashboard</h3>
            <p className="feature-description">
              Visualize health trends with interactive charts and gain insights from historical vital data.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Users size={24} strokeWidth={2} />
            </div>
            <h3 className="feature-title">Multi-Patient Management</h3>
            <p className="feature-description">
              Efficiently manage multiple patients simultaneously with an intuitive, organized interface.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-text">
            Join thousands of healthcare professionals using our platform to deliver better patient care. 
            Sign up now and start monitoring in minutes.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="home-btn primary">Create Your Account</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <p className="footer-text">
          256-bit encrypted • HIPAA compliant • ISO certified
        </p>
      </footer>
    </div>
  );
}

export default Home;
