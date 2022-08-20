import React from 'react'
import { AuthProvider } from './auth/context/AuthProvider'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './UI/theme/AppTheme'

export const WhitexicansBlog = () => {
  return (
    <>
        <AppTheme>
            <AuthProvider>
                <AppRouter/>
            </AuthProvider>
        </AppTheme>
    </>
  )
}
