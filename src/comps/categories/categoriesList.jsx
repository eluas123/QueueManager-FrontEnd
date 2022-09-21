import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URL, doApiGet } from '../../services/apiService';
import HeaderClient from '../headerClient';
import '..//..//css//categories.css';
import Footer from '../footer';

export default function CategoriesList() {

  const [ar, setAr] = useState([]);

  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    let url = API_URL + "/typeServices";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
  }

  return (
    <React.Fragment>
      <HeaderClient />
      <div className='container-fluid Service pb-5 rtlFluid'>
        <div className='container'>
          <h2 className='display-4 text-center my-3 mb-5'>בחר את סוג השירות שתרצה</h2>
          <div className='row d-md-flex justify-content-center'>
            {ar.map(item => {
              return (
                <div key={item._id} className='col-md-4 p-2 shadow border m-3 pe-3 divService'>
                  <Link to={"/appointments/" + item._id}>
                    <div className=' box'>
                      <h5>שם: {item.name}</h5>
                      <h5>אורך השירות: {item.lengthService} דקות</h5>
                      <h5>מחיר: {item.price || "none"}</h5>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Footer/>
    </React.Fragment>
  )
}
