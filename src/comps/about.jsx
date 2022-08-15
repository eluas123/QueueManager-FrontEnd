import Footer from './footer';
import React from 'react'
import { useState } from 'react'
import HeaderClient from './headerClient'


export default function About(props) {
 
  let [show,setShow] = useState(true);

  const hideButton = () =>{
    setShow(false);
  }

 const backButton = () =>{
  setShow(true);
 }

  return (
    <React.Fragment>
      <HeaderClient/>
    <div className='container-fluid bg-dark'>
     <h1 className='text-white text-center'>Queue Manager</h1>
       <h3 className='text-white text-center mt-5'>About Page</h3>
       <button onClick={()=>{
            {backButton()}
          }} className='btn btn-success'>back</button>
       {show && <Footer hideButton={hideButton} txt='elias agever'/>}
       </div>
       </React.Fragment>
  )
}
