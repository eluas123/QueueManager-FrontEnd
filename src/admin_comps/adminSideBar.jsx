import React from 'react'
import { useContext } from 'react';
import {slide as Menu} from 'react-burger-menu';
import { Link } from 'react-router-dom';
import '..//css//sidebar.css';
import { AppContext } from '../context/context';

export default function AdminSideBar() {

   const {user} =  useContext(AppContext);

  return (
    <Menu>
      {!user.name ?
      <div>
      <Link className='btn menu-item text-white burgerLogin form-control' to={"/login"}>Login</Link>
      <Link className='btn menu-item text-white burgerSignUp form-control' to={"/signup"}>signup</Link>
      </div>
      :
      <div className='burgerUserName'>
      <div className='text-white'>Welcome {user.name},</div>
      <Link className='btn btn-danger text-white burgerLogOut form-control' to={'/logout'}>Log out</Link>
    </div>
}
        <Link className="menu-item mt-5 text-white" to={"/admin/appoitments"}>צפייה בתורים</Link>
        <hr/>
        <Link className="menu-item text-white" to={"/admin/listServices"}>סוגי שירות</Link>
        <hr/>
        <Link className="menu-item text-white" to={"/admin/listWorkHours"}>שעות עבודה</Link>
        <hr/>
        <Link className="menu-item text-white" to={"/admin/ListUsers"}> לקוחות</Link>
        <hr/>
        <Link className="menu-item text-white" to={"/admin/waitingList"}>  המתנה</Link>
        <hr/>
        <Link className="menu-item text-white" to={"/admin/listProducts"}> מוצרים</Link>
        <hr/>
        <Link className="menu-item text-white" to={"/admin/graphs"}> גרפים</Link>
    </Menu>
  )
}