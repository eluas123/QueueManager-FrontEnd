import React from 'react'
import { Link } from 'react-router-dom'
import '..//css//headerFooterClient.css';

export default function HeaderClient() {
  return (
    <header className='container-fluid headerNav'>
        <div className='container text-center'>
          <nav>
            <ul className='nav d-flex align-items-center justify-content-around'>
            <li><Link to={'/'} className='btn text-white'>עמוד הבית</Link></li>
            <li> <Link to={'/about'} className='btn text-white'>אודות</Link></li>
            <li><Link to={'/service'} className='btn text-white'>בחירת שירות</Link></li>
            <li><Link to={'/whatsapp'} className='btn text-white'>צפייה בתורים שלי</Link></li>
            <li> <Link to={'/products'} className='btn text-white'>מוצרים</Link></li>
            <div className='d-flex mt-4'>
              <Link className='btn text-white me-1 link' to={'/login'}>login</Link>
              <p className='text-white mt-2'>/</p>
              <Link className='btn text-white link' to={'/signup'}>signup</Link>
            </div>
            </ul>
          </nav>
          </div>
    </header>
  )
}
