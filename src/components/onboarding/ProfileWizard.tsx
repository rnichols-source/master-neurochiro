'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EliteCard, BrandButton } from '@/components/ui/elite-ui'
import { saveProfileData } from '@/app/actions/activation-actions'
import { useRouter } from 'next/navigation'
import {
  User,
  Stethoscope,
  Tag,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react'

const SPECIALTY_TAGS = [
  'pediatrics', 'prenatal', 'neurology', 'family care', 'corrective care', 'athletes'
]

const STORAGE_KEY = 'neurochiro-onboarding-progress'

export default function ProfileWizard({ user, profile }: { user: any, profile: any }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    clinic_name: '',
    city: '',
    state: '',
    years_practicing: 0,
    school: '',
    graduation_year: new Date().getFullYear(),
    technique_focus: '',
    specialty_tags: [] as string[],
  })

  // Restore saved progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.formData) setFormData(prev => ({ ...prev, ...parsed.formData }))
        if (parsed.step) setStep(parsed.step)
      }
    } catch {}
  }, [])

  // Save progress on step change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, step }))
    } catch {}
  }, [formData, step])

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      specialty_tags: prev.specialty_tags.includes(tag)
        ? prev.specialty_tags.filter(t => t !== tag)
        : [...prev.specialty_tags, tag]
    }))
  }

  const handleComplete = async () => {
    setLoading(true)
    const result = await saveProfileData(user.id, formData)
    if (result.success) {
      try { localStorage.removeItem(STORAGE_KEY) } catch {}
      router.push('/portal')
    } else {
      alert('Error saving profile: ' + result.error)
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white border border-brand-navy/10 rounded-xl px-4 py-4 text-base font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange/40"

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <EliteCard title="Personal Information" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">Full Name</label>
                  <input type="text" value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">Clinic Name</label>
                  <input type="text" value={formData.clinic_name} onChange={e => setFormData({ ...formData, clinic_name: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">City</label>
                  <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">State</label>
                  <input type="text" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">Years Practicing</label>
                  <input type="number" inputMode="numeric" value={formData.years_practicing} onChange={e => setFormData({ ...formData, years_practicing: parseInt(e.target.value) || 0 })} className={inputClass} />
                </div>
              </div>
            </EliteCard>
            <div className="flex justify-end">
              <BrandButton variant="accent" onClick={nextStep} className="py-4 px-8">
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <EliteCard title="Professional Background" icon={Stethoscope}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">Chiropractic School</label>
                  <input type="text" value={formData.school} onChange={e => setFormData({ ...formData, school: e.target.value })} className={inputClass} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">Graduation Year</label>
                  <input type="number" inputMode="numeric" value={formData.graduation_year} onChange={e => setFormData({ ...formData, graduation_year: parseInt(e.target.value) || 0 })} className={inputClass} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-brand-navy ml-1">Technique Focus</label>
                  <input type="text" placeholder="e.g. Gonstead, Diversified, TRT..." value={formData.technique_focus} onChange={e => setFormData({ ...formData, technique_focus: e.target.value })} className={inputClass} />
                </div>
              </div>
            </EliteCard>
            <div className="flex justify-between">
              <BrandButton variant="ghost" onClick={prevStep} className="py-4 px-6">
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </BrandButton>
              <BrandButton variant="accent" onClick={nextStep} className="py-4 px-8">
                Next <ChevronRight className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <EliteCard title="Specialty Tags" icon={Tag}>
              <p className="text-sm text-brand-gray font-medium mb-4">Select all that apply to your practice.</p>
              <div className="flex flex-wrap gap-3">
                {SPECIALTY_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-5 py-3 rounded-xl border-2 text-sm font-bold capitalize transition-all touch-target ${
                      formData.specialty_tags.includes(tag)
                        ? 'bg-brand-orange border-brand-orange text-white shadow-md'
                        : 'border-brand-navy/10 text-brand-navy/60 hover:border-brand-orange/40'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </EliteCard>
            <div className="flex justify-between">
              <BrandButton variant="ghost" onClick={prevStep} className="py-4 px-6">
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </BrandButton>
              <BrandButton variant="accent" onClick={handleComplete} isLoading={loading} className="py-4 px-8">
                Complete Profile <Check className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex-1 flex flex-col gap-2">
            <div className={`h-2 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-orange' : 'bg-brand-navy/5'}`} />
            <span className={`text-xs font-bold text-center ${step === i ? 'text-brand-orange' : 'text-brand-navy/20'}`}>
              Step {i}
            </span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  )
}
