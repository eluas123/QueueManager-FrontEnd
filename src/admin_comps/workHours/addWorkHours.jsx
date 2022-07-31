import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { API_URL, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert, Calendar } from 'antd';
import moment from 'moment';
import { useRef } from 'react';


export default function AddWorkHours(props) {

  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const dateSelect = selectedValue?.format('DD-M-YYYY');

  const nav = useNavigate();
  let {register, handleSubmit, formState: {errors}} = useForm();
  let input = useRef();

  const onSub = (_dataBody) =>{
    _dataBody.date = dateSelect;
    console.log(_dataBody);
    doApiAdd(_dataBody);
  }


  const doApiAdd = async(_dataBody) =>{
    let url = API_URL+"/workHours";
    try{
      let resp = await doApiMethod(url,"POST",_dataBody);
      if(resp.data._id){
        toast.success("New workHours updated");
        nav("/admin/listWorkHours");
      }
    }
    catch(err){
      console.log(err);
      toast.error("There error try again later");
    }
  }
  
  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  

  return (
    <div className='container'>
    <AdminAuthComp/>
    <h1>update new work hours</h1>
    <div className='d-flex'>
    <form onSubmit={handleSubmit(onSub)} className='col-md-6 p-3 shadow'>
     <label>Start</label>
     <input {...register('start',{required:true, minLength:2})} type='time' defaultValue={"08:00"} className="form-control"/>
     {errors.start && <small className='text-danger d-block'>Enter valid time</small>}

     <label>End</label>
     <input {...register('end',{required:true, minLength:2})} type='time' defaultValue={"18:00"} className="form-control"/>
     {errors.end && <small className='text-danger d-block'>Enter valid time</small>}

     <label>Date</label>
    <div className='form-control'>{dateSelect}</div>
     <button className='btn btn-success mt-3'>update new work hours</button>
    </form>
    
      <Calendar value={value} onSelect={onSelect} fullscreen={false} />
    </div>
    </div>
  )
}
