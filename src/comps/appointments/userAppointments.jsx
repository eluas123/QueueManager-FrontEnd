import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/context'
import { API_URL, doApiGet } from '../../services/apiService'
import HeaderClient from '../headerClient'

export default function UserAppointments() {

    const {user} = useContext(AppContext)
    const [ar,setAr] = useState([]);

    useEffect(()=>{
     doApi();
    },[])

    const doApi = async()=>{
        let url = API_URL+"/appointments";
        let resp = await doApiGet(url);
        console.log(resp.data);
        setAr(resp.data);
    }

    const found = ar.find(element => {
        return element.phone == user.phone;
      });

      console.log("found",found);

  return (
    <React.Fragment>
        <HeaderClient/>
        <div className='container-fluid'>
            <div className='container'>
               <h4 className='text-center'>Your Appointments List</h4>
               <table className='table table-striped table-hover'>
                 <thead className='bg-dark text-white'>
                    <tr>
                        <th>#</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>time</th>
                        <th>Del</th>
                    </tr>
                 </thead>
                 <tbody>
                {ar.map((item,i) =>{
                    return(
                    <tr key={item._id}>
                        <td>{i+1}</td>
                        <td>{item.serviceID}</td>
                        <td>{item.Date}</td>
                        <td>{item.time}</td>
                        <td>
                            <button className='btn btn-danger'>Del</button>
                        </td>
                    </tr>
                    )
                })}
                 </tbody>
               </table>
            </div>
        </div>
    </React.Fragment>
  )
}
