import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

export default function AppRoutes() {

    useEffect(() =>{
    doApi();
    },[]);

    const doApi = async() =>{
       let url = "/hours.json";
       let resp = await fetch(url);
       let data = await resp.json();
       console.log(data);
      
      }

  return (
    <div>AppRoutes</div>
  )
}
