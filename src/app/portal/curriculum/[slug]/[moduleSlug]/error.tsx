'use client'

import { useEffect } from 'react'
import { BrandButton } from '@/components/ui/elite-ui'
import { AlertCircle, RotateCcw, Home } from 'lucide-react'
import Link from 'next/link'

export default function ModuleError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[MODULE ERROR]', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-8">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center">
        <AlertCircle size={40} className="text-red-500" />
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-brand-navy tracking-tight">Unit Access Error</h1>
        <p className="text-brand-gray max-w-md mx-auto">
          We encountered an issue loading this specific training unit. 
          This is typically due to a missing video link or a temporary sync delay.
        </p>
        {error.digest && (
          <p className="text-[10px] font-mono text-brand-navy/20 uppercase tracking-widest mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <BrandButton variant="primary" onClick={() => reset()} className="w-full">
          <RotateCcw className="mr-2 w-4 h-4" /> Try Again
        </BrandButton>
        <Link href="/portal/curriculum" className="w-full">
          <BrandButton variant="outline" className="w-full">
            <Home className="mr-2 w-4 h-4" /> Back to Curriculum
          </BrandButton>
        </Link>
      </div>
    </div>
  )
}
