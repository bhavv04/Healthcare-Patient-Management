import { useState } from 'react';
import { X, AlertTriangle, User, Info } from 'lucide-react';
import '../styles/alarmDismissalModal.css';

function AlarmDismissalModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  alarmReason, 
  patientName,
  loading 
}) {
  const [dismissalReason, setDismissalReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dismissalReason.trim()) {
      onConfirm(dismissalReason);
      setDismissalReason('');
    }
  };

  const handleClose = () => {
    setDismissalReason('');
    onClose();
  };

  return (
    <div className="alarm-dismissal-overlay">
      <div className="alarm-dismissal-container">
        <div className="alarm-dismissal-header">
          <div className="alarm-dismissal-icon">
            <AlertTriangle size={32} />
          </div>
          <div className="alarm-dismissal-title-section">
            <h3 className="alarm-dismissal-title">Dismiss Critical Alarm</h3>
            <p className="alarm-dismissal-subtitle">Document the reason for dismissal</p>
          </div>
        </div>

        <div className="alarm-dismissal-content">
          <div className="alarm-reason-display">
            <p className="alarm-reason-label">Current Alert</p>
            <p className="alarm-reason-text">{alarmReason}</p>
          </div>

          <div className="alarm-patient-info">
            <User size={18} className="alarm-patient-info-icon" />
            <p className="alarm-patient-name">
              Patient: <strong>{patientName}</strong>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="alarm-dismissal-form-group">
              <label className="alarm-dismissal-label">
                Dismissal Reason<span className="required">*</span>
              </label>
              <textarea
                value={dismissalReason}
                onChange={(e) => setDismissalReason(e.target.value)}
                placeholder="Please provide a detailed reason for dismissing this critical alarm (e.g., patient stabilized, false alarm, medical intervention completed)..."
                className="alarm-dismissal-textarea"
                required
                maxLength={500}
                disabled={loading}
              />
              <p className="alarm-char-count">
                {dismissalReason.length}/500 characters
              </p>
            </div>

            <div className="alarm-dismissal-info-box">
              <Info size={20} className="alarm-info-icon" />
              <p className="alarm-info-text">
                This action will be logged in the patient's record and system logs for audit purposes.
              </p>
            </div>

            <div className="alarm-dismissal-actions">
              <button
                type="submit"
                disabled={loading || !dismissalReason.trim()}
                className={`alarm-confirm-btn ${loading ? 'loading' : ''}`}
              >
                {loading ? 'Dismissing...' : 'Confirm Dismissal'}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="alarm-cancel-btn"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AlarmDismissalModal;
