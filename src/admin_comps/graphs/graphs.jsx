import React, { useEffect } from 'react'
import { useState } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import AdminAuthComp from '../adminAuthComp';
import AdminHeader from '../adminHeader';
import FooterAdmin from '../footerAdmin';
import CanvasJSReact from './canvasjs.react';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Graphs() {

    const [count,setCount] = useState([]);

    useEffect(() => {
        doApi();
    }, [])
    
    const doApi = async () => {
        let url = API_URL+"/appointments/graphs";
        let resp = await doApiGet(url);
        // console.log(resp.data)
        setCount(resp.data)
    }

    const ar = [
        {label:"ינואר", y:count[0]},
        {label:"פבואר", y:count[1]},
        {label:"מרץ", y:count[2]},
        {label:"אפריך", y:count[3]},
        {label:"מאי", y:count[4]},
        {label:"יוני", y:count[5]},
        {label:"יולי", y:count[6]},
        {label:"אוגוסט", y:count[7]},
        {label:"ספטמבר", y:count[8]},
        {label:"אוקטובר", y:count[9]},
        {label:"נובמבר", y:count[10]},
        {label:"דצמבר", y:count[11]}
    ]

    const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2", //"light1", "dark1", "dark2"
        title:{
            text: "תורים שנקבעו לשנת 2022"
        },
        axisY: {
            includeZero: true,
            title:"כמות התורים שנקבעו"
        },
        axisX: {
            includeZero: true,
            title:"חודש"
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            //indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: ar
        }]
    }

  return (
    <React.Fragment>
        <AdminHeader/>
        <AdminAuthComp/>
        <div className='container-fluid'>
    <div className='container'>
    <h1 className='display-4 text-center my-5'>כל התורים שנקבעו פר חודש</h1>
<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
    </div>
    </div>
    <FooterAdmin/>
    </React.Fragment>
  )
}
