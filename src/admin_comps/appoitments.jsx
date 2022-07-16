import React from 'react'
import { Link } from 'react-router-dom'

export default function Appoitments() {
  return (
    <div className='container-fluid bg-dark'>
    <h1 className='text-white text-center'>Queue Manager</h1>
      <h3 className='text-white text-center mt-5'>Home Page</h3>
      <div className='container d-flex justify-content-evenly mt-5'>
      <Link className='btn btn-success' to={'view-appoitments'}>view Appoitments</Link>
      <Link className='btn btn-success' to={'edit-hours'}>Edit hours</Link>
      </div>
      </div>
  )
}
