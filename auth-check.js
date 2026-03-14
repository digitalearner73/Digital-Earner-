import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"

const supabaseUrl = "https://clbasxqamthvxrtnuqht.supabase.co"
const supabaseKey = "sb_publishable_TQ1uOFcqdY2hOdONCmwUtw_ZfqysYAe"
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkAuthAndRedirect() {
  const { data: { session } } = await supabase.auth.getSession()
  
  // Current page ka naam lo
  const currentPage = window.location.pathname.split('/').pop()
  
  // Public pages jinpar bina login ke ja sakte hain
  const publicPages = ['index.html', 'login.html', 'register.html', 'about.html', 'how-it-works.html', 'performance.html']
  
  if (session) {
    // User login hai
    console.log("User logged in:", session.user.email)
    
    // Agar login/register page par hai to dashboard bhejo
    if (currentPage === 'login.html' || currentPage === 'register.html') {
      window.location.href = 'dashboard.html'
    }
  } else {
    // User login nahi hai
    console.log("No user logged in")
    
    // Agar protected page par hai to login par bhejo
    if (!publicPages.includes(currentPage)) {
      window.location.href = 'login.html'
    }
  }
}

// Jab bhi page load ho, check karo
checkAuthAndRedirect()

// Auth changes sunte raho (login/logout)
supabase.auth.onAuthStateChange((event, session) => {
  console.log("Auth event:", event)
  
  if (event === 'SIGNED_IN') {
    window.location.href = 'dashboard.html'
  } else if (event === 'SIGNED_OUT') {
    const currentPage = window.location.pathname.split('/').pop()
    if (!['index.html', 'login.html', 'register.html'].includes(currentPage)) {
      window.location.href = 'index.html'
    }
  }
})