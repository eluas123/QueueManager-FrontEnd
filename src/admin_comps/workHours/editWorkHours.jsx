import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import {useForm} from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';

export default function EditWorkHours() {

    const [wrk,setWrk] = useState({});
    const params = useParams();
    const nav = useNavigate();

    let {register, handleSubmit, formState: {errors}} = useForm();

    useEffect(() =>{
      doApiInit();
    },[])

    ///for collect data to input that edited;;
    const doApiInit = async() =>{
      let url = API_URL+"/workHours/infoworkHours/"+params.idWorkHours;
       let resp = await doApiGet(url);
       console.log(resp.data);
       setWrk(resp.data);
    }

    const onSub = async(_dataBody) =>{
      console.log(_dataBody);
      doApiEdit(_dataBody);
    }
   
    const doApiEdit = async(_dataBody) =>{
      let url = API_URL+"/workHours/"+wrk._id;
      try{
        let resp = await doApiMethod(url,"PUT",_dataBody);
        if(resp.data.modifiedCount == 1){
          toast.success("work hours updated");
          nav("/admin/listWorkHours");
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
      <h1>Edit Work Hours</h1>
      <form onSubmit={handleSubmit(onSub)} className='col-md-6 p-3 shadow'>
      <label>start</label>
      <label>Start</label>
     <input {...register('start',{minLength:2})} type='time' defaultValue={wrk.start} className="form-control"/>
     {errors.start && <small className='text-danger d-block'>Enter valid time</small>}

     <label>End</label>
     <input {...register('end',{minLength:2})} type='time' defaultValue={wrk.end} className="form-control"/>
     {errors.end && <small className='text-danger d-block'>Enter valid time</small>}

     <label>Date</label>
     <input {...register('date',{minLength:2})} type="text" className='form-control'/>
     {errors.date && <small className='text-danger d-block'></small>}
     <button className='btn btn-success mt-3'>update new work hours</button>
      </form>
    </div>
  )
}
