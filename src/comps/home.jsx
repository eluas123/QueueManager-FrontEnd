import React from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from './headerClient';
import {BsCalendar2Day,BsWhatsapp} from 'react-icons/bs';
import {SiWaze,SiAboutdotme} from 'react-icons/si';
import {MdSmsFailed,MdProductionQuantityLimits} from 'react-icons/md';
import '..//css//home.css';
import Footer from './footer';

export default function Home() {


  return (
    <React.Fragment>
      <HeaderClient/>
      <div className='container-fluid homePage'>
        <h1 className='text-center mt-5'>ברוכים הבאים למרפאת השיניים</h1>
        <div className='container'>
          <div className='row d-flex justify-content-center'>
        <div className='col-md-6 d-flex justify-content-evenly'>
          <a target={"_blank"} href='https://api.whatsapp.com/send/?phone=972548173179&text=Elias+agever&type=phone_number&app_absent=0'>
          <div className='box d-flex align-items-center justify-content-center'>
          <BsWhatsapp size={'3em'}/>
          </div>
          </a>
        <Link to={"/service"}>
          <div className='box d-flex align-items-center justify-content-center'>
          <BsCalendar2Day size={'3em'}/>
          </div>
        </Link>
        <Link to={"/waze"}>
          <div className='box d-flex align-items-center justify-content-center'>
          <SiWaze size={'3em'}/>
          </div>
        </Link>
        </div>
        </div>
        <div className='row d-flex justify-content-center mt-5'>
        <div className='col-md-6 d-flex justify-content-evenly'>
        <Link to={"/about"}>
          <div className='box d-flex align-items-center justify-content-center'>
          <SiAboutdotme size={'3em'}/>
          </div>
        </Link>
        <Link to={"/userAppointments"}>
          <div className='box d-flex align-items-center justify-content-center'>
          <MdSmsFailed size={'3em'}/>
          </div>
        </Link>
        <Link to={"/prodcuts"}>
          <div className='box d-flex align-items-center justify-content-center'>
          <MdProductionQuantityLimits size={'3em'}/>
          </div>
        </Link>
        </div>
        </div>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  )
}

{/* <div className='container-fluid bg-dark'>
     <h1 className='text-white text-center'>Queue Manager</h1>
       <h3 className='text-white text-center mt-5'>Home Page</h3>
       <div className='container d-flex justify-content-evenly mt-5'>
       <Link className='btn btn-success' to={'/whatsapp'}>WhatsApp</Link>
       <Link className='btn btn-success' to={'/about'}>About</Link>
       <Link className='btn btn-success' to={'/service'}>appoitments</Link>
       <Link className='btn btn-success' to={'/products'}>Products</Link>
       <Link className='btn btn-success' to={'/waze'}>Waze</Link>
     </div>
    </div> */}