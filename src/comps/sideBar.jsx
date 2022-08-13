import React from 'react'
import {slide as Menu} from 'react-burger-menu';
import { Link } from 'react-router-dom';
import '..//css//sidebar.css';

export default function SideBar() {
  return (
    <Menu>
        <Link className="menu-item" to={"/"}>עמוד הבית </Link>
        <hr/>
        <Link className="menu-item" to={"/service"}>בחירת שירות</Link>
        <hr/>
        <Link className="menu-item" to={"/about"}>אודות</Link>
        <hr/>
        <Link className="menu-item" to={"/products"}>התורים שלי</Link>
    </Menu>
  )
}
