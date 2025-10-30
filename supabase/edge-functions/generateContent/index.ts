import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js"

const supabase = createClient(Deno.env.get("https://gksvudeydddtdclztzuq.supabase.co")!, Deno.env.get("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdrc3Z1ZGV5ZGRkdGRjbHp0enVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTczOTA0NywiZXhwIjoyMDc3MzE1MDQ3fQ.LWtIA-0zMsl5T3YnDO-peXnKsau6Tic7L1hk1Pl2q4k")!)

serve(async (req) => {
  const { prompt } = await req.json()

  // Example AI call placeholder
  const aiResponse = {
    caption: `Your perfect post about ${prompt}`,
    hashtags: "#ai #socialmedia #innovation"
  }

  // Store result in DB
  await supabase.from("ai_logs").insert([{ prompt, response: aiResponse }])

  return new Response(JSON.stringify(aiResponse), { headers: { "Content-Type": "application/json" } })
})
