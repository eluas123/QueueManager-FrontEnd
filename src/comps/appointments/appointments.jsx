import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Button, Calendar } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import '../../css/appointments.css';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { useParams } from 'react-router-dom';

export default function Appointments() {

const {displayTodaysDate} = useContext(AppContext);
let [ar,setAr] = useState({});
let [start,setStart] = useState({});
let [srv,setSrv] = useState({});
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  let DateSelect = selectedValue?.format('DD-M-YYYY');

  let params = useParams();

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  useEffect(() =>{
     doApi();
  },[]);

   const doApi = async() =>{
    let urlService = API_URL+"/typeServices/infoService/"+params.idCategory;
    console.log("urlService",urlService);
    let urlWorkHours = API_URL+"/workHours/infoworkHours/"+DateSelect;
    let respService = await doApiGet(urlService);
    let respWorkHours = await doApiGet(urlWorkHours);
    console.log("service ",respService.data);
    setSrv(respService.data.lengthService);
    console.log("workhours ",respWorkHours.data.start);
    setStart(respWorkHours.data.start);
    console.log("workhours ",respWorkHours.data.end);
    Number(respWorkHours.data.end);
    Number(respWorkHours.data.start);
    let distance = (respWorkHours.data.end.substring(0,2)) - (respWorkHours.data.start.substring(0,2));
    console.log("distance",distance);
    setAr(distance)
   }

   console.log("srv",srv);
   console.log("start",start)

    const Appointment = () =>{
      let array = [];
      let dist = (ar*60)/srv;
      for (let i = 0; i < dist; i++) {
        array[i] = moment(start,'HH:mm').add(srv,'minutes').format('HH:mm');
        start = array[i];
   }
         return array.map((val) =>{
          return <Button key={val} onClick={()=>{
          }}>{val}</Button>
         })
    }

  return (
    <div className='container-fluid'>
    <div className='container'>
        <h1>Select the day you wanted</h1>
        <h4>Today is: {displayTodaysDate}</h4>
        <Calendar value={value} fullscreen={false} onSelect={onSelect} />
        <hr/>
        <h4 className='text-center'>All Appointments for {DateSelect}</h4>
        <div className='box appointments'>
          {Appointment()}
        </div>
    </div>
    </div>
  )
}
