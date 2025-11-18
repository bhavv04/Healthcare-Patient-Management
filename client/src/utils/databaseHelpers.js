import { supabase } from '../supabaseClient';

/**
 * Fetch all patients for the current user
 */
export const fetchPatients = async (userId) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

/**
 * Add a new patient
 */
export const addPatient = async (patientData, userId) => {
  const { data, error } = await supabase
    .from('patients')
    .insert([{
      ...patientData,
      age: patientData.age ? parseInt(patientData.age) : null,
      user_id: userId
    }])
    .select();

  if (error) throw error;
  
  // Create default thresholds for the new patient
  if (data && data[0]) {
    await supabase
      .from('patient_thresholds')
      .insert([{
        patient_id: data[0].id,
        updated_by: userId
      }]);
  }
  
  return data;
};

/**
 * Update an existing patient
 */
export const updatePatient = async (patientId, patientData) => {
  const { error } = await supabase
    .from('patients')
    .update({
      ...patientData,
      age: patientData.age ? parseInt(patientData.age) : null
    })
    .eq('id', patientId);

  if (error) throw error;
};

/**
 * Delete a patient
 */
export const deletePatient = async (patientId) => {
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', patientId);

  if (error) throw error;
};

/**
 * Load patient thresholds
 */
export const loadPatientThresholds = async (patientId) => {
  const { data, error } = await supabase
    .from('patient_thresholds')
    .select('*')
    .eq('patient_id', patientId)
    .single();

  if (error || !data) return null;
  
  return {
    heartRateMin: data.heart_rate_min,
    heartRateMax: data.heart_rate_max,
    tempMin: parseFloat(data.temp_min),
    tempMax: parseFloat(data.temp_max),
    oxygenMin: data.oxygen_min,
    bpSysMin: data.bp_systolic_min,
    bpSysMax: data.bp_systolic_max,
    bpDiaMin: data.bp_diastolic_min,
    bpDiaMax: data.bp_diastolic_max
  };
};

/**
 * Update patient thresholds
 */
export const updatePatientThresholds = async (patientId, thresholds, userId) => {
  const { error } = await supabase
    .from('patient_thresholds')
    .upsert({
      patient_id: patientId,
      heart_rate_min: thresholds.heartRateMin,
      heart_rate_max: thresholds.heartRateMax,
      temp_min: thresholds.tempMin,
      temp_max: thresholds.tempMax,
      oxygen_min: thresholds.oxygenMin,
      bp_systolic_min: thresholds.bpSysMin,
      bp_systolic_max: thresholds.bpSysMax,
      bp_diastolic_min: thresholds.bpDiaMin,
      bp_diastolic_max: thresholds.bpDiaMax,
      updated_by: userId
    }, {
      onConflict: 'patient_id'
    });

  if (error) throw error;
};

/**
 * Save vital signs reading
 */
export const saveVitalSigns = async (patientId, vitals, userId) => {
  await supabase
    .from('vital_signs_readings')
    .insert([{
      patient_id: patientId,
      heart_rate: Math.round(vitals.heartRate),
      temperature: parseFloat(vitals.temperature.toFixed(1)),
      blood_oxygen: Math.round(vitals.bloodOxygen),
      blood_pressure_systolic: Math.round(vitals.bloodPressureSys),
      blood_pressure_diastolic: Math.round(vitals.bloodPressureDia),
      recorded_by: userId
    }]);
};

/**
 * Load vital signs history
 */
export const loadVitalHistory = async (patientId) => {
  const { data, error } = await supabase
    .from('vital_signs_readings')
    .select('*')
    .eq('patient_id', patientId)
    .order('recorded_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return data || [];
};

/**
 * Log an alarm event
 */
export const logAlarm = async (patientId, vitalSign, value, thresholdMin, thresholdMax, message) => {
  await supabase
    .from('alarm_logs')
    .insert([{
      patient_id: patientId,
      alarm_type: 'critical',
      vital_sign: vitalSign,
      value: parseFloat(value.toFixed(2)),
      threshold_min: thresholdMin,
      threshold_max: thresholdMax,
      message: message
    }]);
};

/**
 * Load alarm history
 */
export const loadAlarmHistory = async (patientId) => {
  const { data, error } = await supabase
    .from('alarm_logs')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) throw error;
  return data || [];
};

/**
 * Dismiss an alarm
 */
export const dismissAlarm = async (patientId, userId, reason) => {
  const { data: recentAlarms } = await supabase
    .from('alarm_logs')
    .select('*')
    .eq('patient_id', patientId)
    .is('dismissed_at', null)
    .order('created_at', { ascending: false })
    .limit(1);

  if (recentAlarms && recentAlarms[0]) {
    await supabase
      .from('alarm_logs')
      .update({
        dismissed_at: new Date().toISOString(),
        dismissed_by: userId,
        dismissal_reason: reason
      })
      .eq('id', recentAlarms[0].id);
  }
};

/**
 * Log system action
 */
export const logSystemAction = async (userId, patientId, action, details) => {
  await supabase
    .from('system_logs')
    .insert([{
      user_id: userId,
      patient_id: patientId,
      action: action,
      details: details
    }]);
};
