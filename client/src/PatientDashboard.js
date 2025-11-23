import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Thermometer, Droplet, Activity, LogOut } from 'lucide-react';
import { supabase } from './supabaseClient';
import { loadVitalHistory, loadAlarmHistory } from './utils/databaseHelpers';
import './styles/patientDashboard.css';

function PatientDashboard() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [vitalHistory, setVitalHistory] = useState([]);
  const [alarmHistory, setAlarmHistory] = useState([]);
  const [latestVitals, setLatestVitals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get patient data from localStorage
    const patientData = localStorage.getItem('patientData');
    if (!patientData) {
      navigate('/login');
      return;
    }

    const parsedPatient = JSON.parse(patientData);
    setPatient(parsedPatient);
    loadPatientVitals(parsedPatient.id);
  }, [navigate]);

  const loadPatientVitals = async (patientId) => {
    try {
      const vitals = await loadVitalHistory(patientId);
      setVitalHistory(vitals);
      
      if (vitals.length > 0) {
        setLatestVitals(vitals[0]);
      } else {
        // Generate simulated vital signs if no data exists
        const simulatedVitals = {
          heart_rate: 72,
          temperature: 36.8,
          blood_oxygen: 98,
          blood_pressure_systolic: 120,
          blood_pressure_diastolic: 80,
          recorded_at: new Date().toISOString()
        };
        setLatestVitals(simulatedVitals);
        
        // Generate some history data
        const simulatedHistory = [
          {
            id: 1,
            heart_rate: 72,
            temperature: 36.8,
            blood_oxygen: 98,
            blood_pressure_systolic: 120,
            blood_pressure_diastolic: 80,
            recorded_at: new Date().toISOString()
          },
          {
            id: 2,
            heart_rate: 75,
            temperature: 36.9,
            blood_oxygen: 97,
            blood_pressure_systolic: 118,
            blood_pressure_diastolic: 78,
            recorded_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
          },
          {
            id: 3,
            heart_rate: 70,
            temperature: 36.7,
            blood_oxygen: 99,
            blood_pressure_systolic: 122,
            blood_pressure_diastolic: 82,
            recorded_at: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
          },
          {
            id: 4,
            heart_rate: 73,
            temperature: 36.8,
            blood_oxygen: 98,
            blood_pressure_systolic: 119,
            blood_pressure_diastolic: 79,
            recorded_at: new Date(Date.now() - 10800000).toISOString() // 3 hours ago
          },
          {
            id: 5,
            heart_rate: 74,
            temperature: 36.9,
            blood_oxygen: 97,
            blood_pressure_systolic: 121,
            blood_pressure_diastolic: 81,
            recorded_at: new Date(Date.now() - 14400000).toISOString() // 4 hours ago
          }
        ];
        setVitalHistory(simulatedHistory);
      }

      const alarms = await loadAlarmHistory(patientId);
      setAlarmHistory(alarms);
    } catch (error) {
      console.error('Error loading patient data:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('patientData');
    localStorage.removeItem('portalType');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="patient-dashboard-container">
        <div className="patient-dashboard-loading-message">Loading your health data...</div>
      </div>
    );
  }

  if (!patient) {
    return null;
  }

  return (
    <div className="patient-dashboard-container">
      {/* Header */}
      <div className="patient-dashboard-header">
        <div className="patient-dashboard-header-content">
          <div>
            <h1 className="patient-dashboard-header-title">
              <Activity size={28} /> Patient Health Portal
            </h1>
            <p className="patient-dashboard-header-subtitle">Welcome, {patient.name}</p>
          </div>
          <button onClick={handleLogout} className="patient-dashboard-logout-btn">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Patient Info Card */}
      <div className="patient-dashboard-info-section">
        <div className="patient-dashboard-info-card">
          <h2 className="patient-dashboard-section-title">Your Information</h2>
          <div className="patient-dashboard-info-grid">
            <div className="patient-dashboard-info-item">
              <span className="patient-dashboard-info-label">Username:</span>
              <span className="patient-dashboard-info-value">{patient.username}</span>
            </div>
            <div className="patient-dashboard-info-item">
              <span className="patient-dashboard-info-label">Age:</span>
              <span className="patient-dashboard-info-value">{patient.age || 'N/A'}</span>
            </div>
            <div className="patient-dashboard-info-item">
              <span className="patient-dashboard-info-label">Gender:</span>
              <span className="patient-dashboard-info-value">{patient.gender || 'N/A'}</span>
            </div>
            {patient.blood_type && (
              <div className="patient-dashboard-info-item">
                <span className="patient-dashboard-info-label">Blood Type:</span>
                <span className="patient-dashboard-info-value">{patient.blood_type}</span>
              </div>
            )}
            {patient.allergies && (
              <div className="patient-dashboard-info-item full-width">
                <span className="patient-dashboard-info-label">Allergies:</span>
                <span className="patient-dashboard-info-value">{patient.allergies}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Current Vitals */}
      {latestVitals ? (
        <>
          <h2 className="patient-dashboard-section-title" style={{color: 'white', marginBottom: '20px'}}>Current Vital Signs</h2>
          <div className="patient-dashboard-vitals-grid">
            <div className="patient-dashboard-vital-card">
              <div className="patient-dashboard-vital-icon heart">
                <Heart size={32} />
              </div>
              <div className="patient-dashboard-vital-info">
                <h3>Heart Rate</h3>
                <p className="patient-dashboard-vital-value">
                  {latestVitals.heart_rate}
                  <span className="patient-dashboard-vital-unit">bpm</span>
                </p>
              </div>
            </div>

            <div className="patient-dashboard-vital-card">
              <div className="patient-dashboard-vital-icon temp">
                <Thermometer size={32} />
              </div>
              <div className="patient-dashboard-vital-info">
                <h3>Temperature</h3>
                <p className="patient-dashboard-vital-value">
                  {latestVitals.temperature}
                  <span className="patient-dashboard-vital-unit">°C</span>
                </p>
              </div>
            </div>

            <div className="patient-dashboard-vital-card">
              <div className="patient-dashboard-vital-icon oxygen">
                <Droplet size={32} />
              </div>
              <div className="patient-dashboard-vital-info">
                <h3>Blood Oxygen</h3>
                <p className="patient-dashboard-vital-value">
                  {latestVitals.blood_oxygen}
                  <span className="patient-dashboard-vital-unit">%</span>
                </p>
              </div>
            </div>

            <div className="patient-dashboard-vital-card">
              <div className="patient-dashboard-vital-icon pressure">
                <Activity size={32} />
              </div>
              <div className="patient-dashboard-vital-info">
                <h3>Blood Pressure</h3>
                <p className="patient-dashboard-vital-value">
                  {latestVitals.blood_pressure_systolic}/{latestVitals.blood_pressure_diastolic}
                  <span className="patient-dashboard-vital-unit">mmHg</span>
                </p>
              </div>
            </div>
          </div>

          <p className="patient-dashboard-last-updated">
            Last updated: {new Date(latestVitals.recorded_at).toLocaleString()}
          </p>
        </>
      ) : (
        <div className="patient-dashboard-no-data-message">
          <p>No vital signs recorded yet. Your healthcare provider will monitor your vitals.</p>
        </div>
      )}

      {/* Vital Signs History */}
      {vitalHistory.length > 0 && (
        <div className="patient-dashboard-history-section">
          <h2 className="patient-dashboard-section-title">Recent Vital Signs History</h2>
          <div className="patient-dashboard-history-table-container">
            <table className="patient-dashboard-history-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Heart Rate</th>
                  <th>Temperature</th>
                  <th>Blood Oxygen</th>
                  <th>Blood Pressure</th>
                </tr>
              </thead>
              <tbody>
                {vitalHistory.slice(0, 10).map((reading, idx) => (
                  <tr key={reading.id} className={idx % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td>{new Date(reading.recorded_at).toLocaleString()}</td>
                    <td>{reading.heart_rate} bpm</td>
                    <td>{reading.temperature}°C</td>
                    <td>{reading.blood_oxygen}%</td>
                    <td>{reading.blood_pressure_systolic}/{reading.blood_pressure_diastolic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Alerts */}
      {alarmHistory.length > 0 && (
        <div className="patient-dashboard-alerts-section">
          <h2 className="patient-dashboard-section-title">Recent Health Alerts</h2>
          <div className="patient-dashboard-alerts-list">
            {alarmHistory.slice(0, 5).map((alarm) => (
              <div key={alarm.id} className="patient-dashboard-alert-card">
                <div className="patient-dashboard-alert-content">
                  <p className="patient-dashboard-alert-type">{alarm.alarm_type.toUpperCase()}</p>
                  <p className="patient-dashboard-alert-message">{alarm.message}</p>
                  <p className="patient-dashboard-alert-time">
                    {new Date(alarm.created_at).toLocaleString()}
                  </p>
                  {alarm.dismissed_at && (
                    <p className="patient-dashboard-alert-dismissed">Resolved by healthcare provider</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboard;
