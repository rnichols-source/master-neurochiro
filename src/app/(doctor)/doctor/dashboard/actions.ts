'use server'

import { createServerSupabase } from '@/lib/supabase-server'

export async function getDoctorDashboardStats() {
  const supabase = createServerSupabase()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  try {
    // 1. Fetch real analytics from Supabase (Mocking queries for now until analytics tables are fully populated)
    // In production, these would be real count/sum queries on leads, views, and apps tables.
    
    // Example of a real query we'd run:
    // const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('doctor_id', user.id)
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, subscription_status, full_name')
      .eq('id', user.id)
      .single()

    const { data: doctor } = await supabase
      .from('doctors')
      .select('clinic_name')
      .eq('id', user.id)
      .single()

    // Base stats with fallback logic
    return {
      profile: {
        name: profile?.full_name || user.email?.split('@')[0],
        clinicName: doctor?.clinic_name || "My Practice",
        isMember: ['doctor_pro', 'doctor_growth', 'doctor_member'].includes(profile?.role || ''),
        role: profile?.role,
        status: profile?.subscription_status
      },
      stats: [
        { label: "Profile Views", value: "1,245", trend: "+24%" },
        { label: "Patient Leads", value: "42", trend: "+12%" },
        { label: "Seminar Clicks", value: "856", trend: "+5%" },
        { label: "Job Applications", value: "8", trend: "0%" }
      ],
      marketPerformance: {
        completeness: 99,
        reviews: 90,
        engagement: 85
      }
    }
  } catch (e) {
    console.error("Dashboard Stats Error:", e)
    return null
  }
}
