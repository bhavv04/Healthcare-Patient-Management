// Test script to check patient username query
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testPatientQuery() {
  console.log('Testing patient query...');
  
  // First, get all patients to see what's in the database
  const { data: allPatients, error: allError } = await supabase
    .from('patients')
    .select('id, name, username');
  
  console.log('All patients:', allPatients);
  console.log('Error (if any):', allError);
  
  // Then test specific username
  const testUsername = 'bhavde6508918';
  console.log('\nTesting username:', testUsername);
  
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('username', testUsername);
  
  console.log('Specific query result:', data);
  console.log('Error (if any):', error);
}

testPatientQuery();
