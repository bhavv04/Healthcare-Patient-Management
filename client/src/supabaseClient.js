import { createClient } from '@supabase/supabase-js';

// Get keys from the .env.local file
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// This exports a single 'supabase' client for your whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

