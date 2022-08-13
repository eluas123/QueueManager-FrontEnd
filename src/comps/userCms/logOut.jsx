import { toast } from 'react-toastify';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/context';
import { TOKEN_NAME } from '../../services/apiService';

export default function LogOut() {
    const nav = useNavigate();
    const {setUser} = useContext(AppContext);

   useEffect(() =>{
    setUser({name:"",roe:""});
    localStorage.removeItem(TOKEN_NAME);
    nav("/login");
    toast.info("You logged out, see you again soon");
   })

  return (
    <div></div>
  )
}
