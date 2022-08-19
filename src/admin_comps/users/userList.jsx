
import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';

export default function UserList() {
    
   const [ar,setAr] = useState([]);

    useEffect(() =>{
        doApi();
    },[])
  
    const doApi = async() =>{
        let url = API_URL+"/users";
        let resp = await doApiGet(url);
        console.log(resp.data);
        setAr(resp.data);
    }

    const onDelClick = async(_idDel) =>{
        let url = API_URL+"/users/"+_idDel;
        try{
            let resp = await doApiMethod(url,"DELETE");
            if(resp.data.deletedCount == 1){
                doApi();
            }
        }
        catch(err){
            console.log(err);
            toast.error("There problem try refresh the page");
        }
    }
  return (
    <React.Fragment>
        <AdminHeader/>
        <AdminAuthComp/>
    <div className='container'>
        <h1 className='text-center mt-5'>רשימת לקוחות</h1>
        <table className='table table-striped table-hover mt-3'>
            <thead className='bg-dark text-white'>
                <tr>
                    <td>#</td>
                    <td>שם</td>
                    <td>פלאפון</td>
                    <td>מחיקה</td>
                </tr>
            </thead>
        <tbody>
            {ar.map((item,i) =>{
                return(
                    <tr key={item._id}>
                    <td className='numbers'>{i+1}</td>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>
                        <button onClick={() =>{
                            window.confirm("Are you sure you want to delete") &&
                            onDelClick(item._id);
                        }} className='btn btn-danger me-2'>מחק</button>
                    </td>
                    </tr>
                )
            })}
        </tbody>
        </table>
    </div>
    </React.Fragment>
  )
}
