import { Settings } from '@mui/icons-material'
import React, { useContext } from 'react'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthContext } from '../../auth/context/AuthContext'
import { FollowPublications } from '../components/FollowPublications'
import { MostPopularPublications } from '../components/MostPopularPublications'
import { ProfilePersons } from '../components/ProfilePersons'
import { About } from '../pages/About'
import { Index } from '../pages/Index'
import { ProfilePage } from '../pages/ProfilePage'
import { PublicationsView } from '../pages/PublicationsView'
import { PubliPage } from '../pages/PubliPage'
import { SettingsPage } from '../pages/SettingsPage'

export const WhitexicansRoutes = () => {

  const { getMostPopularPublications, getFollowsPublications, onRefreshPublications } = useContext(AuthContext);
  useEffect(() => {
    getMostPopularPublications();
    getFollowsPublications();
    onRefreshPublications();
  }, []);
  

  return (
    <Routes>
        <Route path="/" element={ <FollowPublications/> } />
        <Route path="/populars" element={ <MostPopularPublications/> } />
        <Route path='/publication/:id' element={ <PublicationsView/> } />
        <Route path="/follows" element={ <FollowPublications/> } />
        <Route path='/perfil/:id' element={ <ProfilePage/> }/>
        <Route path='/view/:id' element={ <ProfilePersons/> }/>
        <Route path='/settings/:id' element={ <SettingsPage/> }/>
        <Route path='/publicidad' element={ <PubliPage/> }/>
        <Route path='/about' element={ <About/> }/>
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
