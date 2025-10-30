// supabase/edge-functions/generateContent/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// connect to your Supabase project using env variables
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  try {
    const { prompt, user_id } = await req.json();

    // ✨ simple mock AI generation (replace later with real API)
    const aiResponse = {
      caption: `Here's an engaging caption about ${prompt}`,
      hashtags: "#ai #socialmedia #creativity",
      image_idea: `A visual representing ${prompt}`
    };

    // save the log in your ai_logs table
    await supabase.from("ai_logs").insert([
      { user_id, prompt, response: aiResponse }
    ]);

    // return the AI response
    return new Response(JSON.stringify(aiResponse), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
