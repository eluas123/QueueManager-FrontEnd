import React from 'react'
import { toast } from 'react-toastify';
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod, TOKEN_NAME } from '../services/apiService';
import '..//css//adminLogin.css';

export default function AdminLogin() {

  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate();

  const onSub = (_bodyData) =>{
    // console.log(_bodyData);
    doApiLogin(_bodyData);
  }

  const doApiLogin = async(_bodyData) => {
    try{
      let url = API_URL+"/users/login";
      let resp = await doApiMethod(url,"POST",_bodyData);
      console.log(resp.data);
      ///check if we get token and save it in localSorage
      if(resp.data.token){
        localStorage.setItem(TOKEN_NAME, resp.data.token);
        nav("/admin/appoitments");
        toast.success("You logged in");
      }
    }
    catch(err){
    console.log("err",err.response);
    toast.error("user or password wrong")
    }
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-center adminLogin'>
      <form onSubmit={handleSubmit(onSub)} className="col-md-5 p-3 shadow mt-5">
      <h1 className='text-center'>Admin login</h1>
        <label className='mt-2'>Phone:</label>
        <input {...register("phone",{required:true, minLength:10,maxLength:10})} type="text" className="form-control"/>
        {errors.phone && <small className='d-flex text-danger'>*Enter valid Phone Number </small>}
        <label className='mt-2'>Password:</label>
        <input {...register("password", {required:true,minLength:3})}type="password" className="form-control"/>
        {errors.password && <small className='d-flex text-danger'>*Enter valid Password (min 3 chars)</small>}
        <button className='btn btn-info mt-3 form-control'>Login</button>
      </form>
    </div>
    </div>
  )
}
