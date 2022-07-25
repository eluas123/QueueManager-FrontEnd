import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL } from '../../services/apiService';

export default function AppointListUser() {


   useEffect(() =>{
    doApi();
   },[])


  return (
    <div>AppointListUser</div>
  )
}
