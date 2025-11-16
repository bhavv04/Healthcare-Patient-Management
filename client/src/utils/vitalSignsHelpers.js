/**
 * Simulate vital signs with realistic variations
 */
export const simulateVitalSigns = (currentVitals) => {
  return {
    heartRate: Math.max(40, Math.min(150, currentVitals.heartRate + (Math.random() - 0.5) * 4)),
    temperature: Math.max(35, Math.min(40, currentVitals.temperature + (Math.random() - 0.5) * 0.2)),
    bloodOxygen: Math.max(80, Math.min(100, currentVitals.bloodOxygen + (Math.random() - 0.5) * 2)),
    bloodPressureSys: Math.max(80, Math.min(180, currentVitals.bloodPressureSys + (Math.random() - 0.5) * 3)),
    bloodPressureDia: Math.max(50, Math.min(110, currentVitals.bloodPressureDia + (Math.random() - 0.5) * 2))
  };
};

/**
 * Check if vital signs are within threshold limits
 */
export const checkVitalThresholds = (vitalSigns, thresholds) => {
  const { heartRate, temperature, bloodOxygen, bloodPressureSys, bloodPressureDia } = vitalSigns;
  
  if (heartRate < thresholds.heartRateMin || heartRate > thresholds.heartRateMax) {
    return {
      critical: true,
      vitalSign: 'heart_rate',
      value: heartRate,
      reason: `Heart rate out of range: ${Math.round(heartRate)} bpm`
    };
  }
  
  if (temperature < thresholds.tempMin || temperature > thresholds.tempMax) {
    return {
      critical: true,
      vitalSign: 'temperature',
      value: temperature,
      reason: `Temperature out of range: ${temperature.toFixed(1)}°C`
    };
  }
  
  if (bloodOxygen < thresholds.oxygenMin) {
    return {
      critical: true,
      vitalSign: 'blood_oxygen',
      value: bloodOxygen,
      reason: `Blood oxygen low: ${Math.round(bloodOxygen)}%`
    };
  }
  
  if (bloodPressureSys < thresholds.bpSysMin || bloodPressureSys > thresholds.bpSysMax) {
    return {
      critical: true,
      vitalSign: 'blood_pressure_systolic',
      value: bloodPressureSys,
      reason: `Systolic BP out of range: ${Math.round(bloodPressureSys)} mmHg`
    };
  }
  
  if (bloodPressureDia < thresholds.bpDiaMin || bloodPressureDia > thresholds.bpDiaMax) {
    return {
      critical: true,
      vitalSign: 'blood_pressure_diastolic',
      value: bloodPressureDia,
      reason: `Diastolic BP out of range: ${Math.round(bloodPressureDia)} mmHg`
    };
  }
  
  return { critical: false };
};

/**
 * Get threshold minimum value for a vital sign
 */
export const getThresholdMin = (vitalSign, thresholds) => {
  switch(vitalSign) {
    case 'heart_rate': return thresholds.heartRateMin;
    case 'temperature': return thresholds.tempMin;
    case 'blood_oxygen': return thresholds.oxygenMin;
    case 'blood_pressure_systolic': return thresholds.bpSysMin;
    case 'blood_pressure_diastolic': return thresholds.bpDiaMin;
    default: return null;
  }
};

/**
 * Get threshold maximum value for a vital sign
 */
export const getThresholdMax = (vitalSign, thresholds) => {
  switch(vitalSign) {
    case 'heart_rate': return thresholds.heartRateMax;
    case 'temperature': return thresholds.tempMax;
    case 'blood_oxygen': return 100;
    case 'blood_pressure_systolic': return thresholds.bpSysMax;
    case 'blood_pressure_diastolic': return thresholds.bpDiaMax;
    default: return null;
  }
};

/**
 * Default threshold values
 */
export const DEFAULT_THRESHOLDS = {
  heartRateMin: 60,
  heartRateMax: 100,
  tempMin: 36.0,
  tempMax: 37.5,
  oxygenMin: 95,
  bpSysMin: 90,
  bpSysMax: 140,
  bpDiaMin: 60,
  bpDiaMax: 90
};

/**
 * Default vital signs
 */
export const DEFAULT_VITAL_SIGNS = {
  heartRate: 72,
  temperature: 36.8,
  bloodOxygen: 98,
  bloodPressureSys: 120,
  bloodPressureDia: 80
};

/**
 * Empty patient form
 */
export const EMPTY_PATIENT_FORM = {
  name: '',
  age: '',
  gender: '',
  medical_history: '',
  blood_type: '',
  allergies: '',
  emergency_contact: '',
  emergency_phone: ''
};
