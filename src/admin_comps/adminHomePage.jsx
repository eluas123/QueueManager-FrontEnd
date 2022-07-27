import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHomePage() {
  return (
    <div className='container-fluid bg-dark'>
     <h1 className='text-white text-center'>Queue Manager</h1>
       <h3 className='text-white text-center mt-5'>Admin Home Page</h3>
       <div className='container d-flex justify-content-evenly mt-5'>
       <Link className='btn btn-success' to={'about'}>About</Link>
       <Link className='btn btn-success' to={'appoitments'}>View appoitments</Link>
       <Link className='btn btn-success' to={'products'}>Products</Link>
       <Link className='btn btn-success' to={'graphs'}>Graphs clients</Link>
     </div>
    </div>
  )
}
