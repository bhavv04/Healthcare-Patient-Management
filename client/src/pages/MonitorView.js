import { Heart, Thermometer, Droplet, Activity, Users, Bell, BellOff } from 'lucide-react';

function MonitorView({ selectedPatient, vitalSigns, thresholds, alarmsEnabled, setAlarmsEnabled, vitalHistory }) {
  if (!selectedPatient) {
    return (
      <div className="empty-state">
        <Users size={64} className="empty-state-icon" />
        <p className="empty-state-title">Select a patient to begin monitoring</p>
        <p className="empty-state-subtitle">Choose a patient from the list or create a new patient profile</p>
      </div>
    );
  }

  return (
    <div className="monitor-view">
      <div className="patient-info-card">
        <div className="patient-info-header">
          <div className="flex-1">
            <h2 className="patient-info-title">{selectedPatient.name}</h2>
            <div className="grid grid-cols-2 gap-x-4 mt-2 text-sm">
              <p className="text-gray-600">Age: {selectedPatient.age || 'N/A'}</p>
              <p className="text-gray-600">Gender: {selectedPatient.gender || 'N/A'}</p>
              {selectedPatient.blood_type && (
                <p className="text-gray-600">Blood Type: {selectedPatient.blood_type}</p>
              )}
              {selectedPatient.allergies && (
                <p className="text-gray-600">Allergies: {selectedPatient.allergies}</p>
              )}
            </div>
            {selectedPatient.medical_history && (
              <p className="text-sm text-gray-500 mt-2">
                <strong>Medical History:</strong> {selectedPatient.medical_history}
              </p>
            )}
            {selectedPatient.emergency_contact && (
              <p className="text-sm text-gray-500 mt-1">
                <strong>Emergency Contact:</strong> {selectedPatient.emergency_contact} 
                {selectedPatient.emergency_phone && ` (${selectedPatient.emergency_phone})`}
              </p>
            )}
          </div>
          <button
            onClick={() => setAlarmsEnabled(!alarmsEnabled)}
            className={`alarm-toggle ${alarmsEnabled ? 'enabled' : 'disabled'}`}
          >
            {alarmsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            {alarmsEnabled ? 'Alarms On' : 'Alarms Off'}
          </button>
        </div>
      </div>

      <div className="vitals-grid">
        <div className="vital-card">
          <div className="vital-header">
            <div className="vital-icon heart">
              <Heart size={28} />
            </div>
            <div className="vital-info">
              <h3>Heart Rate</h3>
              <p className="vital-value">{Math.round(vitalSigns.heartRate)}<span className="vital-unit">bpm</span></p>
            </div>
          </div>
          <div className="vital-progress">
            <div 
              className={`vital-progress-bar ${vitalSigns.heartRate < thresholds.heartRateMin || vitalSigns.heartRate > thresholds.heartRateMax ? 'critical' : 'normal'}`}
              style={{ width: `${Math.min(100, (vitalSigns.heartRate / 150) * 100)}%` }}
            />
          </div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <div className="vital-icon temp">
              <Thermometer size={28} />
            </div>
            <div className="vital-info">
              <h3>Temperature</h3>
              <p className="vital-value">{vitalSigns.temperature.toFixed(1)}<span className="vital-unit">°C</span></p>
            </div>
          </div>
          <div className="vital-progress">
            <div 
              className={`vital-progress-bar ${vitalSigns.temperature < thresholds.tempMin || vitalSigns.temperature > thresholds.tempMax ? 'critical' : 'normal'}`}
              style={{ width: `${Math.min(100, ((vitalSigns.temperature - 35) / 5) * 100)}%` }}
            />
          </div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <div className="vital-icon oxygen">
              <Droplet size={28} />
            </div>
            <div className="vital-info">
              <h3>Blood Oxygen</h3>
              <p className="vital-value">{Math.round(vitalSigns.bloodOxygen)}<span className="vital-unit">%</span></p>
            </div>
          </div>
          <div className="vital-progress">
            <div 
              className={`vital-progress-bar ${vitalSigns.bloodOxygen < thresholds.oxygenMin ? 'critical' : 'normal'}`}
              style={{ width: `${vitalSigns.bloodOxygen}%` }}
            />
          </div>
        </div>

        <div className="vital-card">
          <div className="vital-header">
            <div className="vital-icon pressure">
              <Activity size={28} />
            </div>
            <div className="vital-info">
              <h3>Blood Pressure</h3>
              <p className="vital-value">{Math.round(vitalSigns.bloodPressureSys)}/{Math.round(vitalSigns.bloodPressureDia)}<span className="vital-unit">mmHg</span></p>
            </div>
          </div>
          <div className="vital-progress">
            <div 
              className={`vital-progress-bar ${vitalSigns.bloodPressureSys < thresholds.bpSysMin || vitalSigns.bloodPressureSys > thresholds.bpSysMax ? 'critical' : 'normal'}`}
              style={{ width: `${Math.min(100, (vitalSigns.bloodPressureSys / 200) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="status-bar">
        <p className="status-text">
          <strong>System Status:</strong> Monitoring active | Last reading: {new Date().toLocaleTimeString()} | 
          Alarms: {alarmsEnabled ? 'Enabled' : 'Disabled'} | 
          Readings saved: {vitalHistory.length}
        </p>
      </div>
    </div>
  );
}

export default MonitorView;
