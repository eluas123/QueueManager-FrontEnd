import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import {useForm} from "react-hook-form"
import { API_URL, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert, Calendar } from 'antd';
import moment from 'moment';
import AdminHeader from '../adminHeader';
import '..//..//css//rtl.css';


export default function AddWorkHours(props) {

  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const dateSelect = selectedValue?.format('DD-M-YYYY');

  const nav = useNavigate();
  let {register, handleSubmit, formState: {errors}} = useForm();

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
    <React.Fragment>
        <AdminHeader/>
        <AdminAuthComp/>
    <div className='container'>
    <h1 className='text-center mt-5'>עדכון שעות עבודה ותאריך</h1>
    <div className='d-flex'>
    <form onSubmit={handleSubmit(onSub)} className='col-md-4 p-3 shadow mt-3 rtlFluid'>
     <label>שעת התחלה</label>
     <input {...register('start',{required:true, minLength:2})} type='time' defaultValue={"08:00"} className="form-control"/>
     {errors.start && <small className='text-danger d-block'>הזן זמן תקין</small>}

     <label>שעת סיום</label>
     <input {...register('end',{required:true, minLength:2})} type='time' defaultValue={"18:00"} className="form-control"/>
     {errors.end && <small className='text-danger d-block'>הזן זמן תקין</small>}

     <label>תאריך</label>
    <div className='form-control'>{dateSelect}</div>
     <button className='btn btn-success mt-3 form-control'> הוסף</button>
    </form>
      <div className='ms-2'>
      <Calendar value={value} onSelect={onSelect} fullscreen={false} />
      </div>
    </div>
    </div>
    </React.Fragment>
  )
}
