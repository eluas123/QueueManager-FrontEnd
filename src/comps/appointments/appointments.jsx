import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Calendar } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { useParams } from 'react-router-dom';

export default function Appointments() {

const {displayTodaysDate} = useContext(AppContext);
const [ar,setAr] = useState({});
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const DateSelect = selectedValue?.format('DD-M-YYYY');

  let params = useParams();

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  useEffect(() =>{
     doApi();
  },[]);

   const doApi = async() =>{
    let urlService = API_URL+"/typeServices/infoService/"+params.id;
    let urlWorkHours = API_URL+"/workHours/infoworkHours/"+DateSelect;
    let respService = await doApiGet(urlService);
    let respWorkHours = await doApiGet(urlWorkHours);
    console.log("service ",respService.data);
    console.log("workhours ",respWorkHours.data.end - respWorkHours.data.start);
    let distance = respService.data.price + respService.data.lengthService
    console.log(distance)
    setAr(distance)
   }


  return (
    <div className='container-fluid'>
    <div className='container'>
        <h1>Select the day you wanted</h1>
        <h4>Today is: {displayTodaysDate}</h4>
        <Calendar value={value} fullscreen={false} onSelect={onSelect} />
        <hr/>
        <h4 className='text-center'>All Appointments for {DateSelect}</h4>
        <div className='row'>
          {ar.map}
        </div>
    </div>
    </div>
  )
}
