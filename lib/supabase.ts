import { createClient } from '@supabase/supabase-js'

import { type Database } from '@/types/database'

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error(
    '🛑 Oops! Looks like the Supabase URL or ANON key took a vacation. Please check your environment variables and try again! 🌴',
  )
}

const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
)

export default supabase
