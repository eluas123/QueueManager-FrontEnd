import React, { useContext } from 'react'
import { toast } from 'react-toastify';
import { AppContext } from '../../context/context';
import { API_URL, doApiMethod } from '../../services/apiService';
import '..//..//css//rtl.css';

export default function WaitinLists(props) {

    const { user } = useContext(AppContext);


    const doApiPOST = async() =>{
        let url = API_URL+"/waitingLists";
        let data = {
            name:user.name,
            phone:user.phone,
            date:props.Date
        }
        try{
         let resp = await doApiMethod(url,"POST",data);
         console.log(resp.data);
         if(resp.data._id){
          toast.success("התווספת בהצלחה לרשימת ההמתנה");
         }
        }
        catch(err){
          console.log(err.response);
          toast.error("There error try again later");
        }
      }

  return (
    <React.Fragment>
      <div className='container text-center justify-content-center rtlFluid'>
        <p className='fs-5 mt-5 waitingListText'>במידה והתורים לא מסתדרים לכם תוכלו להיכנס לרשימת ההמתנה כאן למטה וניצור אתכם קשר במידה ויתפנה תור    </p>
<button onClick={() =>{
    window.confirm("אתה בטוח שאתה רוצה להירשם לרשימת ההמתנה?") &&
    doApiPOST();
}} className='btn btn-primary mb-4'>הירשם לרשימת ההמתנה</button>
      </div>
    </React.Fragment>
  )
}
