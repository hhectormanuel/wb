import React from 'react'
import { AuthProvider } from './auth/context/AuthProvider'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './UI/theme/AppTheme'
import { CreateProvider } from './whitexicans/context/CreateProvider'

export const WhitexicansBlog = () => {
  return (
    <>
        <AppTheme>
            <AuthProvider>
              <CreateProvider>
                <AppRouter/>
              </CreateProvider>
            </AuthProvider>
        </AppTheme>
    </>
  )
}
