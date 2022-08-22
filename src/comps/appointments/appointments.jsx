import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import '../../css/appointments.css';
import { toast } from 'react-toastify';
import { Button, Calendar } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import HeaderClient from '../headerClient';
import ClientAuthComp from '../clientAuthComp';


export default function Appointments() {

const {DateNow,user} = useContext(AppContext);
let [distance,setDistance] = useState({});
let [start,setStart] = useState({});
let [srv,setSrv] = useState({});
let [nameService,setNameService] = useState({});
let [appointmentsArray,setAppointmentsArray] = useState([]);
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  let DateSelect = selectedValue?.format('DD-MM-YYYY');
  let params = useParams();

  useEffect(() =>{
    doApi();
    Appointments();
 },[DateSelect]);

 const onSelect = (newValue) => {
  setValue(newValue);
  setSelectedValue(newValue);
};

  // const hideButton = (i) =>{
    
  //  console.log(appointmentsArray)
  //  Appointments([i]);
  // }

   const doApi = async() =>{
     let urlService = API_URL+"/typeServices/infoService/"+params.idService;
    let urlWorkHours = API_URL+"/workHours/workHoursByDate/"+DateSelect;
    let respService = await doApiGet(urlService);
    let respWorkHours = await doApiGet(urlWorkHours);
    setSrv(respService.data.lengthService);
    setNameService(respService.data.name);
    setAppointmentsArray(respWorkHours.data.appointments)
    console.log("workhours ",respWorkHours.data.start); 
    setStart(respWorkHours.data.start);
    console.log("workhours ",respWorkHours.data.end);
    let distance = (respWorkHours.data.end.substring(0,2)) - (respWorkHours.data.start.substring(0,2));
    setDistance(distance)
   }
   console.log("distance",distance);
   console.log("start",start);
   console.log("srv",srv);


  //  const doApiPOST = async(time) =>{
  //   let url = API_URL+"/appointments";
  //   let data = {
  //     time: time,
  //     userID:user.name,
  //     phone:user.phone,
  //     serviceID: nameService,
  //     Date: DateSelect
  //   }
  //   try{
  //   let resp = await doApiMethod(url,"POST",data);
  //   console.log(resp.data);
  //   if(resp.data._id){
  //   toast.success("your appointment succeffuly");
  //   doApi();
  //   }
  // }
  //   catch(err){
  //     console.log(err.response);
  //     toast.error("There erorr try again later");
  //   }
  // }

    const Appointments = () =>{
      let dist = (distance*60)/srv;
      appointmentsArray.push (moment(start,'HH:mm').format('HH:mm'))
      for (let i = 1; i < dist; i++) {
        appointmentsArray.push = (moment(start,'HH:mm').add(srv,'minutes').format('HH:mm'))
        start = appointmentsArray;
   }
   console.log("appointsment",appointmentsArray)
  }

  return (
    <React.Fragment>
      <HeaderClient/>
      <ClientAuthComp/>
    <div className='container-fluid'>
    <div className='container'>
        <h1>Select the day you wanted</h1>
        <h4>Today is: {DateNow}</h4>
        <Calendar value={value} fullscreen={false} onSelect={onSelect} />
        <hr/>
        <h4 className='text-center'>All Appointments for {DateSelect}</h4>
        <div className='appointments'>
        {appointmentsArray.map((val,i) =>{
          return <Button onClick={()=>{
            // window.confirm("Are you sure you want to add this appointment") &&
            // doApiPOST(val) &&
            // hideButton(i);
          }} key={val}>{val}</Button>
         })}
        </div>
    </div>
    </div>
    </React.Fragment>
  )
}
