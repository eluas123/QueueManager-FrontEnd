import React from 'react'

export default function AdminListAppoint(props) {
  let item = props.item;
  return (
    <div className='container'>
       <div key={item._id} className='d-flex justify-content-evenly mt-3 border'>
           <div>{item.userID}</div>
           <div>{item.serviceID}</div>
           <div>{item.Date}</div>
           <div>{item.time}</div>
       </div>
    </div>
  )
}
