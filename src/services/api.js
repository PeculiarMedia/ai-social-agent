import { supabase } from './supabaseClient'

export const generateContent = async (prompt, user_id) => {
  try {
    const { data, error } = await supabase.functions.invoke('generateContent', {
      body: { prompt, user_id }
    })

    if (error) throw error
    return data
  } catch (err) {
    console.error('Edge Function error:', err.message)
    return null
  }
}
