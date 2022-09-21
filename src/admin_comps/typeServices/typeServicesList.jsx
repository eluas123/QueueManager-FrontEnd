import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { Link } from 'react-router-dom';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import FooterAdmin from '../footerAdmin';

export default function TypeServicesList() {

   const [ar,setAr] = useState([]);

   useEffect(() =>{
    doApi();
   },[])

   const doApi = async() =>{
    let url = API_URL+"/typeServices";
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
   }

    const onDelClick = async(_idDel) =>{
        let url = API_URL+"/typeServices/"+_idDel;
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
  return (
    <React.Fragment>
       <AdminHeader/>
    <div className='container'>
      <AdminAuthComp/>
      <h2 className='text-center mt-5 display-4'>רשימת כול סוגי השירות במערכת</h2>
      <Link to={"/admin/addService"} className='btn btn-primary form-control'>הוספת שירות למערכת</Link>
      <table className='table table-striped table-hover mt-3'>
        <thead className='bg-dark text-white'>
          <tr>
            <th>#</th>
            <th>שם השירות</th>
            <th>אורך השירות (דקות)</th>
            <th>מחיר</th>
            <th>מחיקה/עריכה</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) =>{
            return(
              <tr key={item._id}>
              <td>{i+1}</td>
              <td>{item.name}</td>
              <td>{item.lengthService} דקות</td>
              <td>{item.price || "none"}</td>
              <td>
                <button onClick={() =>{
                  window.confirm("Are you sure you want to delete?") &&
                  onDelClick(item._id);
                }} className='btn bagde bg-danger me-2 text-white'>מחק</button>
                <Link to={"/admin/editService/"+item._id} className='btn bagde bg-primary text-white me-2'>ערוך</Link>
              </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    <FooterAdmin/>
    </React.Fragment>
  )
}
