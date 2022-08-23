import React from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import '..//..//css//rtl.css';



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
    <React.Fragment>
      <AdminHeader/>
      <AdminAuthComp/>
    <div className='container d-flex justify-content-center rtlFluid'>
      <form onSubmit={handleSubmit(onSub)} className='col-md-4 p-3 shadow mt-5'>
      <h1 className='text-center'>הוספת שירות למערכת</h1>
       <label>שם השירות:</label>
       <input {...register('name', {required:true, minLength:2})} type='text' className='form-control'/>
       {errors.name && <small className='text-danger d-block'>הכנס שם תקין(מינימום 2 תווים)</small>}
   
       <label>אורך השירות (דקות):</label>
        <select {...register('lengthService',{required:true,})} className='form-control'>
          <option>30</option>
          <option>60</option>
          <option>90</option>
          <option>120</option>
        </select>

        <label>מחיר: </label>
        <input {...register('price', {minLength:1})} type="number" className='form-control'/>
        <button className='btn btn-success mt-3 form-control'>הוספת שירות חדש</button>
      </form>
    </div>
    </React.Fragment>
  )
}
