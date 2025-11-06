import { useState } from 'react';
import { supabase } from './supabaseClient'; // Import our client

// Pass `showLogin` as a prop so we can switch back
function Register({ showLogin }) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');