import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

function PatientSidebar({ 
  patients, 
  selectedPatient, 
  searchTerm, 
  onSearchChange, 
  onSelectPatient, 
  onAddPatient, 
  onEditPatient, 
  onDeletePatient 
}) {
  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Patients</h2>
        <button onClick={onAddPatient} className="add-patient-btn">
          <Plus size={24} />
        </button>
      </div>

      <div className="search-box">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={onSearchChange}
          className="search-input"
        />
      </div>

      <div className="patient-list">
        {filteredPatients.map(patient => (
          <div
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={`patient-card ${selectedPatient?.id === patient.id ? 'selected' : ''}`}
          >
            <div className="patient-card-content">
              <div className="flex-1">
                <p className="patient-name">{patient.name}</p>
                <p className="patient-details">
                  {patient.age ? `Age: ${patient.age}` : 'Age: N/A'} | {patient.gender || 'N/A'}
                </p>
                {patient.blood_type && (
                  <p className="patient-details">Type: {patient.blood_type}</p>
                )}
              </div>
              <div className="patient-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPatient(patient);
                  }}
                  className="icon-btn edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePatient(patient.id, patient.name);
                  }}
                  className="icon-btn delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredPatients.length === 0 && (
          <p className="empty-message">No patients found</p>
        )}
      </div>
    </div>
  );
}

export default PatientSidebar;
