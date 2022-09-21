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

    useEffect(()=>{
     doApi();
    },[user])

    const doApi = async()=>{
        let url = API_URL+`/appointments/userAppointments/${user.phone}`;
        let resp = await doApiGet(url);
        // console.log(resp.data);
        setAr(resp.data);
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
          // toast.error("there is problem try refresh the page");
          toast.success("Deleted")
        }
      }
     
      const doApiEdit = async(date,time,index) =>{
        let urlPUT = API_URL+`/workHours/appointmentsArray/${date}`;
        let urlGET = API_URL+`/workHours/appointmentsArray/${date}`;
        let respGET = await doApiGet(urlGET);
        console.log("elias",respGET.data.appointmentsArr)
       let newAppointmentsArray = [];
       newAppointmentsArray = respGET.data.appointmentsArr;
       newAppointmentsArray[index] = time;
       console.log("newArray",newAppointmentsArray)
        let data = {
          appointmentsArr:newAppointmentsArray,
        }
        try{
          let resp = await doApiMethod(urlPUT,"PUT",data);
          if(resp.data.modifiedCount == 1){
            doApi();
          }
        } 
        catch(err){
          console.log(err.response);
          toast.error("There error try again later");
        }
      }

  return (
    <React.Fragment>
        <HeaderClient/>
        <div className='container-fluid'>
            <div className='container'>
               <h4 className='text-center display-4 mt-5'>התורים שלי</h4>
               <table className='table table-striped table-hover'>
                 <thead className='bg-dark text-white'>
                    <tr>
                        <th>#</th>
                        <th>סוג שירות</th>
                        <th>תאריך</th>
                        <th>שעה</th>
                        <th>מחק</th>
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
                                window.confirm("אתה בטוח שאתה רוצה למחוק?") &&
                                doApiEdit(item.Date,item.time,item.indexArray)&&
                                onDelClick(item._id)
                            }} className='btn btn-danger'>מחק</button>
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
