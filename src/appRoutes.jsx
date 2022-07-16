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
import TypeOfService from './comps/typeOfService';
import QueueTable from './comps/queueTable';
import AdminHomePage from './admin_comps/adminHomePage';
import Appoitments from './admin_comps/appoitments';
import { useEffect } from 'react';
import axios from 'axios';

export default function AppRoutes() {

   useEffect (() =>{
   doApi();
   },[])

    const doApi = async() =>{
      console.log("elias");
    }

  return (
    <BrowserRouter>
    <Routes>
    {/*Route User*/}
    <Route path="/" element={<Home/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/service" element={<TypeOfService/>}/>
    <Route path="/service/hair-men" element={<QueueTable/>}/>
    <Route path="/service/hair-women" element={<QueueTable/>}/>
    <Route path="/service/lack-gel" element={<QueueTable/>}/>
    <Route path="/service/hair-fen" element={<QueueTable/>}/>
    

    <Route path="/*" element={<Page404/>}/>
    {/*Route Admin*/}
    <Route path="/admin" element={<AdminHomePage/>}/>
    <Route path="/admin/login" element={<AdminLogin/>}/>    
    <Route path="/admin/about" element={<About/>}/>    
    <Route path="/admin/appoitments" element={<Appoitments/>}/>
    <Route path="/admin/appoitments/view-appoitments" element={<QueueTable/>}/>
   
    </Routes>
    {/*TOAST MESSAGE*/}
    <ToastContainer position="top-left" theme="dark"/>
    </BrowserRouter>
  )
}
