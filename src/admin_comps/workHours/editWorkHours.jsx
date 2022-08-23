import React from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert, Calendar } from 'antd';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import {useForm} from "react-hook-form"
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import '..//..//css//rtl.css';


export default function EditWorkHours() {

    const [wrk,setWrk] = useState({});
    const params = useParams();
    const nav = useNavigate();
   const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState();
  const dateSelect = selectedValue?.format('DD-MM-YYYY');

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  

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
      _dataBody.date = dateSelect;
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
    <React.Fragment>
      <AdminHeader/>
      <AdminAuthComp/>
    <div className='container'>
      <h1 className='text-center mt-5'>עריכת שעות עבודה</h1>
      <div className='d-flex'>
      <form onSubmit={handleSubmit(onSub)} className='col-md-4 p-3 shadow mt-3 rtlFluid'>
      <label>שעת התחלה</label>
     <input {...register('start',{required:true ,minLength:2})} type='time' defaultValue={wrk.start} className="form-control"/>
     {errors.start && <small className='text-danger d-block'>הזן זמן תקין</small>}

     <label>שעת סיום</label>
     <input {...register('end',{required:true ,minLength:2})} type='time' defaultValue={wrk.end} className="form-control"/>
     {errors.end && <small className='text-danger d-block'>הזן שם תקין</small>}

     <label>תאריך</label>
    <div className='form-control'>{dateSelect || wrk.date}</div>
     <button className='btn btn-success mt-3 form-control'>עדכן שעות עבודה</button>
      </form>
      <div className='ms-2'>
    <Calendar value={value} onSelect={onSelect} fullscreen={false} />
    </div>
    </div>
    </div>
    </React.Fragment>
  )
}
