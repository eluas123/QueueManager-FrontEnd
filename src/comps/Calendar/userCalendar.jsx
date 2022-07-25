import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert,Calendar } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const UserCalendar = () => {

const showDate = new Date();
  const displayTodaysDate = showDate.getDate()+'-'+(showDate.getMonth()+1)+'-'+showDate.getFullYear();
  
  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());

  const onPanelChange = (value, mode) => {
    console.log(value.format('DD-M-YYYY'), mode);
  };

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  

  const check = () =>{
  if(displayTodaysDate==selectedValue?.format('DD-M-YYYY')){
    console.log("elias agever")
  }
else{
  console.log("elias ygaroa");
}
  }


  return (
    <div className="container">
       <Alert message={`You selected date: ${selectedValue?.format('DD-M-YYYY')}`} />
       <button onClick={check}>X</button>
      <Calendar  fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} />
      <h4 className='text-center mt-5'>Appointments available for the date {selectedValue?.format('DD-M-YYYY')}</h4>
      <h4 className='text-center mt-5'>Appointments available for the date {displayTodaysDate}</h4>
      <hr></hr>
    </div>
  );
};

export default UserCalendar;
