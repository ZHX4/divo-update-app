import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vzuuntsfdpwnwxwjhcuj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6dXVudHNmZHB3bnd4d2poY3VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTY5NjIsImV4cCI6MjA1OTA5Mjk2Mn0.f8Q6NS_po7yvWB9Y5R4tPQrZGP2aFFmyWFeQoPexong';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase credentials are required');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
