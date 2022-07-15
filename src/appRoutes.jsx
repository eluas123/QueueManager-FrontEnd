import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginAdmin from './admin_comps/loginAdmin'
import About from './comps/about'
import Home from './comps/home'
import Page404 from './comps/page404'

export default function AppRoutes() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/admin" element={<LoginAdmin/>}/>
    <Route path="/*" element={<Page404/>}/>
    </Routes>
    </BrowserRouter>
  )
}
