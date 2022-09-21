import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/context';
import { API_URL, doApiGet } from '../services/apiService';
import HeaderClient from './headerClient';

export default function Products() {

    const[ar,setAr] = useState([]);
    const {Loading,setLoading} = useContext(AppContext)

    useEffect(() =>{
     doApi();
    },[])
    
    const doApi = async () =>{
      let url = API_URL+"/products";
      let resp = await doApiGet(url);
      console.log(resp.data);
      setAr(resp.data);
    }

    const getImg = (_img_url) => {
        console.log(_img_url)
        if(!_img_url){
          return "https://images.pexels.com/photos/1860618/pexels-photo-1860618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        if(_img_url.includes("://")){
          return _img_url;
        }
        return API_URL+_img_url;
      }

  return (
    <React.Fragment>
    <HeaderClient/>
    <div className='container-fluid rtlFluid'>
    {Loading ?
         <div className="text-center">
         <img src='https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif'
/>
       </div> :
        <div className='container'>
          <h1 className='text-center mt-5 display-4'>מוצרים באתר</h1>
          <div className='row mt-3 product'>
            {ar.map((item) =>{
                return(
                  <div key={item._id} className='col-md-4 p-2 product-box '>
                  <div className='p-2 border shadow h-100'>
                    <div className='big-div' style={{backgroundImage:`url(${getImg(item.img_url)})`}}></div>
                    <h2>{item.name}</h2>
                    <h5>תיאור:{item.Description}</h5>
                    <h5>מחיר: {item.price} שקל</h5>
                      <a className='btn btn-primary' target={'blank'} href={`https://api.whatsapp.com/send/?phone=972548173179&text=היי, הפריט זמין? ${item.name} קוד פריט ${item._id}&type=phone_number&app_absent=0`}>הזמנה מראש</a>
                    </div>
                    </div>
                )
            })
   }
   </div>
      </div>}
    </div> 
  </React.Fragment>
  )
}
