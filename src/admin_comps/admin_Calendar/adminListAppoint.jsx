import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { API_URL, doApiGet } from '../../services/apiService';

export default function AdminListAppoint() {

  const [ar,setAr] = useState({});
  const params = useParams();

   useEffect(() =>{
   doApi();
   },[])

  const doApi = async() =>{
    let url = API_URL+"/appointments/Appointments-available/"+params.Date;
    let resp = await doApiGet(url);
    console.log(resp.data);
  }

  return (
    <div className='container'>
      <h1 className='text-center'>Appointments: </h1>

    </div>
  )
}
