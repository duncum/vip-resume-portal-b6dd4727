// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://fvmnltvgvmrgrxqnnlog.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2bW5sdHZndm1yZ3J4cW5ubG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDgzOTAsImV4cCI6MjA1OTc4NDM5MH0.h72Xp7KGWqa1g3PqhBmTqo-cSFzP1Mg6Oehm_laFCIM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);