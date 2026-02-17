import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client for server-side use (RSC, Server Actions, API Routes).
 * Uses the anon key for public reads; RLS policies handle authorization.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
