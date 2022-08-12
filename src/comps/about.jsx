import axios from 'axios';
import React from 'react'
import { useEffect } from 'react'
import HeadrClient from './headerClient';

export default function About() {

  useEffect = (() =>{
    doApi();
  })

  const doApi = async() =>{
    let url = "http://localhost:3006/appointments/listappointments";
    let resp = await axios.get(url);
    console.log(resp.data);
  }

  return (
    <React.Fragment>
    <div className='container-fluid bg-dark'>
     <h1 className='text-white text-center'>Queue Manager</h1>
       <h3 className='text-white text-center mt-5'>About Page</h3>
       </div>
       </React.Fragment>
  )
}
