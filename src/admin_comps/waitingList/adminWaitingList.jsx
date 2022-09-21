import React, { useContext } from 'react'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert,Calendar } from 'antd';
import moment from 'moment';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import { AppContext } from '../../context/context';
import '..//..//css//rtl.css';

export default function AdminWaitingList() {
    
   const [ar,setAr] = useState([]);
   const [show,setShow] = useState(false);
   const [value, setValue] = useState(moment());
   const [selectedValue, setSelectedValue] = useState(moment());
   const DateSelected = selectedValue?.format('DD-MM-YYYY');
   const {DateNow} = useContext(AppContext);


    useEffect(() =>{
        doApi();
    },[DateSelected])
  

    const onSelect = (newValue) => {
        setValue(newValue);
        setSelectedValue(newValue);
        console.log(selectedValue?.format('DD-MM-YYYY'));   
      };
    
    const doApi = async() =>{
        let url = API_URL+`/waitingLists/${DateSelected}`;
        let resp = await doApiGet(url);
        console.log(resp.data);
        setAr(resp.data);
        if(resp.data.length == 0){
            setShow(true);
           console.log("אין רשימת המתנה לתאריך זה")
          }else{
            setShow(false);
          }
    }

    const onDelClick = async(_idDel) =>{
        let url = API_URL+"/waitingLists/"+_idDel;
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
    <div className='container rtlFluid'>
        <h1 className='text-center mt-5 display-4'>רשימת המתנה</h1>
        <h4>התאריך היום: {DateNow}</h4>
      <Calendar value={value} fullscreen={false} onSelect={onSelect} />
      <h4 className='m-3'>התאריך שנבחר: {DateSelected}</h4>
      {show? <div className='fs-5 mt-5 text-center'>אין רשימת המתנה לתאריך זה</div> : 
        <table className='table table-striped table-hover mt-3'>
            <thead className='bg-dark text-white'>
                <tr>
                    <td>#</td>
                    <td>שם</td>
                    <td>תאריך</td>
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
                    <td>{item.date}</td>
                    <td><a target={"_blank"} href={`https://api.whatsapp.com/send/?phone=972${item.phone.substring(1)}&text=היי מה קורה ${item.name}? התפנה לי תור האם אתה מעוניין להגיע? ?&type=phone_number&app_absent=0`}>{item.phone}</a></td>
                    <td>
                        <button onClick={() =>{
                            window.confirm("אתה בטוח שאתה רוצה למחוק?") &&
                            onDelClick(item._id);
                        }} className='btn btn-danger me-2'>מחק</button>
                    </td>
                    </tr>
                )
            })}
        </tbody>
        </table>}
    </div>
    </React.Fragment>
  )
}
