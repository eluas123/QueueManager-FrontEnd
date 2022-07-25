import React from 'react'
import {ToastContainer} from "react-toastify"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import { AppContext } from './context/context';
import 'react-toastify/dist/ReactToastify.css';

import About from './comps/about'
import Home from './comps/home'
import Page404 from './comps/page404'
import SignUp from './comps/userCms/signUp'
import AdminLogin from './admin_comps/adminLogin'
import Login from './comps/userCms/login'
import TypeOfService from './comps/typeOfService';
import AdminHomePage from './admin_comps/adminHomePage';
import Appoitments from './admin_comps/appoitments';
import EditHours from './admin_comps/editHours';
import UserCalendar from './comps/Calendar/userCalendar';
import QueueTable from './admin_comps/admin_Calendar/queueTable';

export default function AppRoutes() {

   const [loading,setLoading]= useState(false);

  return (
    <BrowserRouter>
    <AppContext.Provider value={{loading,setLoading}}>
    <Routes>
    {/*Route User*/}
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/service" element={<TypeOfService/>}/>
    <Route path="/service/hair-men" element={<UserCalendar/>}/>
    <Route path="/service/hair-women" element={<UserCalendar/>}/>
    <Route path="/service/lack-gel" element={<UserCalendar/>}/>
    <Route path="/service/hair-fen" element={<UserCalendar/>}/>
    

    <Route path="/*" element={<Page404/>}/>
    {/*Route Admin*/}
    <Route path="/admin" element={<AdminHomePage/>}/>
    <Route path="/admin/login" element={<AdminLogin/>}/>    
    <Route path="/admin/about" element={<About/>}/>    
    <Route path="/admin/appoitments" element={<Appoitments/>}/>
    <Route path="/admin/appoitments/view-appoitments" element={<QueueTable/>}/>
    <Route path="/admin/appoitments/edithours" element={<EditHours/>}/>
   
    </Routes>
    {/*TOAST MESSAGE*/}
    <ToastContainer position="top-left" theme="dark"/>
    </AppContext.Provider>
    </BrowserRouter>
  )
}
