import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../services/apiService';

export default function ClientAuthComp() {
    const nav = useNavigate();

    useEffect(() =>{
        doApi();
    },[])

    const doApi = async() =>{
        try{
            let url = API_URL+"/users/checkToken";
            let resp = await doApiGet(url);
            if(!resp.data.role){
                checkLogin("You must be log in to invite the appointment");
            }
        }
        catch(err){
            console.log(err.response);
            checkLogin("Please login to be here");
        }
    }

     const checkLogin =(_msg)=>{
        toast.warning(_msg);
        nav("/login");
     }

  return (
    <React.Fragment></React.Fragment>
  )
}
