import React from 'react'
import {ToastContainer} from "react-toastify"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import About from './comps/about'
import Home from './comps/home'
import Page404 from './comps/page404'
import SignUp from './comps/userCms/signUp'
import AdminLogin from './admin_comps/adminLogin'
import Login from './comps/userCms/login'

export default function AppRoutes() {

  return (
    <BrowserRouter>
    <Routes>
    {/*Route User*/}
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/*" element={<Page404/>}/>
    {/*Route Admin*/}
    <Route path="/admin/login" element={<AdminLogin/>}/>
    </Routes>
    {/*TOAST MESSAGE*/}
    <ToastContainer position="top-left" theme="dark"/>
    </BrowserRouter>
  )
}
