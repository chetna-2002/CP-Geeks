// 'use client'

// import { useEffect, useState } from 'react'
// import { createClient } from '@/utils/supabase/client'

// export const useAuth = () => {
//   const supabase = createClient()

//   const [user, setUser] = useState<any>(null)
//   const [profile, setProfile] = useState<any>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser()
//       setUser(user)

//       if (user) {
//         const { data } = await supabase
//           .from('profiles')
//           .select('*')
//           .eq('id', user.id)
//           .single()

//         setProfile(data)
//       }

//       setLoading(false)
//     }

//     loadUser()
//   }, [])

//   const signUp = async (email: string, password: string) => {
//     return await supabase.auth.signUp({ email, password })
//   }

//   const signIn = async (email: string, password: string) => {
//     return await supabase.auth.signInWithPassword({ email, password })
//   }

//   const signOut = async () => {
//     return await supabase.auth.signOut()
//   }

//   return {
//     user,
//     profile,
//     loading,
//     signUp,
//     signIn,
//     signOut
//   }
// }

'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export const useAuth = () => {
  const supabase = createClient()

  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        setProfile(data)
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  return { user, profile, loading }
}
