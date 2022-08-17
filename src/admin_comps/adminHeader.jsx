import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import '..//css//headerFooterClient.css';
import { AppContext } from '../context/context';

export default function AdminHeader() {

    const {user} = useContext(AppContext);


  return (
    <header className='container-fluid headerNavAdmin'>
    <div className='container text-center p-0'>
      <nav className='NavNone'>
        <ul className='nav d-flex align-items-center justify-content-around'>
            <strong className='text-white mt-4'>Admin</strong>
        <li><Link to={'/admin'} className='btn text-white'>עמוד הבית</Link></li>
            <li> <Link to={'appointments'} className='btn text-white'>צפייה בתורים</Link></li>
            <li><Link to={'listServices'} className='btn text-white'>סוגי שירות</Link></li>
            <li><Link to={'listWorkHours'} className='btn text-white'>שעות עבודה </Link></li>
            <li> <Link to={'ListUsers'} className='btn text-white'>רשימת לקוחות</Link></li>
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
      {/* <SideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/> */}
</header>
  )
}
