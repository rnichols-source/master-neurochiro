'use server'

import { createServerSupabase } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { Automations } from '@/lib/automations'

import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createServerSupabase()

  // 🛡️ Perspective Bypass Logic (For UX Demo & Audit)
  // This allows viewing the site from different roles using the sandbox buttons
  if (email.endsWith('@neurochiro.com')) {
    console.log("[DEMO MODE] Activating perspective bypass for:", email);
    
    let role = 'public';
    if (email.includes('admin')) role = 'admin';
    else if (email.includes('vendor')) role = 'vendor';
    else if (email.includes('patient')) role = 'patient';
    else if (email.includes('student_paid')) role = 'student_paid';
    else if (email.includes('student')) role = 'student_free';
    else if (email.includes('doctor_pro')) role = 'doctor_pro';
    else if (email.includes('doctor_growth')) role = 'doctor_growth';
    else if (email.includes('doctor')) role = 'doctor_member';

    // Set a secure demo cookie that the proxy will respect
    const cookieStore = await cookies();
    cookieStore.set('nc_demo_role', role, { 
      path: '/', 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 2 // 2 hours
    });

    if (role === "admin") return redirect("/admin/dashboard");
    if (role === "vendor") return redirect("/vendor/dashboard");
    if (role === "patient") return redirect("/portal/dashboard");
    if (role.startsWith("student")) return redirect("/student/dashboard");
    if (role.startsWith("doctor")) return redirect("/doctor/dashboard");
    
    return redirect("/doctor/dashboard");
  }

  // 🚀 Production Logic (Standard Supabase Auth)
  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?error=auth_failed`)
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  const role = profile?.role || 'public'

  if (role === "admin") return redirect("/admin/dashboard")
  if (role.startsWith("doctor")) return redirect("/doctor/dashboard")
  if (role.startsWith("student")) return redirect("/student/dashboard")
  if (role === "patient") return redirect("/portal/dashboard")
  if (role === "vendor") return redirect("/vendor/dashboard")
  
  return redirect("/")
}

export async function signInWithProvider(provider: 'google' | 'apple') {
  const supabase = createServerSupabase()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  if (data.url) {
    return redirect(data.url)
  }
}

export async function register(formData: FormData, role: string, tier: string, billingCycle: string = 'monthly') {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const supabase = createServerSupabase()

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    if (role === "doctor") return redirect("/doctor/dashboard")
    if (role === "student") return redirect("/student/dashboard")
    return redirect("/")
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
        role: role,
        tier: tier,
        billing_cycle: billingCycle
      }
    }
  })

  if (error) {
    return redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  // Trigger Welcome Automation
  if (data?.user) {
    Automations.onSignup(data.user.id, email, name);
  }
  
  if (role === "doctor") return redirect("/doctor/dashboard")
  if (role === "student") return redirect("/student/dashboard")
  if (role === "patient") return redirect("/portal/dashboard")
  
  return redirect("/")
}
