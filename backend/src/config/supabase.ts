import { createClient } from '@supabase/supabase-js';
import { env } from './env';

// Initialize the Supabase client
export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false // For a server-to-server or API scenario
  }
});
