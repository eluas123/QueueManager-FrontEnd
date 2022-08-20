import React from 'react'
import {ToastContainer } from "react-toastify"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import { AppContext } from './context/context';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

import About from './comps/about'
import Home from './comps/home'
import Page404 from './comps/page404'
import SignUp from './comps/userCms/signUp'
import AdminLogin from './admin_comps/adminLogin'
import Login from './comps/userCms/login'
import QueueTable from './admin_comps/admin_Calendar/queueTable';
import ListWorkHours from './admin_comps/workHours/listWorkHours';
import AddWorkHours from './admin_comps/workHours/addWorkHours';
import EditWorkHours from './admin_comps/workHours/editWorkHours';
import UserList from './admin_comps/users/userList';
import CategoriesList from './comps/categories/categoriesList';
import Appointments from './comps/appointments/appointments';
import TypeServicesList from './admin_comps/typeServices/typeServicesList';
import EditTypeServices from './admin_comps/typeServices/editTypeServices';
import AddTypeService from './admin_comps/typeServices/addTypeService';
import { useEffect } from 'react';
import { API_URL, doApiGet, TOKEN_NAME } from './services/apiService';
import LogOut from './comps/userCms/logOut';
import UserAppointments from './comps/appointments/userAppointments';

export default function AppRoutes() {
   const [user,setUser] = useState({name:"",role:""});
  const DateNow = moment().format("DD-MM-YYYY");

   useEffect(()=>{
    if(localStorage[TOKEN_NAME]){
      doApiUserInfo();
    }
   },[])

    const doApiUserInfo = async()=>{
      let url = API_URL+"/users/userInfo";
      let resp = await doApiGet(url);
      setUser({name: resp.data.name ,role: resp.data.role, id:resp.data._id, phone:resp.data.phone});
    }

  return (
    <BrowserRouter>
    <AppContext.Provider value={{
      DateNow,
      user,
      setUser,
      doApiUserInfo,
      }}>
    <Routes>
    {/*Route User*/}
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/logout" element={<LogOut/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/service" element={<CategoriesList/>}/>  
    {user && <Route path="/userAppointments" element={<UserAppointments/>}/>}
    <Route path="/appointments/:idService" element={<Appointments/>}/>    

    <Route path="/*" element={<Page404/>}/>
    {/*Route Admin*/}
    <Route path="/admin" element={<AdminLogin/>}/>    
    <Route path="/admin/appoitments" element={<QueueTable/>}/>
    <Route path="/admin/ListUsers" element={<UserList/>}/>
    <Route path="/admin/listServices" element={<TypeServicesList/>}/>
    <Route path="/admin/editService/:idService" element={<EditTypeServices/>}/>
    <Route path="/admin/addService" element={<AddTypeService/>}/>
    <Route path="/admin/listWorkHours" element={<ListWorkHours/>}/>
    <Route path="/admin/addWorkHours" element={<AddWorkHours/>}/>
    <Route path="/admin/editWorkHours/:idWorkHours" element={<EditWorkHours/>}/>
    </Routes>
    {/*TOAST MESSAGE*/}
    <ToastContainer position="top-left" theme="dark"/>
    </AppContext.Provider>
    </BrowserRouter>
  )
}
