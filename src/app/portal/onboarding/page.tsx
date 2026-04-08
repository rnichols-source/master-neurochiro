import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import ProfileWizard from '@/components/onboarding/ProfileWizard'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('status, full_name')
    .eq('id', user.id)
    .single()

  if (profile?.status === 'profile_completed') {
    redirect('/portal')
  }

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-brand-orange font-bold uppercase tracking-wider text-xs">
            Activation Phase
          </p>
          <h1 className="text-4xl font-black text-brand-navy tracking-tight">
            Complete Your Command Center Profile
          </h1>
          <p className="text-brand-gray font-medium max-w-lg mx-auto">
            Before we grant full access to the mastermind curriculum, we need to calibrate your identity and professional profile.
          </p>
        </div>

        <ProfileWizard user={user} profile={profile} />
      </div>
    </div>
  )
}
