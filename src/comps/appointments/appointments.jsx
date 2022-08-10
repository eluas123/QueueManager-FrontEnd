import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { toast } from 'react-toastify';
import { Button, Calendar } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import '../../css/appointments.css';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';

export default function Appointments() {

const {displayTodaysDate} = useContext(AppContext);
let [ar,setAr] = useState({});
let [start,setStart] = useState({});
let [srv,setSrv] = useState({});
let [nameService,setNameService] = useState({});
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
     let urlService = API_URL+"/typeServices/infoService/"+params.idService;
    let urlWorkHours = API_URL+"/workHours/infoworkHours/getID/"+DateSelect;
    let respService = await doApiGet(urlService);
    let respWorkHours = await doApiGet(urlWorkHours);
    // console.log("service ",respService.data);
    setSrv(respService.data.lengthService);
    setNameService(respService.data.name);
    // console.log("workhours ",respWorkHours.data.start);
    setStart(respWorkHours.data.start);
    // console.log("workhours ",respWorkHours.data.end);
    Number(respWorkHours.data.end);
    Number(respWorkHours.data.start);
    let distance = (respWorkHours.data.end.substring(0,2)) - (respWorkHours.data.start.substring(0,2));
    // console.log("distance",distance);
    setAr(distance)
   }

   const doApiPOST = async(time) =>{
    let url = API_URL+"/appointments";
    let data = {
      time: time,
      serviceID: nameService,
      Date: DateSelect
    }
    console.log("data",data);
    try{
    let resp = await doApiMethod(url,"POST",data);
    console.log(resp.data);
    if(resp.data._id){
    toast.success("your appointment succeffuly");
    doApi();
    }
  }
    catch(err){
      console.log(err.response);
      toast.error("There erorr try again later");
    }
  }

    const Appointment = () =>{
      let array = [];
      let dist = (ar*60)/srv;
      for (let i = 0; i < dist; i++) {
        array[i] = moment(start,'HH:mm').add(srv,'minutes').format('HH:mm');
        start = array[i];
   }
         return array.map((val) =>{
          return <Button onClick={()=>{
            window.confirm("Are you sure you want to add this appointment") &&
            doApiPOST(val);
          }} key={val}>{val}</Button>
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
