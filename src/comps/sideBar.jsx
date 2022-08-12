import React from 'react'
import {slide as Menu} from 'react-burger-menu';
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
    <Menu>
        <a className='menu-item' href='/'>בית</a>
        <Link className="menu-item" to={"/service"}>בחירת שירות</Link>
        <Link className="menu-item" to={"/about"}>אודות</Link>
        <a className='menu-item' href='/'>וויז</a>
        <a className='menu-item' href='/'>ווצאפ</a>
        <a className='menu-item' href='/'>מוצרים</a>
    </Menu>
  )
}
