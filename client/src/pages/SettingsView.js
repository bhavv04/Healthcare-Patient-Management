function SettingsView({ selectedPatient, thresholds, onConfigureThresholds, session, patients, vitalHistory, alarmHistory }) {
  return (
    <div className="settings-view">
      <h2 className="view-title">System Settings</h2>
      
      <div className="settings-content">
        <div className="settings-section">
          <h3 className="settings-section-title">Warning Thresholds</h3>
          {selectedPatient && (
            <p className="threshold-patient-info">
              Configuring thresholds for: <strong>{selectedPatient.name}</strong>
            </p>
          )}
          <button
            onClick={() => {
              if (!selectedPatient) {
                alert('Please select a patient first');
                return;
              }
              onConfigureThresholds();
            }}
            className="btn-configure"
            disabled={!selectedPatient}
          >
            Configure Thresholds
          </button>
          
          <div className="thresholds-grid">
            <div className="threshold-card">
              <p className="threshold-label">Heart Rate</p>
              <p className="threshold-value">{thresholds.heartRateMin} - {thresholds.heartRateMax} bpm</p>
            </div>
            <div className="threshold-card">
              <p className="threshold-label">Temperature</p>
              <p className="threshold-value">{thresholds.tempMin} - {thresholds.tempMax} °C</p>
            </div>
            <div className="threshold-card">
              <p className="threshold-label">Blood Oxygen</p>
              <p className="threshold-value">Min: {thresholds.oxygenMin}%</p>
            </div>
            <div className="threshold-card">
              <p className="threshold-label">Blood Pressure</p>
              <p className="threshold-value">
                Sys: {thresholds.bpSysMin}-{thresholds.bpSysMax} | 
                Dia: {thresholds.bpDiaMin}-{thresholds.bpDiaMax}
              </p>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3 className="settings-section-title">System Information</h3>
          <div className="system-info-card">
            <p className="info-item"><strong>Version:</strong> 1.0.0</p>
            <p className="info-item"><strong>User:</strong> {session.user.email}</p>
            <p className="info-item"><strong>Last Login:</strong> {new Date().toLocaleString()}</p>
            <p className="info-item"><strong>Total Patients:</strong> {patients.length}</p>
            {selectedPatient && (
              <>
                <p className="info-item info-highlight"><strong>Selected Patient:</strong> {selectedPatient.name}</p>
                <p className="info-item"><strong>Vital Readings Stored:</strong> {vitalHistory.length}</p>
                <p className="info-item"><strong>Alarm Events:</strong> {alarmHistory.length}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;
