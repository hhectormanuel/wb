import React from 'react'
import { Navbar } from '../../UI/Navbar'
import { Sidebar } from '../../UI/Sidebar'
import { Publicaciones } from '../components/Publicaciones'

export const PagesLayout = ({ children }) => {
  return (
    <>
        <Navbar/>
        <Sidebar/>
        { children }
    </>
  )
}
