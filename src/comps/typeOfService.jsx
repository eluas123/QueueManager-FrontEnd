import React from 'react'
import { Link } from 'react-router-dom'

export default function TypeOfService() {
  return (
    <div className='container-fluid bg-dark'>
      <h3 className='text-white text-center mt-5'>Type of Service Page</h3>
      <div className='container d-flex justify-content-evenly mt-5'>
      <Link className='btn btn-success' to={'hair-men'}>Hair men</Link>
      <Link className='btn btn-success' to={'hair-women'}>Hair women</Link>
      <Link className='btn btn-success' to={'lack-gel'}>lack-gel</Link>
      <Link className='btn btn-success' to={'hair-fen'}>Hair fen</Link>
    </div>
   </div>
  )
}
