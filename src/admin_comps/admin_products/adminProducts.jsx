import React from 'react'
import { toast } from 'react-toastify';
import {useForm} from "react-hook-form"
import { API_URL, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import '..//..//css//rtl.css';

export default function AdminProducts() {
    let {register, handleSubmit, formState: {errors}} = useForm();

    const onSub = (_dataBody) =>{
      console.log(_dataBody);
      doApiAdd(_dataBody);
    }

    const doApiAdd =async(_dataBody) =>{
    let url = API_URL+"/products";
    try{
     let resp = await doApiMethod(url,"POST",_dataBody);
     console.log(resp.data);
     if(resp.data._id){
      toast.success("New product added");
     }
    }
    catch(err){
      console.log(err.response);
      toast.error("There error try again later");
    }
  }
  return (
    <React.Fragment>
    <AdminHeader/>
    <AdminAuthComp/>
  <div className='container rtlFluid d-flex justify-content-center'>
    <form onSubmit={handleSubmit(onSub)} className='col-md-4 p-3 shadow mt-5'>
    <h1 className='text-center'>הוספת מוצר למערכת</h1>
     <label>שם מוצר:</label>
     <input {...register('name', {required:true, minLength:2, maxLength:99})} type='text' className='form-control'/>
     {errors.name && <small className='text-danger d-block'>הכנס שם תקין(מינימום 2 תווים)</small>}
 
     <label> קישור לתמונוה:</label>
      <input {...register('img_url', {required: true, minLength:2})} type="text" className='form-control'/>
      {errors.lengthService && <small className='text-danger d-block'>הזן לינק לתמונה </small>}

      <label>תאור המוצר: </label>
      <input {...register('Description', {minLength:2})} type="text" className='form-control'/>

      <label>מחיר: </label>
      <input {...register('price', {minLength:2})} type="number" className='form-control'/>
      <button className='btn btn-success mt-3 form-control'>הוספת מוצר </button>
    </form>
  </div>
  </React.Fragment>
  )
}
