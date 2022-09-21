import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import '..//..//css//rtl.css';
import FooterAdmin from '../footerAdmin';

export default function AdminListProducts() {

    const [ar,setAr] = useState([]);

   useEffect(() =>{
    doApi();
   },[])

   const doApi = async() =>{
    let url = API_URL+"/products";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
   }

   const onDelClick = async(_idDel) =>{
    let url = API_URL+"/products/"+_idDel;
    try{
        let resp = await doApiMethod(url,"DELETE");
        if(resp.data.deletedCount == 1){
          toast.success("Deleted")
          doApi();
        }
    }
    catch(err){
      console.log(err);
      toast.error("there is problem try refresh the page");
    }
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
          <AdminHeader/>
    <AdminAuthComp/>
    <div className='container rtlFluid mt-5'>
        <h2 className='text-center display-4'>רשימת מוצרים</h2>
            <Link to={'/admin/products'} className='btn btn-primary form-control'>הוספת מוצר</Link>
            <div className='row mt-3'>
    {ar.map((item) =>{
        return(
            <div key={item._id} className='col-md-4 p-2 product-box '>
            <div className='p-2 border shadow h-100'>
              <div className='big-div' style={{backgroundImage:`url(${getImg(item.img_url)})`}}></div>
              <h2>{item.name}</h2>
              <h4 className='h5'>תיאור:{item.Description}</h4>
              <div>מחיר: {item.price} שקל</div>
              <button onClick={() =>{
                window.confirm("אתה בטוח שאתה רוצה למחוק?")&&
                onDelClick(item._id);
              }} className='btn btn-danger'>מחק</button>
            </div>
            </div>
        )
    })
}
</div>
</div>
<FooterAdmin/>
</React.Fragment>
  )
}
