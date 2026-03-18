import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rgauauhykivwollavzjp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYXVhdWh5a2l2d29sbGF2empwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4NjA3ODgsImV4cCI6MjA4OTQzNjc4OH0.sJuaeTmYbZcEtwlmfosgiWJnfo8jtNq8BPCCjjF8Y7I"
);
