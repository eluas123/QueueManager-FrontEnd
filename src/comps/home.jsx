import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {

  const nav = useNavigate();

  return (
    <div className='container bg-dark h-100'>
     <h1 className='text-white text-center'>Queue Manager</h1>
     <div className='container'>
       <h3 className='text-white text-center mt-5'>Home Page</h3>
       <Link className='btn btn-success' to={'/login'}>Click</Link>
     </div>
    </div>
  )
}
