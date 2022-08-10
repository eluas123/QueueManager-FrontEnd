import React from 'react'
import { useContext } from 'react';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/context';
import { API_URL, doApiGet, doApiMethod, TOKEN_NAME } from '../../services/apiService';

export default function SignUp() {

    const nav = useNavigate();
    const{register , handleSubmit , formState: { errors } } = useForm();
    const {setUserInfo,userInfo} = useContext(AppContext)
    const onSub = (_dataBody) =>{
      console.log(_dataBody);
      doApi(_dataBody);
    }

       const doApi = async(_dataBody) =>{
        let url = API_URL+"/users/login";
        try{
        let resp = await doApiMethod(url,"POST",_dataBody);
       
        if(resp.data.token){
          localStorage.setItem(TOKEN_NAME,resp.data.token)
            toast.success("You logged in");
            setUserInfo(resp.data.user)
            localStorage.setItem('userInfo',JSON.stringify(userInfo))
            nav("/");
        }
    
        else{
            toast.error("There is problem come back later");
        }
    }
    catch(err){
      toast.error("User or password wrong");
       }
    }

  return (
        <div className='container'>
      <h1 className='display-5 text-center'>Log in</h1>
      <form onSubmit={handleSubmit(onSub)} className="col-md-6 p-3 shadow mx-auto">
        <label>Phone:</label>
        <input {...register("phone",{required:true, minLength:10,maxLength:10})} type="text" className="form-control"/>
        {errors.phone && <small className='d-block text-danger'>*Enter valid Phone Number </small>}
        <label>Password:</label>
        <input {...register("password", {required:true,minLength:3})}type="password" className="form-control"/>
        {errors.password && <small className='d-block text-danger'>*Enter valid Password (min 3 chars)</small>}
        <button className='btn btn-info mt-3'>Log in</button>
      </form>
    </div>
  )
}
