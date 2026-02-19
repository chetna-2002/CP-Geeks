// 'use client'

// import { useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '@/hooks/useAuth'

// export default function DashboardRedirect() {
//   const { profile, loading } = useAuth()
//   const router = useRouter()

//   useEffect(() => {
//     if (!loading && profile) {
//       if (profile.role === 'admin') router.replace('/dashboard/admin')
//       else router.replace('/dashboard/user')
//     }
//   }, [profile, loading])

//   return null
// }

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardRedirect() {
  const { profile, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && profile) {
      if (profile.role === 'admin') router.replace('/dashboard/admin')
      else router.replace('/dashboard/user')
    }
  }, [profile, loading])

  if (loading) return null   // prevents flicker

  return null
}
