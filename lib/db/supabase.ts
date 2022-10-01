import { createClient } from '@supabase/supabase-js';

console.log('API URL: ', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('API KEY: ', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const supabase = createClient(
  // @ts-ignore
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);