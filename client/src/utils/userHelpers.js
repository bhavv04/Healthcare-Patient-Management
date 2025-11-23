import { supabase } from '../supabaseClient';

/**
 * Get the role of the current user
 */
export const getUserRole = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data?.role || 'patient';
  } catch (error) {
    console.error('Error fetching user role:', error);
    return 'patient'; // Default to patient
  }
};

/**
 * Check if user is an admin
 */
export const isAdmin = async (userId) => {
  const role = await getUserRole(userId);
  return role === 'admin';
};

/**
 * Create or update user role
 */
export const setUserRole = async (userId, role) => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role: role })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error setting user role:', error);
    throw error;
  }
};

/**
 * Get patient profile for logged-in patient user
 */
export const getPatientProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    return null;
  }
};

/**
 * Create patient profile for a new patient user
 */
export const createPatientProfile = async (userId, patientData) => {
  try {
    const { data, error } = await supabase
      .from('patients')
      .insert({
        user_id: userId,
        ...patientData
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating patient profile:', error);
    throw error;
  }
};
