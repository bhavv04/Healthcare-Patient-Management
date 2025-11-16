import { TrendingUp, AlertTriangle } from 'lucide-react';

function HistoryView({ selectedPatient, vitalHistory, alarmHistory }) {
  return (
    <div className="history-view">
      <div className="history-card">
        <h2 className="history-title">Patient History: {selectedPatient.name}</h2>
        
        <div className="history-section">
          <h3 className="section-header">
            <TrendingUp size={20} className="section-icon" />
            Recent Vital Signs
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Heart Rate</th>
                  <th>Temp</th>
                  <th>O2</th>
                  <th>BP</th>
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
            {vitalHistory.length === 0 && (
              <p className="empty-message">No vital signs recorded yet</p>
            )}
          </div>
        </div>

        <div className="history-section">
          <h3 className="section-header">
            <AlertTriangle size={20} className="section-icon alarm-icon" />
            Alarm History
          </h3>
          <div className="alarm-list">
            {alarmHistory.map((alarm) => (
              <div key={alarm.id} className="alarm-record">
                <div className="alarm-record-content">
                  <div>
                    <p className="alarm-type">{alarm.alarm_type.toUpperCase()}</p>
                    <p className="alarm-message">{alarm.message}</p>
                    <p className="alarm-time">
                      {new Date(alarm.created_at).toLocaleString()}
                    </p>
                  </div>
                  {alarm.dismissed_at && (
                    <div className="dismissal-info">
                      <p className="dismissal-label">Dismissed</p>
                      <p className="dismissal-time">{new Date(alarm.dismissed_at).toLocaleString()}</p>
                      {alarm.dismissal_reason && (
                        <p className="dismissal-reason">"{alarm.dismissal_reason}"</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {alarmHistory.length === 0 && (
              <p className="empty-message">No alarms recorded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryView;
