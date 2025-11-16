import { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { supabase } from './supabaseClient';

// Page Components
import MonitorView from './pages/MonitorView';
import HistoryView from './pages/HistoryView';
import PatientsView from './pages/PatientsView';
import SettingsView from './pages/SettingsView';

// Shared Components
import AlarmBanner from './components/AlarmBanner';
import MessageBanner from './components/MessageBanner';
import NavigationTabs from './components/NavigationTabs';
import PatientSidebar from './components/PatientSidebar';
import PatientFormModal from './components/PatientFormModal';
import ThresholdSettingsModal from './components/ThresholdSettingsModal';
import AlarmDismissalModal from './components/AlarmDismissalModal';

// Utilities
import {
  simulateVitalSigns,
  checkVitalThresholds,
  getThresholdMin,
  getThresholdMax,
  DEFAULT_THRESHOLDS,
  DEFAULT_VITAL_SIGNS,
  EMPTY_PATIENT_FORM
} from './utils/vitalSignsHelpers';

import {
  fetchPatients,
  addPatient,
  updatePatient,
  deletePatient,
  loadPatientThresholds,
  updatePatientThresholds,
  saveVitalSigns,
  loadVitalHistory,
  logAlarm,
  loadAlarmHistory,
  dismissAlarm,
  logSystemAction
} from './utils/databaseHelpers';

import './styles/dashboard.css';

function Dashboard({ session }) {
  // View state
  const [view, setView] = useState('monitor');
  
  // Patient state
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Vital signs state
  const [vitalSigns, setVitalSigns] = useState(DEFAULT_VITAL_SIGNS);
  const [alarmsEnabled, setAlarmsEnabled] = useState(true);
  const [alarmActive, setAlarmActive] = useState(false);
  const [alarmReason, setAlarmReason] = useState('');
  
  // History state
  const [vitalHistory, setVitalHistory] = useState([]);
  const [alarmHistory, setAlarmHistory] = useState([]);
  
  // Thresholds state
  const [thresholds, setThresholds] = useState(DEFAULT_THRESHOLDS);
  
  // Modal state
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [patientForm, setPatientForm] = useState(EMPTY_PATIENT_FORM);
  const [editingPatient, setEditingPatient] = useState(null);
  const [showThresholdSettings, setShowThresholdSettings] = useState(false);
  const [tempThresholds, setTempThresholds] = useState({...thresholds});
  const [showAlarmDismissal, setShowAlarmDismissal] = useState(false);

  // Load patients on mount
  useEffect(() => {
    handleFetchPatients();
  }, []);

  // Load patient data when selected
  useEffect(() => {
    if (selectedPatient) {
      handleLoadPatientData(selectedPatient.id);
    }
  }, [selectedPatient]);

  // Vital signs simulation
  useEffect(() => {
    if (selectedPatient && view === 'monitor') {
      const interval = setInterval(async () => {
        const newVitals = simulateVitalSigns(vitalSigns);
        setVitalSigns(newVitals);
        
        // Randomly save vital signs
        if (Math.random() < 0.2) {
          await saveVitalSigns(selectedPatient.id, newVitals, session.user.id);
        }
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [selectedPatient, view, vitalSigns, session.user.id]);

  // Alarm monitoring
  useEffect(() => {
    if (alarmsEnabled && selectedPatient) {
      const alarmCheck = checkVitalThresholds(vitalSigns, thresholds);
      
      if (alarmCheck.critical && !alarmActive) {
        setAlarmActive(true);
        setAlarmReason(alarmCheck.reason);
        handleLogAlarm(alarmCheck.vitalSign, alarmCheck.value, alarmCheck.reason);
      } else if (!alarmCheck.critical && alarmActive) {
        setAlarmActive(false);
        setAlarmReason('');
      }
    }
  }, [vitalSigns, alarmsEnabled, thresholds, alarmActive, selectedPatient]);

  // Patient handlers
  const handleFetchPatients = async () => {
    setLoading(true);
    try {
      const data = await fetchPatients(session.user.id);
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setMessage('Error loading patients');
    }
    setLoading(false);
  };

  const handleLoadPatientData = async (patientId) => {
    try {
      const thresholdData = await loadPatientThresholds(patientId);
      if (thresholdData) setThresholds(thresholdData);
      
      const vitals = await loadVitalHistory(patientId);
      setVitalHistory(vitals);
      
      const alarms = await loadAlarmHistory(patientId);
      setAlarmHistory(alarms);
    } catch (error) {
      console.error('Error loading patient data:', error);
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addPatient(patientForm, session.user.id);
      setMessage(`Patient "${patientForm.name}" added successfully`);
      setPatientForm(EMPTY_PATIENT_FORM);
      setShowPatientForm(false);
      handleFetchPatients();
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const handleUpdatePatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePatient(editingPatient.id, patientForm);
      setMessage('Patient updated successfully');
      setEditingPatient(null);
      setPatientForm(EMPTY_PATIENT_FORM);
      handleFetchPatients();
      
      if (selectedPatient?.id === editingPatient.id) {
        const updatedPatient = { ...selectedPatient, ...patientForm };
        setSelectedPatient(updatedPatient);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const handleDeletePatient = async (patientId, patientName) => {
    if (!window.confirm(`Are you sure you want to delete patient "${patientName}"? This will also delete all their vital signs and alarm history.`)) {
      return;
    }
    
    setLoading(true);
    try {
      await deletePatient(patientId);
      setMessage('Patient deleted successfully');
      if (selectedPatient?.id === patientId) {
        setSelectedPatient(null);
      }
      handleFetchPatients();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  const startEditPatient = (patient) => {
    setEditingPatient(patient);
    setPatientForm({
      name: patient.name || '',
      age: patient.age?.toString() || '',
      gender: patient.gender || '',
      medical_history: patient.medical_history || '',
      blood_type: patient.blood_type || '',
      allergies: patient.allergies || '',
      emergency_contact: patient.emergency_contact || '',
      emergency_phone: patient.emergency_phone || ''
    });
  };

  // Alarm handlers
  const handleLogAlarm = async (vitalSign, value, reason) => {
    try {
      const minThreshold = getThresholdMin(vitalSign, thresholds);
      const maxThreshold = getThresholdMax(vitalSign, thresholds);
      await logAlarm(selectedPatient.id, vitalSign, value, minThreshold, maxThreshold, reason);
      const alarms = await loadAlarmHistory(selectedPatient.id);
      setAlarmHistory(alarms);
    } catch (error) {
      console.error('Error logging alarm:', error);
    }
  };

  const handleDismissAlarmClick = () => {
    setShowAlarmDismissal(true);
  };

  const handleDismissAlarmConfirm = async (reason) => {
    setLoading(true);
    try {
      await dismissAlarm(selectedPatient.id, session.user.id, reason);
      await logSystemAction(session.user.id, selectedPatient.id, 'alarm_dismissed', `Alarm dismissed: ${alarmReason}. Reason: ${reason}`);
      
      setAlarmActive(false);
      setAlarmReason('');
      setShowAlarmDismissal(false);
      setMessage('Alarm dismissed and logged');
      
      const alarms = await loadAlarmHistory(selectedPatient.id);
      setAlarmHistory(alarms);
    } catch (error) {
      console.error('Error dismissing alarm:', error);
      setMessage('Error dismissing alarm');
    }
    setLoading(false);
  };

  // Threshold handlers
  const handleUpdateThresholds = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePatientThresholds(selectedPatient.id, tempThresholds, session.user.id);
      setThresholds({...tempThresholds});
      setShowThresholdSettings(false);
      setMessage('Warning thresholds updated successfully');
      
      await logSystemAction(session.user.id, selectedPatient.id, 'threshold_updated', `Thresholds updated for ${selectedPatient.name}`);
    } catch (error) {
      console.error('Error updating thresholds:', error);
      setMessage('Error updating thresholds');
    }
    setLoading(false);
  };

  // Modal handlers
  const openAddPatientModal = () => {
    setShowPatientForm(true);
    setEditingPatient(null);
    setPatientForm(EMPTY_PATIENT_FORM);
  };

  const closePatientModal = () => {
    setShowPatientForm(false);
    setEditingPatient(null);
    setPatientForm(EMPTY_PATIENT_FORM);
  };

  const openThresholdModal = () => {
    setTempThresholds({...thresholds});
    setShowThresholdSettings(true);
  };

  const closeThresholdModal = () => {
    setShowThresholdSettings(false);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setView('monitor');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="header-title"><Activity size={28} /> Patient Monitoring System</h1>
            <p className="header-subtitle">Logged in as: {session.user.email}</p>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Alarm Banner */}
      <AlarmBanner
        alarmActive={alarmActive}
        alarmReason={alarmReason}
        selectedPatient={selectedPatient}
        onCallHelp={() => alert('Emergency response team notified!')}
        onDismiss={handleDismissAlarmClick}
      />

      {/* Message Banner */}
      <MessageBanner message={message} onClose={() => setMessage('')} />

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation */}
        <NavigationTabs view={view} setView={setView} selectedPatient={selectedPatient} />

        <div className="content-grid">
          {/* Patient Sidebar */}
          <PatientSidebar
            patients={patients}
            selectedPatient={selectedPatient}
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            onSelectPatient={handleSelectPatient}
            onAddPatient={openAddPatientModal}
            onEditPatient={startEditPatient}
            onDeletePatient={handleDeletePatient}
          />

          {/* Main View */}
          <div className="main-view">
            {view === 'monitor' && (
              <MonitorView
                selectedPatient={selectedPatient}
                vitalSigns={vitalSigns}
                thresholds={thresholds}
                alarmsEnabled={alarmsEnabled}
                setAlarmsEnabled={setAlarmsEnabled}
                vitalHistory={vitalHistory}
              />
            )}

            {view === 'history' && selectedPatient && (
              <HistoryView
                selectedPatient={selectedPatient}
                vitalHistory={vitalHistory}
                alarmHistory={alarmHistory}
              />
            )}

            {view === 'patients' && (
              <PatientsView
                patients={patients}
                onAddPatient={openAddPatientModal}
                onEditPatient={startEditPatient}
                onDeletePatient={handleDeletePatient}
              />
            )}

            {view === 'settings' && (
              <SettingsView
                selectedPatient={selectedPatient}
                thresholds={thresholds}
                onConfigureThresholds={openThresholdModal}
                session={session}
                patients={patients}
                vitalHistory={vitalHistory}
                alarmHistory={alarmHistory}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <PatientFormModal
        isOpen={showPatientForm || !!editingPatient}
        onClose={closePatientModal}
        onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
        patientForm={patientForm}
        setPatientForm={setPatientForm}
        loading={loading}
        isEditing={!!editingPatient}
      />

      <ThresholdSettingsModal
        isOpen={showThresholdSettings}
        onClose={closeThresholdModal}
        onSubmit={handleUpdateThresholds}
        tempThresholds={tempThresholds}
        setTempThresholds={setTempThresholds}
        loading={loading}
        selectedPatient={selectedPatient}
      />

      <AlarmDismissalModal
        isOpen={showAlarmDismissal}
        onClose={() => setShowAlarmDismissal(false)}
        onConfirm={handleDismissAlarmConfirm}
        alarmReason={alarmReason}
        patientName={selectedPatient?.name}
        loading={loading}
      />
    </div>
  );
}

export default Dashboard;
