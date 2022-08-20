import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert,Calendar } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';


export default function QueueTable () {

const {DateNow} = useContext(AppContext);
  
  const [ar,setAr] = useState([]);
  const [show,setShow] = useState(false);
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const DateSelectd = selectedValue?.format('DD-MM-YYYY');

  useEffect(() =>{
    doApi();
   },[selectedValue])


   const doApi = async() =>{
    let url = API_URL+`/appointments/list-appointments/${DateSelectd}`;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
    if(resp.data.length == 0){
      setShow(true);
     console.log("There is no appointments today")
    }else{
      setShow(false);
    }
  }

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    console.log(selectedValue?.format('DD-MM-YYYY'));   
  };


  return (
    <React.Fragment>
      <AdminHeader/>
      <AdminAuthComp/>
    <div className="container">
      <h1 className='text-center mt-5'>רשימת כול התורים שנקבעו</h1>
      <h4>התאריך היום: {DateNow}</h4>
      <Calendar value={value} fullscreen={false} onSelect={onSelect} />
      <hr></hr>
      <h2 className='text-center'>כול התורים לתאריך: {DateSelectd}</h2>
      {show ? <div className='text-center'><h3>לא נקבעו תורים לתאריך זה</h3></div> :
      <table className='table table-striped table-hover mt-3 mb-5'>
            <thead className='bg-dark text-white'>
                <tr>
                    <td>#</td>
                    <td>שם</td>
                    <td> שירות</td>
                    <td>שעה</td>
                    <td>whatsApp</td>
                </tr>
            </thead>
        <tbody>
            {ar.map((item,i) =>{
                return(
                    <tr key={item._id}>
                    <td className='numbers'>{i+1}</td>
                    <td>{item.userID}</td>
                    <td>{item.serviceID}</td>
                    <td>{item.time}</td>
                    <td><a target={"_blank"} href={`https://api.whatsapp.com/send/?phone=972${item.phone.substring(1)}&text=היי מה קורה ${item.userID}? את/ה בדרך?&type=phone_number&app_absent=0`}>{item.phone}</a></td>
                    </tr>
                )
            })}
        </tbody>
        </table>}
    </div>
    {/* <FooterAdmin/> */}
    </React.Fragment>
  )
          }
