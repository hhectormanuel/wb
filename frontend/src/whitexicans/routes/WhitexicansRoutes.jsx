import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { MostPopularPublications } from '../components/MostPopularPublications'
import { ProfilePersons } from '../components/ProfilePersons'
import { Index } from '../pages/Index'
import { ProfilePage } from '../pages/ProfilePage'

export const WhitexicansRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Index/> } />
        <Route path="/populars" element={ <MostPopularPublications/> } />
        <Route path='/perfil/:id' element={ <ProfilePage/> }/>
        <Route path='/view/:id' element={ <ProfilePersons/> }/>
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
