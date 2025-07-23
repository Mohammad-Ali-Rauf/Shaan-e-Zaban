'use client'

import { set } from 'sanity'
import { TextInput } from '@sanity/ui'
import { jwtDecode } from 'jwt-decode'
import { useEffect } from 'react'

type JWT = { email?: string }

export function UserEmailInput({ value, onChange }: any) {
  useEffect(() => {
    const token = getTokenFromCookies()
    if (token) {
      try {
        const decoded: JWT = jwtDecode(token)
        if (decoded.email && decoded.email !== value) {
          onChange(set(decoded.email))
        }
      } catch (err) {
        console.error('JWT decode failed:', err)
      }
    }
  }, [value, onChange])

  const getTokenFromCookies = () => {
    const cookies = document.cookie.split('; ')
    const cookie = cookies.find(c =>
      c.startsWith('__Secure-next-auth.session-token=') ||
      c.startsWith('next-auth.session-token=')
    )
    return cookie?.split('=')[1] ?? null
  }

  return <TextInput readOnly value={value || ''} />
}