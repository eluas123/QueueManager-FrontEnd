import React from 'react'
import { Link} from 'react-router-dom'
import HeaderClient from './headerClient'

export default function Home() {


  return (
    <React.Fragment>
      <HeaderClient/>
    <div className='container bg-dark'>
     <h1 className='text-white text-center'>Queue Manager</h1>
       <h3 className='text-white text-center mt-5'>Home Page</h3>
       <div className='container d-flex justify-content-evenly mt-5'>
       <Link className='btn btn-success' to={'/whatsapp'}>WhatsApp</Link>
       <Link className='btn btn-success' to={'/about'}>About</Link>
       <Link className='btn btn-success' to={'/service'}>appoitments</Link>
       <Link className='btn btn-success' to={'/products'}>Products</Link>
       <Link className='btn btn-success' to={'/waze'}>Waze</Link>
     </div>
    </div>
    </React.Fragment>
  )
}
