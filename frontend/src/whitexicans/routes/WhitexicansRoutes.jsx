import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Index } from '../pages/Index'

export const WhitexicansRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={ <Index/> } />
        <Route path="/*" element={ <Navigate to="/" /> } />
    </Routes>
  )
}
