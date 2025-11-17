import { X, Heart, Thermometer, Droplet, Activity, AlertTriangle } from 'lucide-react';
import '../styles/thresholdSettingsModal.css';

function ThresholdSettingsModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  tempThresholds, 
  setTempThresholds, 
  loading, 
  selectedPatient 
}) {
  if (!isOpen) return null;

  return (
    <div className="threshold-modal-overlay">
      <div className="threshold-modal-container">
        <div className="threshold-modal-header">
          <h3 className="threshold-modal-title">Configure Warning Thresholds</h3>
          <button onClick={onClose} className="threshold-modal-close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="threshold-sections-container">
            <div className="threshold-section">
              <h4 className="threshold-section-header">
                <span className="threshold-icon heart">
                  <Heart size={20} />
                </span>
                Heart Rate (bpm)
              </h4>
              <div className="threshold-inputs-grid">
                <div className="threshold-input-group">
                  <label className="threshold-input-label">Minimum</label>
                  <input
                    type="number"
                    value={tempThresholds.heartRateMin}
                    onChange={(e) => setTempThresholds({...tempThresholds, heartRateMin: parseInt(e.target.value)})}
                    className="threshold-input"
                  />
                </div>
                <div className="threshold-input-group">
                  <label className="threshold-input-label">Maximum</label>
                  <input
                    type="number"
                    value={tempThresholds.heartRateMax}
                    onChange={(e) => setTempThresholds({...tempThresholds, heartRateMax: parseInt(e.target.value)})}
                    className="threshold-input"
                  />
                </div>
              </div>
            </div>

            <div className="threshold-section">
              <h4 className="threshold-section-header">
                <span className="threshold-icon temp">
                  <Thermometer size={20} />
                </span>
                Temperature (°C)
              </h4>
              <div className="threshold-inputs-grid">
                <div className="threshold-input-group">
                  <label className="threshold-input-label">Minimum</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempThresholds.tempMin}
                    onChange={(e) => setTempThresholds({...tempThresholds, tempMin: parseFloat(e.target.value)})}
                    className="threshold-input"
                  />
                </div>
                <div className="threshold-input-group">
                  <label className="threshold-input-label">Maximum</label>
                  <input
                    type="number"
                    step="0.1"
                    value={tempThresholds.tempMax}
                    onChange={(e) => setTempThresholds({...tempThresholds, tempMax: parseFloat(e.target.value)})}
                    className="threshold-input"
                  />
                </div>
              </div>
            </div>

            <div className="threshold-section">
              <h4 className="threshold-section-header">
                <span className="threshold-icon oxygen">
                  <Droplet size={20} />
                </span>
                Blood Oxygen (%)
              </h4>
              <div className="threshold-input-group threshold-single-input">
                <label className="threshold-input-label">Minimum</label>
                <input
                  type="number"
                  value={tempThresholds.oxygenMin}
                  onChange={(e) => setTempThresholds({...tempThresholds, oxygenMin: parseInt(e.target.value)})}
                  className="threshold-input"
                />
              </div>
            </div>

            <div className="threshold-section">
              <h4 className="threshold-section-header">
                <span className="threshold-icon pressure">
                  <Activity size={20} />
                </span>
                Blood Pressure (mmHg)
              </h4>
              <div className="threshold-subsection">
                <label className="threshold-subsection-title">Systolic</label>
                <div className="threshold-inputs-grid">
                  <div className="threshold-input-group">
                    <label className="threshold-input-label">Minimum</label>
                    <input
                      type="number"
                      value={tempThresholds.bpSysMin}
                      onChange={(e) => setTempThresholds({...tempThresholds, bpSysMin: parseInt(e.target.value)})}
                      className="threshold-input"
                    />
                  </div>
                  <div className="threshold-input-group">
                    <label className="threshold-input-label">Maximum</label>
                    <input
                      type="number"
                      value={tempThresholds.bpSysMax}
                      onChange={(e) => setTempThresholds({...tempThresholds, bpSysMax: parseInt(e.target.value)})}
                      className="threshold-input"
                    />
                  </div>
                </div>
              </div>
              <div className="threshold-subsection">
                <label className="threshold-subsection-title">Diastolic</label>
                <div className="threshold-inputs-grid">
                  <div className="threshold-input-group">
                    <label className="threshold-input-label">Minimum</label>
                    <input
                      type="number"
                      value={tempThresholds.bpDiaMin}
                      onChange={(e) => setTempThresholds({...tempThresholds, bpDiaMin: parseInt(e.target.value)})}
                      className="threshold-input"
                    />
                  </div>
                  <div className="threshold-input-group">
                    <label className="threshold-input-label">Maximum</label>
                    <input
                      type="number"
                      value={tempThresholds.bpDiaMax}
                      onChange={(e) => setTempThresholds({...tempThresholds, bpDiaMax: parseInt(e.target.value)})}
                      className="threshold-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="threshold-warning-box">
            <AlertTriangle size={20} className="threshold-warning-icon" />
            <p className="threshold-warning-text">
              <strong>Warning:</strong> Changing these thresholds affects when critical alarms are triggered. 
              Ensure values are medically appropriate for this patient: <strong>{selectedPatient?.name}</strong>
            </p>
          </div>

          <div className="threshold-modal-actions">
            <button
              type="submit"
              disabled={loading}
              className={`threshold-submit-btn ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Saving...' : 'Save Thresholds'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="threshold-cancel-btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ThresholdSettingsModal;
