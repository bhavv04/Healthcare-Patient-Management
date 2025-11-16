import { Plus, Edit2, Trash2 } from 'lucide-react';

function PatientsView({ patients, onAddPatient, onEditPatient, onDeletePatient }) {
  return (
    <div className="patients-view">
      <div className="patients-header">
        <h2 className="view-title">Patient Management</h2>
        <button onClick={onAddPatient} className="btn-add-patient">
          <Plus size={20} />
          Add New Patient
        </button>
      </div>
      
      <div className="patients-content">
        <h3 className="patients-count">All Patients ({patients.length})</h3>
        <div className="patients-grid">
          {patients.map(patient => (
            <div key={patient.id} className="patient-detail-card">
              <div className="patient-detail-content">
                <div className="patient-detail-info">
                  <p className="patient-detail-name">{patient.name}</p>
                  <div className="patient-detail-grid">
                    <p className="detail-item">Age: {patient.age || 'N/A'}</p>
                    <p className="detail-item">Gender: {patient.gender || 'N/A'}</p>
                    {patient.blood_type && <p className="detail-item">Blood Type: {patient.blood_type}</p>}
                    {patient.allergies && <p className="detail-item">Allergies: {patient.allergies}</p>}
                  </div>
                  {patient.medical_history && (
                    <p className="medical-history">{patient.medical_history}</p>
                  )}
                  {patient.emergency_contact && (
                    <p className="emergency-contact">
                      Emergency: {patient.emergency_contact} {patient.emergency_phone && `(${patient.emergency_phone})`}
                    </p>
                  )}
                </div>
                <div className="patient-detail-actions">
                  <button onClick={() => onEditPatient(patient)} className="action-btn edit-btn">
                    <Edit2 size={20} />
                  </button>
                  <button onClick={() => onDeletePatient(patient.id, patient.name)} className="action-btn delete-btn">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientsView;
