import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import {useForm} from "react-hook-form"
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import '..//..//css//rtl.css';

export default function EditTypeServices() {
   
    const [serv,setServ] = useState({});
    const params = useParams();
    const nav = useNavigate();

      let {register, handleSubmit, formState: {errors}} = useForm();

      useEffect(() =>{
        doApiInit();
      },[])

    const doApiInit = async() =>{
        let url = API_URL+"/typeServices/infoService/"+params.idService;
        let resp = await doApiGet(url);
        setServ(resp.data);
        console.log(resp.data);
    }

    const onSub = (_dataBody) =>{
        console.log(_dataBody);
        doApiEdit(_dataBody);
    }

    const doApiEdit = async(_dataBody) =>{
        let url = API_URL+"/typeServices/"+serv._id;
        try{
            let resp = await doApiMethod(url,"PUT",_dataBody);
            if(resp.data.modifiedCount == 1){
            toast.success("Service updated");
            nav("/admin/listServices");
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
       <h1 className='text-center'>עריכת שירות</h1>
        <label>שם השירות: </label>
        <input defaultValue={serv.name}{...register('name', {required: true, minLength:2})} type="text" className='form-control'/>
        {errors.name && <small className='text-danger d-block'>הזן שם תקין (מינימום 2 תווים)</small>}

        <label>אורך השירות: (דקות) </label>
        <input defaultValue={serv.lengthService}{...register('lengthService', {required: true, minLength:1})} type="number" className='form-control'/>
        {errors.lengthService && <small className='text-danger d-block'>הזן דקות</small>}

        <label>מחיר:</label>
        <input defaultValue={serv.price}{...register('price', {required: true, minLength:1})} type="number" className='form-control'/>
        <br/>
        <button className='btn btn-warning text-white form-control'>עדכן</button>
        <br/>
        <Link className='btn btn-danger text-white form-control mt-2' to="/admin/typeServices">חזור</Link>
       </form>
    </div>
    </React.Fragment>
  )
}
