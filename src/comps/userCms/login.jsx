import React from 'react'
import { FiLogIn } from 'react-icons/fi';
import { useContext } from 'react';
import {useForm} from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../../context/context';
import { API_URL, doApiMethod, TOKEN_NAME } from '../../services/apiService';
import '..//..//css/login.css';

export default function SignUp() {

    const {setUser,doApiUserInfo} = useContext(AppContext);
    const nav = useNavigate();
    const{register , handleSubmit , formState: { errors } } = useForm();
    const onSub = (_dataBody) =>{
      console.log(_dataBody);
      doApi(_dataBody);
    }

       const doApi = async(_dataBody) =>{
        let url = API_URL+"/users/login";
        try{
        let resp = await doApiMethod(url,"POST",_dataBody);
        if(resp.data.token){
          ///check if we get the token
          console.log(resp.data.token);
          ///save the token and set it after log in
          localStorage.setItem(TOKEN_NAME,resp.data.token)
          setUser(resp.data.user);
          doApiUserInfo();
            toast.success("You logged in");
            nav("/");
        }
    
        else{
            toast.error("There is problem come back later");
        }
    }
    catch(err){
      toast.error("User or password wrong");
       }
    }

  return ( 
<div className='container-fluid signUpFluid d-md-flex justify-content-between'>
<div className='text-center col-md-9 my-5 img1'>
            <FiLogIn size={'15em'} style={{color:'rgba(0, 0, 255, 0.623)'}} />
          </div>
  <div className='right d-flex align-items-center p-md-5 '>
    <form onSubmit={handleSubmit(onSub)} className="box col-md-6">
    <h1 className='display-5 text-dark me-2'>התחברות:</h1>
      {errors.phone && <small className='d-block text-danger'>*מספר לא תקין </small>}
      <input placeholder="*מספר טלפון" {...register("phone", { required: true, minLength: 10, maxLength: 10 })} type="text" className="form-control mb-4 border-dark me-2" />
      {errors.password && <small className='d-block text-danger'>*נא להכניס סיסמה תקינה (לפחות 3 תווים)</small>}
      <input placeholder="*סיסמה" {...register("password", { required: true, minLength: 3 })} type="password" className="form-control mb-4 border-dark me-2" />
      <button className='btn bb me-2'>התחברות</button>
      <p className='text-dark pt-2 fs-5 me-2'>עדיין לא נרשמת? <Link className='text-dark border-dark border-bottom' to={'/signUp'}>הרשמה</Link></p>

    </form>
  </div>
  <div className='d-flex  align-items-center'>
  <div className='left text-center'>
  <div className='text-center col-md-9 my-5 img2'>
            <FiLogIn size={'15em'} style={{color:'white'}} />
          </div>
    <h2 className='h2SignUp col-md-8 text-center text-white'>ברוכים השבים למספרה של אליאס וטימור</h2>
  </div>
  </div>
</div>
  )
}
