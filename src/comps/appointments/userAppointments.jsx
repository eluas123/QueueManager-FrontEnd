import React from 'react'
import { toast } from 'react-toastify';
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/context'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService'
import HeaderClient from '../headerClient'

export default function UserAppointments() {

    const {user} = useContext(AppContext)
    const [ar,setAr] = useState([]);
    const [show,setShow] = useState(true);
   
    const hide = () =>{
        setShow(true);
    }

    useEffect(()=>{
     doApi();
    },[])

    const doApi = async()=>{
        let url = API_URL+`/appointments/userAppointments/${user.phone}`;
        let resp = await doApiGet(url);
        console.log(resp.data);
        setAr(resp.data);
        if(resp.data.length == 0){
            toast.info("There is not appointments")
        }
    }

    const onDelClick = async(_idDel) =>{
        let url = API_URL+"/appointments/"+_idDel;
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
                            <button onClick={()=>{
                                window.confirm("Are you sure you want to delete") &&
                                onDelClick(item._id);
                            }} className='btn btn-danger'>Del</button>
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
