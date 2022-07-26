import React from 'react'


export default function AdminListAppoint(props) {
let item = props.item;

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
