'use client'

import { createClient } from '@/utils/supabase/client'

export const useAuth = () => {
  const supabase = createClient()

  const signUp = async (email: string, password: string) => {
    return await supabase.auth.signUp({ email, password })
  }

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }

  const signOut = async () => {
    return await supabase.auth.signOut()
  }

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    return data.user
  }

  return { signUp, signIn, signOut, getUser }
}
