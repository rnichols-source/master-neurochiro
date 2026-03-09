'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EliteCard, BrandButton } from '@/components/ui/elite-ui'
import { saveProfileData } from '@/app/actions/activation-actions'
import { useRouter } from 'next/navigation'
import { 
  User, 
  MapPin, 
  Stethoscope, 
  Tag, 
  Video, 
  ChevronRight, 
  ChevronLeft,
  Check
} from 'lucide-react'

const SPECIALTY_TAGS = [
  'pediatrics', 'prenatal', 'neurology', 'family care', 'corrective care', 'athletes'
]

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
    intro_video_url: ''
  })

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
      router.push('/portal')
    } else {
      alert('Error saving profile: ' + result.error)
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <EliteCard title="Personal Information" icon={User}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">Clinic Name</label>
                  <input
                    type="text"
                    value={formData.clinic_name}
                    onChange={e => setFormData({ ...formData, clinic_name: e.target.value })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">Years Practicing</label>
                  <input
                    type="number"
                    value={formData.years_practicing}
                    onChange={e => setFormData({ ...formData, years_practicing: parseInt(e.target.value) })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
              </div>
            </EliteCard>
            <div className="flex justify-end">
              <BrandButton variant="accent" onClick={nextStep}>
                Next Step <ChevronRight className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </motion.div>
        )
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <EliteCard title="Professional Background" icon={Stethoscope}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">Chiropractic School</label>
                  <input
                    type="text"
                    value={formData.school}
                    onChange={e => setFormData({ ...formData, school: e.target.value })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">Graduation Year</label>
                  <input
                    type="number"
                    value={formData.graduation_year}
                    onChange={e => setFormData({ ...formData, graduation_year: parseInt(e.target.value) })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">Technique Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. Gonstead, Diversified, TRT..."
                    value={formData.technique_focus}
                    onChange={e => setFormData({ ...formData, technique_focus: e.target.value })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
              </div>
            </EliteCard>
            <div className="flex justify-between">
              <BrandButton variant="ghost" onClick={prevStep}>
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </BrandButton>
              <BrandButton variant="accent" onClick={nextStep}>
                Next Step <ChevronRight className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </motion.div>
        )
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <EliteCard title="Specialty Tags" icon={Tag}>
              <div className="flex flex-wrap gap-3">
                {SPECIALTY_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full border-2 text-xs font-bold uppercase tracking-widest transition-all ${
                      formData.specialty_tags.includes(tag)
                        ? 'bg-brand-orange border-brand-orange text-white shadow-md'
                        : 'border-brand-navy/10 text-brand-navy/40 hover:border-brand-orange/40'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </EliteCard>
            <div className="flex justify-between">
              <BrandButton variant="ghost" onClick={prevStep}>
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </BrandButton>
              <BrandButton variant="accent" onClick={nextStep}>
                Next Step <ChevronRight className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </motion.div>
        )
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <EliteCard title="Profile Media" icon={Video}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-brand-navy/60 uppercase tracking-widest">Introduction Video URL (Optional)</label>
                  <p className="text-[10px] text-brand-gray/60 italic mb-2">Record a short (60s) intro about why you joined the mastermind.</p>
                  <input
                    type="url"
                    placeholder="Loom, YouTube, or Vimeo link"
                    value={formData.intro_video_url}
                    onChange={e => setFormData({ ...formData, intro_video_url: e.target.value })}
                    className="w-full bg-brand-cream border-brand-navy/5 rounded-xl px-4 py-3 text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
                  />
                </div>
                <div className="p-8 border-2 border-dashed border-brand-navy/5 rounded-2xl flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-16 w-16 bg-brand-navy/5 rounded-full flex items-center justify-center text-brand-navy/40">
                    <User size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-navy uppercase tracking-widest">Upload Profile Photo</p>
                    <p className="text-[10px] text-brand-gray/60 mt-1">PNG or JPG, max 5MB</p>
                  </div>
                  <BrandButton variant="outline" size="sm">Select File</BrandButton>
                </div>
              </div>
            </EliteCard>
            <div className="flex justify-between">
              <BrandButton variant="ghost" onClick={prevStep}>
                <ChevronLeft className="mr-2 w-4 h-4" /> Back
              </BrandButton>
              <BrandButton variant="accent" onClick={handleComplete} isLoading={loading}>
                Finish Activation <Check className="ml-2 w-4 h-4" />
              </BrandButton>
            </div>
          </motion.div>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex-1 flex flex-col gap-2">
            <div className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-orange' : 'bg-brand-navy/5'}`} />
            <span className={`text-[10px] font-black uppercase tracking-widest text-center ${step === i ? 'text-brand-orange' : 'text-brand-navy/20'}`}>
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
