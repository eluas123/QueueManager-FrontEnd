import React from 'react'
import { Link } from 'react-router-dom'
import '..//css//headerFooterClient.css';

export default function HeadrClient() {
  return (
    <header className='container-fluid headerNav'>
        <div className='container text-center'>
          <nav>
            <ul className='nav d-flex align-items-center justify-content-evenly'>
            <li><Link to={''} className='text-white'>עמוד הבית</Link></li>
            <li> <Link to={'about'} className='text-white'>אודות</Link></li>
            <li><Link to={'service'} className='text-white'>בחירת שירות</Link></li>
            <li><Link to={'whatsapp'} className='text-white'>צפייה בתורים שלי</Link></li>
            <li> <Link to={'products'} className='text-white'>מוצרים</Link></li>
            </ul>
          </nav>
          </div>
    </header>
  )
}
