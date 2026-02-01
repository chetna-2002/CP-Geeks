'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async () => {
    if (password.length < 8) {
      alert('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert('Password updated successfully')
      router.push('/login')
    }

    setLoading(false)
  }

  return (
    <div>
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleResetPassword} disabled={loading}>
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </div>
  )
}
