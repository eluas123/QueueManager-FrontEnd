import React from 'react';
import { Link } from 'react-router-dom';
import HeaderClient from './headerClient';
import { FaWaze } from 'react-icons/fa';
import { SiWaze, SiAboutdotme } from 'react-icons/si';
import { FcCalendar, FcContacts, FcReading, FcSms } from 'react-icons/fc';
import { MdSmsFailed, MdProductionQuantityLimits } from 'react-icons/md';
import '..//css//home.css';
import Footer from './footer';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/context';
import { useEffect } from 'react';
import { TOKEN_NAME } from '../services/apiService';

export default function Home() {

  const {user} = useContext(AppContext);
  const [show,setShow] = useState(false);

   useEffect(() =>{
    if(!localStorage[TOKEN_NAME]){
      setShow(true);
    }else{
      setShow(false);
    }  
   },[])

  console.log("check",user)

  return (
    <React.Fragment>
      <HeaderClient />
      <div className='container-fluid homePage'>
      <div className='container'>
        {show?
        <div>
        <h1 className='text-center mt-5 display-4'>ברוכים הבאים למספרה של טימור ואליאס</h1>
        <Link className='btn btn-primary btnHomePageDesktop mt-5' to={"/login"}>בואו נתחיל התחבר/הרשם</Link>
        <Link className='btn btn-primary form-control btnHomePageResponsive mt-5' to={"/login"}>בואו נתחיל התחבר/הרשם</Link>
        </div>:
        <div>
          <h1 className='text-center mt-5 display-4'><strong>{user.name}</strong> שמחים שחזרת אלינו</h1>
          <div className='mt-5'></div>
          </div>}
          <div className='row d-flex justify-content-center mt-4'>
            <div className='col-md-6 d-flex justify-content-evenly'>
              <a target={"_blank"} href='https://api.whatsapp.com/send/?phone=972548173179&text=Elias+agever&type=phone_number&app_absent=0'>
                <div className='box row text-center align-items-center justify-content-center'>
                  <FcSms size={'3em'} />
                  <p className='fs-5'>
                    ווצאפ
                  </p>
                </div>
              </a>
              <Link to={"/service"}>
                <div className='box row text-center align-items-center justify-content-center'>
                  <FcCalendar size={'3em'} />
                  <p className='fs-5'>
                    קביעת תור 
                  </p>
                </div>
              </Link>
              <Link to={"/waze"}>
                <div className='box row text-center align-items-center justify-content-center'>
                  <FaWaze size={'3em'} />
                  <p className='fs-5'>
                      וויז     
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className='row d-flex justify-content-center mt-3'>
            <div className='col-md-6 d-flex justify-content-evenly'>
              <Link to={"/about"}>
                <div className='box row text-center align-items-center justify-content-center'>
                  <FcReading size={'3em'} />
                  <p className='fs-5'>
                    אודות 
                  </p>
                </div>
              </Link>
              <Link to={"/userAppointments"}>
                <div className='box row text-center align-items-center justify-content-center'>
                  <FcContacts size={'3em'} />
                  <p className='fs-5'>
                    התורים שלי
                  </p>
                </div>
              </Link>
              <Link to={"/products"}>
                <div className='box row text-center align-items-center justify-content-center'>
                  <MdProductionQuantityLimits size={'3em'} style={{color:'blue'}}/>
                  <p className='fs-5'>
                    מוצרים 
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  )
}