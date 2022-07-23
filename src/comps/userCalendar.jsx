import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Alert,Calendar } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';

const UserCalendar = () => {

  const [value, setValue] = useState(moment());
  const [selectedValue, setSelectedValue] = useState(moment());
  const onPanelChange = (value, mode) => {
    console.log(value.format('DD-MM-YYYY'), mode);
  };

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    console.log(selectedValue?.format('DD-MM-YYYY'));
  };

  return (
    <div className="container">
       <Alert message={`You selected date: ${selectedValue?.format('DD-MM-YYYY')}`} />
      <Calendar value={value} fullscreen={false} onSelect={onSelect} onPanelChange={onPanelChange} />
      <h4 className='text-center mt-5'>Appointments available for the date {selectedValue?.format('DD-MM-YYYY')}</h4>
      <hr></hr>
    </div>
  );
};

export default UserCalendar;
