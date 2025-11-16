import { AlertTriangle } from 'lucide-react';

function AlarmBanner({ alarmActive, alarmReason, selectedPatient, onCallHelp, onDismiss }) {
  if (!alarmActive) return null;

  return (
    <div className="alarm-banner">
      <div className="alarm-content">
        <div className="alarm-info">
          <AlertTriangle size={32} />
          <div>
            <p className="alarm-title">CRITICAL ALERT</p>
            <p>{alarmReason}</p>
            <p className="text-sm">Patient: {selectedPatient?.name}</p>
          </div>
        </div>
        <div className="alarm-actions">
          <button onClick={onCallHelp} className="alarm-btn-help">
            Call for Help
          </button>
          <button onClick={onDismiss} className="alarm-btn-dismiss">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlarmBanner;
