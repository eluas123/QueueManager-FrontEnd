import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import './categories.css';

export default function CategoriesList() {

   const[ar,setAr] = useState([]);

   useEffect(() =>{
    doApi();
   },[])
   
   const doApi = async () =>{
     let url = API_URL+"/typeServices";
     let resp = await doApiGet(url);
     console.log(resp.data);
     setAr(resp.data);
   }

  return (
    <div className='container-fluid Service shadow-sm pb-5'>
      <div className='container'>
         <h2 className='display-4 text-center my-3'>Select the service you want</h2>
         <div className='row'>
          {ar.map(item =>{
            return(
              <div key={item._id} className='col-md-4 p-2'>
               <Link to={"/appointments/"+item._id}>
                <div className='border box'>
                  <h3>service: {item.name}</h3>
                  <hr/>
                  <h3>time of service: { item.lengthService} mins</h3>
                  <hr/>
                  <h3>price: {item.price || "none"}</h3>
                </div>
               </Link>
              </div>
            )
          })}
         </div>
      </div>
    </div>
  )
}
