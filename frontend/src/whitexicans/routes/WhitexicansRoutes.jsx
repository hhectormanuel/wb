import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Index } from '../pages/Index'
import { ProfilePage } from '../pages/ProfilePage'

export const WhitexicansRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Index/> } />
        <Route path='/perfil/:id' element={ <ProfilePage/> }/>
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
