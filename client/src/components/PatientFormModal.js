import { X } from 'lucide-react';

function PatientFormModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  patientForm, 
  setPatientForm, 
  loading, 
  isEditing 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">
            {isEditing ? 'Update Patient' : 'Add New Patient'}
          </h3>
          <button onClick={onClose} className="close-btn">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-grid">
            <div className="form-group col-span-2">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                required
                value={patientForm.name}
                onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="number"
                value={patientForm.age}
                onChange={(e) => setPatientForm({...patientForm, age: e.target.value})}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                value={patientForm.gender}
                onChange={(e) => setPatientForm({...patientForm, gender: e.target.value})}
                className="form-select"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Blood Type</label>
              <select
                value={patientForm.blood_type}
                onChange={(e) => setPatientForm({...patientForm, blood_type: e.target.value})}
                className="form-select"
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Allergies</label>
              <input
                type="text"
                value={patientForm.allergies}
                onChange={(e) => setPatientForm({...patientForm, allergies: e.target.value})}
                placeholder="e.g., Penicillin, Peanuts"
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">Medical History</label>
              <textarea
                value={patientForm.medical_history}
                onChange={(e) => setPatientForm({...patientForm, medical_history: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                placeholder="Enter relevant medical history..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Emergency Contact Name</label>
              <input
                type="text"
                value={patientForm.emergency_contact}
                onChange={(e) => setPatientForm({...patientForm, emergency_contact: e.target.value})}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Emergency Contact Phone</label>
              <input
                type="tel"
                value={patientForm.emergency_phone}
                onChange={(e) => setPatientForm({...patientForm, emergency_phone: e.target.value})}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add Patient')}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientFormModal;
