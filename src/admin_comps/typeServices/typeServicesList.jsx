import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { Link } from 'react-router-dom';
import AdminAuthComp from '../adminAuthComp';

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
    <div className='container'>
      <AdminAuthComp/>
      <h2>List of typeServices in the Systems</h2>
      <Link to={"/admin/addService"} className='btn btn-success'>Add new Service</Link>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name Service</th>
            <th>length of Service</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) =>{
            return(
              <tr key={item._id}>
              <td>{i+1}</td>
              <td>{item.name}</td>
              <td>{item.lengthService} mins</td>
              <td>{item.price || "none"}</td>
              <td>
                <button onClick={() =>{
                  window.confirm("Are you sure you want to delete?") &&
                  onDelClick(item._id);
                }} className='btn bagde bg-danger me-2'>Delete</button>
                <Link to={"/admin/editService/"+item._id} className='btn bagde bg-info me-2'>Edit</Link>
              </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
