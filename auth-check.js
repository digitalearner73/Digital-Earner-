import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"

const supabaseUrl = "https://clbasxqamthvxrtnuqht.supabase.co";
const supabaseKey = "sb_publishable_TQ1uOFcqdY2hOdONCmwUtw_ZfqysYAe";

const supabase = createClient(supabaseUrl, supabaseKey);

window.startNow = async function() {
  
  const { data: { session } } = await supabase.auth.getSession();
  
  if (session) {
    
    window.location.href = "dashboard.html";
    
  } else {
    
    window.location.href = "login.html";
    
  }
  
}