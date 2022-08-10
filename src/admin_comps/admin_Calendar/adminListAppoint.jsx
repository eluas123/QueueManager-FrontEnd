import React from 'react'
import { useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';


export default function AdminListAppoint(props) {
let item = props.item;

const [name,setName] = useState({});

const doApi = async() =>{
  let url = API_URL+"user/userInfo/"+item.userID;
  let resp = await doApiGet(url);
 setName(resp.data.name);
  }


  return (
    <div className='container'>
    <div className='d-flex justify-content-evenly border mt-5 mb-5'>
   <div>Name: {item.userID}</div>
   <div>Service: {item.serviceID}</div>
   <div>Date: {item.Date}</div>
   <div>time: {item.time}</div>
</div>
    </div>
  )
}
