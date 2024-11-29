'use client';

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview } from '@/lib/gtag'

export default function useGoogleAnalytics() {
  const pathname = usePathname()
  
  useEffect(() => {
    try {
      const searchParams = useSearchParams()
      const url = pathname + (searchParams?.toString() || '')
      pageview(url)
    } catch (error) {
      // Fallback to just pathname if searchParams is not available
      pageview(pathname)
    }
  }, [pathname])
}
