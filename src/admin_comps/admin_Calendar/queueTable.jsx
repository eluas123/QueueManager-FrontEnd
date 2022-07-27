import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert,Calendar } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { useEffect } from 'react';
import AdminListAppoint from './adminListAppoint';
import { useContext } from 'react';
import { AppContext } from '../../context/context';


const QueueTable = () => {

const {displayTodaysDate} = useContext(AppContext);
  
  const [ar,setAr] = useState([]);
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  useEffect(() =>{
    doApi();
   },[selectedValue])


   const doApi = async() =>{
    let url = API_URL+`/appointments/list-appointments/${selectedValue?.format('DD-M-YYYY')}`;
    let resp = await doApiGet(url);
    console.log(resp.data);
    setAr(resp.data);
    if(resp.data.length == 0){
     console.log("There is no appointments today")
    }
  }

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    console.log(selectedValue?.format('DD-M-YYYY'));    
  };


  return (
    <div className="container">
      <h1>Today is: {displayTodaysDate}</h1>
       <Alert message={`You selected date: ${selectedValue?.format('DD-M-YYYY')}`} />
      <Calendar value={value} fullscreen={false} onSelect={onSelect} />
      <hr></hr>
      <h1 className='text-center'>All Appointments: </h1>
       {ar.map(item => {
        return (
          <AdminListAppoint item={item}/> 
        )
       })}
    </div>
  );
};

export default QueueTable;