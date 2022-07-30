import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHomePage() {
  return (
    <div className='container-fluid bg-dark'>
             <Link className='btn btn-success' to={'appoitments'}>appoitments</Link>
             <Link className='btn btn-success' to={'listServices'}>typeServices</Link>
             <Link className='btn btn-success' to={'addService'}>addServices</Link>
     <h1 className='text-white text-center'>Queue Manager</h1>
       <h3 className='text-white text-center mt-5'>Admin Home Page</h3>
       <div className='container d-flex justify-content-evenly mt-5'>
     </div>
    </div>
  )
}
