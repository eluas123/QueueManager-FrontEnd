import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import { Link } from 'react-router-dom';
import AdminHeader from '../adminHeader';

export default function ListWorkHours(props) {
    
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
        if(_idDel == '62e10fd371793a1a0ac6b09a'){
            toast.error("you cant delete the deafult work hours");
            return;
        }
        let url = API_URL+"/workHours/"+_idDel;
        try{
            let resp = await doApiMethod(url,"DELETE");
            if(resp.data.deletedCount == 1){
                doApi();
            }
        }
        catch(err){
            console.log(err);
            toast.error("there problem try refresh the page");
        }
    }

  return (
    <React.Fragment>
        <AdminHeader/>
    <div className='container'>
     <AdminAuthComp/>
     <h2>List of workHours you updated</h2>
     <Link to={"/admin/addWorkHours"} className='btn btn-success'>Update work hours</Link>
     <table className='table table-striped table-hover mt-3'>
        <thead className='bg-dark text-white'>
            <tr>
                <th>#</th>
                <th>Start</th>
                <th>End</th>
                <th>Date</th>
                <th>Del/Edit</th>
            </tr>
        </thead>
        <tbody>
            {ar.map((item, i) =>{
                return(
                    <tr key={item._id}>
                        <td className='numbers'>{i+1}</td>
                        <td>{item.start}</td>
                        <td>{item.end}</td>
                        <td>{item.date}</td>
                        <td>
                            <button onClick={() =>{
                                window.confirm("Are you sure you want to delete") &&
                                onDelClick(item._id);
                            }} className='btn bagde bg-danger me-2'>Del</button>
                            <Link to={"/admin/editworkHours/"+item._id} className='btn bagde bg-info me-2'>Edit</Link> 
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
