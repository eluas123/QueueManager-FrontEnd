import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import '..//css//headerFooterClient.css';
import { AppContext } from '../context/context';
import SideBar from './sideBar';

export default function HeaderClient() {

    const {user} = useContext(AppContext);


  return (
    <header className='container-fluid headerNav'>
        <div className='container text-center p-0'>
          <nav className='NavNone'>
            <ul className='nav d-flex align-items-center justify-content-around'>
            <li><Link to={'/'} className='btn text-white'>עמוד הבית</Link></li>
            <li> <Link to={'/about'} className='btn text-white'>אודות</Link></li>
            <li><Link to={'/service'} className='btn text-white'>בחירת שירות</Link></li>
            <li><Link to={'/userAppointments'} className='btn text-white'>צפייה בתורים שלי</Link></li>
            <li> <Link to={'/products'} className='btn text-white'>מוצרים</Link></li>
            {!user.name ?
            <div className='d-flex mt-3'>
              <Link className='btn btn-success text-white me-1 link' to={'/login'}>login</Link>
              <Link className='btn btn-info text-white w-50 link' to={'/signup'}>signup</Link>
            </div>
            :
            <div className='d-flex mt-4'>
              <span className='btn text-white me-1 link'>Welcome {user.name},</span>
              <Link className='btn btn-danger text-white link' to={'/logout'}>Log out</Link>
            </div>
          }
            </ul>
          </nav>
          </div>
          <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
    </header>
  )
}
