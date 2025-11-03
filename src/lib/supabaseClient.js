import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://bvgmaztjetcbnvnucbpw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2Z21henRqZXRjYm52bnVjYnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5MDc4NTAsImV4cCI6MjA3NjQ4Mzg1MH0.g35d0Cu_I9gUeIa9D2NgjTPhA9-Jt05HumwGWuiQpPw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
