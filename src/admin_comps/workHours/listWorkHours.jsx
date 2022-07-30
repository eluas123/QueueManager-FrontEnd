import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import { Link } from 'react-router-dom';

export default function ListWorkHours() {
    
    const [ar,setAr] = useState([]);

    useEffect(() =>{
       doApi();
    },[])

    const doApi = async() =>{
        let url = API_URL+"/workHours";
        let resp = await doApiGet(url);
        console.log(resp.data);
        setAr(resp.data);
    }

    const onDelClick = async(_idDel) =>{
        let url = API_URL+"/workHours/"+_idDel;
        try{
            let resp = await doApiMethod(url,"DELETE");
            if(resp.data.deletedCount == 1){
                toast.success("Deleted")
                doApi();
            }
        }
        catch(err){
            console.log(err);
            toast.error("there problem try refresh the page");
        }
    }

  return (
    <div className='container'>
     <AdminAuthComp/>
     <h2>List of workHours you updated</h2>
     <Link to={"/admin/addWorkHours"} className='btn btn-success'>Update work hours</Link>
     <table className='table table-striped table-hover'>
        <thead>
            <tr>
                <th>#</th>
                <th>Start</th>
                <th>End</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {ar.map((item, i) =>{
                return(
                    <tr key={item._id}>
                        <td>{i+1}</td>
                        <td>{item.start}</td>
                        <td>{item.end}</td>
                        <td>{item.date}</td>
                        <td>
                            <button onClick={() =>{
                                window.confirm("Are you sure you want to delete") &&
                                onDelClick(item._id);
                            }} className='btn bagde bg-danger me-2'>Del</button>
                            <Link to={"/admin/editWorkHours"+item._id} className='btn bagde bg-info me-2'>Edit</Link> 
                        </td>
                    </tr>
                )
            })}
        </tbody>
     </table>
    </div>
  )
}
