import React from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import { Link } from 'react-router-dom';
import AdminHeader from '../adminHeader';
import FooterAdmin from '../footerAdmin';
import Pages from '../pages';

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
        <AdminAuthComp/>
    <div className='container'>
     <h2 className='text-center mt-5 display-4'>רשימת עדכוני שעות עבודה </h2>
     <Link to={"/admin/addWorkHours"} className='btn btn-primary form-control mb-3'>עדכון שעות עבודה ותאריך</Link>
     {/* <Pages css='btn btn-warning ms-2' perPage="5" urlCount={API_URL+"/appointments/count"} toLink="/admin/listWorkHours?page="/> */}
     <table className='table table-striped table-hover'>
        <thead className='bg-dark text-white'>
            <tr>
                <th>#</th>
                <th>שעת התחלה</th>
                <th>שעת סיום</th>
                <th>תאריך</th>
                <th>הפסקה</th>
                <th>מחק/ערוך</th>
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
                        <td>{item.break}</td>
                        <td>
                            <button onClick={() =>{
                                window.confirm("Are you sure you want to delete") &&
                                onDelClick(item._id);
                            }} className='btn bagde bg-danger me-2 text-white'>מחק</button>
                            <Link to={"/admin/editworkHours/"+item._id} className='btn bagde bg-primary me-2 text-white'>ערוך</Link> 
                        </td>
                    </tr>
                )
            })}
        </tbody>
     </table>
    </div>
    {/* <FooterAdmin/> */}
    </React.Fragment>
  )
}
