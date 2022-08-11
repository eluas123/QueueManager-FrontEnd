import React from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';


export default function AddTypeService() {
    const nav = useNavigate();
    let {register, handleSubmit, formState: {errors}} = useForm();

    const onSub = (_dataBody) =>{
      console.log(_dataBody);
      doApiAdd(_dataBody);
    }

    const doApiAdd =async(_dataBody) =>{
    let url = API_URL+"/typeServices";
    let resp2 = await doApiGet(url);
    if(resp2.data.length > 3){
      toast.error("you cant added more then 4 services edit/delete one");
      return;
    }
    try{
     let resp = await doApiMethod(url,"POST",_dataBody);
     console.log(resp.data);
     if(resp.data._id){
      toast.success("New Category added");
      nav("/admin/listServices")
     }
    }
    catch(err){
      console.log(err.response);
      toast.error("There error try again later");
    }
  }



  return (
    <div className='container'>
      <AdminAuthComp/>
      <h1>Add new Service</h1>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 p-3 shadow'>
       <label>Service Name:</label>
       <input {...register('name', {required:true, minLength:2})} type='text' className='form-control'/>
       {errors.name && <small className='text-danger d-block'>Enter valid name (min 2chars)</small>}
   
       <label>Length Service (mins): </label>
        <input {...register('lengthService', {required: true, minLength:1})} type="number" className='form-control'/>
        {errors.lengthService && <small className='text-danger d-block'>Enter Mins (minumum 20 mins)</small>}

        <label>price: </label>
        <input {...register('price', {required: true, minLength:1})} type="number" className='form-control'/>
        {errors.price && <small className='text-danger d-block'>Enter number</small>}
        <button className='btn btn-success mt-3'>Add new Service</button>
      </form>
    </div>
  )
}
