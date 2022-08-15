import React from 'react'

export default function Footer(props) {
  return (
    <footer className='container-fluid headerNav'>
       <div className='container text-center text-white pt-4'>
          <strong className=''>copright Elias Areta and Timor Rabani 2022</strong>
          <h2>{props.txt}</h2>
          <button onClick={()=>{
            {props.hideButton()}
          }} className='btn btn-danger'>none</button>
          
       </div>
    </footer>
  )
}
