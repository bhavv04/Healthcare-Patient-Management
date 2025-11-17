import { Activity, Users, History, Settings } from 'lucide-react';

function NavigationTabs({ view, setView, selectedPatient }) {
  return (
    <div className="nav-tabs">
      <button
        onClick={() => setView('monitor')}
        className={`nav-tab ${view === 'monitor' ? 'active' : ''}`}
      >
        <Activity size={20} />
        Monitor
      </button>
      <button
        onClick={() => setView('patients')}
        className={`nav-tab ${view === 'patients' ? 'active' : ''}`}
      >
        <Users size={20} />
        Patients
      </button>
      <button
        onClick={() => setView('history')}
        disabled={!selectedPatient}
        className={`nav-tab ${view === 'history' ? 'active' : ''} ${!selectedPatient ? 'disabled' : ''}`}
      >
        <History size={20} />
        History
      </button>
      <button
        onClick={() => setView('settings')}
        className={`nav-tab ${view === 'settings' ? 'active' : ''}`}
      >
        <Settings size={20} />
        Settings
      </button>
    </div>
  );
}

export default NavigationTabs;
