import React from 'react'
import { useContext } from 'react';
import {slide as Menu} from 'react-burger-menu';
import { Link } from 'react-router-dom';
import '..//css//sidebar.css';
import { AppContext } from '../context/context';

export default function SideBar() {

   const {user} =  useContext(AppContext);

  return (
    <Menu>
      {!user.name ?
      <div>
      <Link className='btn menu-item text-white burgerLogin' to={"/login"}>Login</Link>
      <Link className='btn menu-item text-white burgerSignUp' to={"/signup"}>signup</Link>
      </div>
      :
      <div className='burgerUserName'>
      <div className='text-white'>Welcome {user.name},</div>
      <Link className='btn btn-danger text-white burgerLogOut' to={'/logout'}>Log out</Link>
    </div>
}
        <Link className="menu-item mt-5" to={"/"}>עמוד הבית </Link>
        <hr/>
        <Link className="menu-item" to={"/service"}>בחירת שירות</Link>
        <hr/>
        <Link className="menu-item" to={"/about"}>אודות</Link>
        <hr/>
        <Link className="menu-item" to={"/userAppointments"}>התורים שלי</Link>
        <hr/>
        <Link className="menu-item" to={"/products"}>מוצרים</Link>
    </Menu>
  )
}
