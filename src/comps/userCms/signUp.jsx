import React from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiMethod } from '../../services/apiService';

export default function SignUp() {

    const nav = useNavigate();
    const{register , handleSubmit , getValues, formState: { errors } } = useForm();

    const onSub = (_dataBody) =>{
        delete _dataBody.password2;
      console.log(_dataBody);
      doApi(_dataBody);
    }

       const doApi = async(_dataBody) =>{
        let url = API_URL+"/users";
        try{
        let resp = await doApiMethod(url,"POST",_dataBody);
        if(resp.data._id){
            toast.success("You sign up succefuly, now log in");
            nav("/login");
        }
        else{
            toast.error("There is problem come back later");
        }
    }
    catch(err){
        ////respond axios error
        console.log(err.response);
        if(err.response.data.code === 11000){
            toast.error("phone already in system, try again login");
        }
        else{
            toast.error("There is problem came back later");
        }
    }
       }


  return (
        <div className='container'>
      <h1 className='display-5 text-center'>Sign up as new User: </h1>
      <form onSubmit={handleSubmit(onSub)} className="col-md-6 p-3 shadow mx-auto">
      <label>Name:</label>
        <input {...register("name",{required:true, minLength:2})} type="text" className="form-control"/>
        {errors.name && <small className='d-block text-danger'>*Enter valid Name (minumum 2 chars) </small>}
        <label>Phone:</label>
        <input {...register("phone",{required:true, minLength:10,maxLength:10})} type="text" className="form-control"/>
        {errors.phone && <small className='d-block text-danger'>*Enter valid Phone Number </small>}
        <label>Password:</label>
        <input {...register("password", {required:true,minLength:3})}type="password" className="form-control"/>
        {errors.password && <small className='d-block text-danger'>*Enter valid Password (min 3 chars)</small>}
        <label>Enter Password again:</label>
        <input {...register("password2", {required:true,validate:(value) =>{
            return value === getValues("password")
        }})}type="password" className="form-control"/>
        {errors.password2 && <small className='d-flex text-danger'>*Password not match</small>}
        <button className='btn btn-info mt-3'>Sign up</button>
      </form>
    </div>
  )
}
