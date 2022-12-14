import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { toast } from 'react-toastify';
import { Button, Calendar } from 'antd';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import moment from 'moment';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { API_URL, doApiGet, doApiMethod, TOKEN_NAME } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import HeaderClient from '../headerClient';
import ClientAuthComp from '../clientAuthComp';
import WaitinLists from './waitingLists';


export default function Appointments() {

  const { DateNow, user,Loading } = useContext(AppContext);
  let [srv, setSrv] = useState({});
  let [nameService, setNameService] = useState({});
  let [appointmentsArr, setAppointmentsArr] = useState([]);
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  let DateSelect = selectedValue?.format('DD-MM-YYYY');

  let params = useParams();

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  useEffect(() => {
    doApi();
  }, [DateSelect]);


  const doApi = async () => {
    let urlService = API_URL + "/typeServices/infoService/" + params.idService;
    let urlWorkHours = API_URL + "/workHours/workHoursByDate/" + DateSelect;
    let respService = await doApiGet(urlService);
    let respWorkHours = await doApiGet(urlWorkHours);
    console.log(respWorkHours)
    if(respWorkHours.data.length == 0){
      setAppointmentsArr([]) 
      return;
    }
    setAppointmentsArr(respWorkHours.data[0].appointmentsArr)
    setSrv(respService.data.lengthService);
    setNameService(respService.data.name);
  }

  const doApiPOST = async (time, index) => {
    let url = API_URL + "/appointments";
    let data = {
      time: time,
      userID: user.name,
      phone: user.phone,
      serviceID: nameService,
      Date: DateSelect,
      indexArray: index,
      serviceLength: srv / 30
    }
    try {
      let resp = await doApiMethod(url, "POST", data);
      console.log(resp.data);
      if (resp.data._id) {
        toast.success("your appointment succeffuly");
        doApi();
      }
    }
    catch (err) {
      console.log(err.response);
      toast.error("There erorr try again laterPOST");
    }
  }

  let array = [];
  for (let i = 0; i < appointmentsArr.length; i += (srv / 30)) {
    array[i] = appointmentsArr[i];
  }

  const doApiEdit = async (time) =>{
    let url = API_URL + `/workHours/newAppointmentsArray/${DateSelect}/${srv}/${time}`;
    try{
      let resp = await doApiMethod(url, "PUT");
      if(resp.data.modifiedCount == 1){
        doApi();
      }
    }
    catch(err){
      console.log(err.response);
      toast.error("There is error try again later")
    }
  }



  return (
    <React.Fragment>
      <HeaderClient />
      <ClientAuthComp />
      <div className='container-fluid rtlFluid'>
      {Loading ?
         <div className="text-center">
         <img src='https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif'
/>
       </div> :
        <div className='container'>
          <h1 className='text-center display-5 mt-5'>?????????? ????????????</h1>
          <h4>???????????? ????????: {DateNow}</h4>
          <strong>?????? ???? ?????????? ???????????? ?????????? ????????????</strong>
          <Calendar value={value} fullscreen={false} onSelect={onSelect} />
          <hr />
          <h4 className='text-center'>?????? ???????????? ?????????????? ????????????: {DateSelect}</h4>
          {appointmentsArr.length == 0? <div className='text-center mt-5 fs-3'><h2>?????? ?????????? ???????????? ???????????? ????</h2></div> :
            <div className='appointments'>
              {array.map((val, i) => {
                return (
                  <Button onClick={() => {
                    window.confirm("Are you sure you want to add this appointment?") &&
                      doApiPOST(val, i)&&
                      doApiEdit(val)
                  }} key={i}>{val}</Button>
                )
              })}
            </div>}
            <WaitinLists Date={DateSelect}/>
        </div>}
      </div>
    </React.Fragment>
  )
}
