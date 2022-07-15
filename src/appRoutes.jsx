import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './comps/about'
import Home from './comps/home'
import Login from './comps/login'
import Page404 from './comps/page404'

export default function AppRoutes() {

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/*" element={<Page404/>}/>
    </Routes>
    </BrowserRouter>
  )
}
