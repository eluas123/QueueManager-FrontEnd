import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../services/apiService';
import AdminAuthComp from './adminAuthComp';
import {useForm} from "react-hook-form"

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
    <div className='container'>
        <AdminAuthComp/>
        <h1>Edit Service</h1>
       <form onSubmit={handleSubmit(onSub)} className='col-md-6 p-3 shadow'>
        <label>Service name: </label>
        <input defaultValue={serv.name}{...register('name', {required: true, minLength:2})} type="text" className='form-control'/>
        {errors.name && <small className='text-danger d-block'>Enter valid name (min 2 chars)</small>}

        <label>Length Service (mins): </label>
        <input defaultValue={serv.lengthService}{...register('lengthService', {required: true, minLength:1})} type="number" className='form-control'/>
        {errors.lengthService && <small className='text-danger d-block'>Enter Mins (minumum 20 mins)</small>}

        <label>price: </label>
        <input defaultValue={serv.price}{...register('price', {required: true, minLength:1})} type="number" className='form-control'/>
        {errors.price && <small className='text-danger d-block'>Enter number</small>}
        <br/>
        <button className='btn btn-warning mt-3'>Update Service</button>
        <Link className='btn btn-danger ms-3 mt-3' to="/admin/typeServices">Back</Link>
       </form>
    </div>
  )
}
