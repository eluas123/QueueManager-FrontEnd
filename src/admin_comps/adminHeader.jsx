import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom'
import '..//css//headerFooterClient.css';
import { AppContext } from '../context/context';
import AdminSideBar from './adminSideBar';

export default function AdminHeader() {

    const {user} = useContext(AppContext);


  return (
    <header className='container-fluid headerNavAdmin'>
    <div className='container text-center p-0'>
      <nav className='NavNone'>
        <ul className='nav d-flex align-items-center justify-content-around'>
            <strong className='text-white mt-4'>Admin</strong>
            <li> <Link to={'/admin/appoitments'} className='btn text-white'>צפייה בתורים</Link></li>
            <li><Link to={'/admin/listServices'} className='btn text-white'>סוגי שירות</Link></li>
            <li><Link to={'/admin/listWorkHours'} className='btn text-white'>שעות עבודה </Link></li>
            <li> <Link to={'/admin/ListUsers'} className='btn text-white'>רשימת לקוחות</Link></li>
        <div className='d-flex mt-4'>
          <span className='btn text-white me-1 link'>Welcome {user.name},</span>
          <Link className='btn btn-danger text-white link' to={'/logout'}>Log out</Link>
        </div>
        </ul>
      </nav>
      </div>
      <AdminSideBar pageWrapId={'page-wrap'} outerContainerId={'outer-container'}/>
</header>
  )
}
