'use server'

import { createServerSupabase } from '@/lib/supabase-server'

export async function getStudentDashboardData() {
  const supabase = createServerSupabase()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, subscription_status, full_name')
      .eq('id', user.id)
      .single()

    const { data: student } = await supabase
      .from('students')
      .select('school, graduation_year')
      .eq('id', user.id)
      .single()

    return {
      profile: {
        name: profile?.full_name?.split(' ')[0] || user.email?.split('@')[0],
        fullName: profile?.full_name,
        role: profile?.role,
        status: profile?.subscription_status,
        school: student?.school || "Life University",
        gradYear: student?.graduation_year || "2027"
      },
      stats: {
        readiness: 85,
        applications: 4,
        matchScore: 9.2
      }
    }
  } catch (e) {
    console.error("Student Dashboard Error:", e)
    return null
  }
}
