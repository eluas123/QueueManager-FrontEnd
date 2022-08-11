import React from 'react'
import {useForm} from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
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
    <div className='container-fluid signUpFluid d-md-flex justify-content-between'>
    <img className='img1' src=''/>
      <div className='right d-flex align-items-center p-md-5 '>
      <form onSubmit={handleSubmit(onSub)} className="box bg-bg-white">
          <h1 className='display-5 text-dark me-2 font-italic'>הרשמה:</h1>
            {errors.name && <small className='d-block text-danger'>*נא להכניס שם (לפחות 2 תווים) </small>}
            <input placeholder="*שם" {...register("name", { required: true, minLength: 2 })} type="text" className="form-control mb-4 border-dark me-2"/>
            {errors.phone && <small className='d-block text-danger'>*מספר לא תקין </small>}
            <input placeholder="*מספר טלפון" {...register("phone", { required: true, minLength: 10, maxLength: 10 })} type="text" className="form-control mb-4 border-dark me-2" />
            {errors.password && <small className='d-block text-danger'>*נא להכניס סיסמה תקינה (לפחות 3 תווים)</small>}
            <input placeholder="*סיסמה" {...register("password", { required: true, minLength: 3 })} type="password" className="form-control mb-4 border-dark me-2" />
            {errors.password2 && <small className='d-flex text-danger'>*סיסמה אינה תואמת</small>}
            <input placeholder="*וידוא סיסמה" {...register("password2", {
              required: true, validate: (value) => {
                return value === getValues("password")
              }
            })} type="password" className="form-control border-dark me-2" />
            <p className='text-dark pt-2 fs-md-5 me-2'>*על הסיסמה לכלול לפחות 3 תווים</p>
            <button className='btn bb me-2'>הירשם</button>
            <p className='text-dark pt-2 fs-5 me-2'>כבר נרשמת? <Link className='text-dark border-dark border-bottom' to={'/login'}>התחברות</Link></p>
          </form>
      </div>
      <div className='d-flex  align-items-center'>
      <div className='left text-center'>
        <img className='img2' src=''/>
        <h2 className='h2SignUp col-md-8 text-center text-white'>ברוכים השבים למרפאת השיניים</h2>
      </div>
      </div>
    </div>
  )
}
