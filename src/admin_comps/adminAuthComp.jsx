import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { API_URL, doApiGet } from '../services/apiService';

export default function AdminAuthComp() {
   const nav = useNavigate();

   useEffect(() =>{
    doApi();
   },[])

   const doApi = async() =>{
    try{
        let url = API_URL+"/users/checkToken";
        let resp = await doApiGet(url);
        if(resp.data.role != "admin"){
            logOutAdmin("You must be admin to be here");
        }
    }
    catch(err){
        logOutAdmin("Please login to be here or token expired")
    }
}
        const logOutAdmin = (_msg) =>{
            toast.warning(_msg);
            nav("/admin/login");
        }
  return (
    <React.Fragment></React.Fragment>
  )
}
