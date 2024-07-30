import "./Calender.css"

import React from 'react'

const date= new Date();
function Day({week_day}){
    const day_name=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    return(
<div className="day">
    <h3>{day_name[(week_day+date.getDay())%7]}</h3>
        <div className="plans">
           




            
        </div>
        

</div>)
}
const Calender = () => {
  return (
    <center>
    <div className="calender">
        {
            Array(7).fill().map((_,i)=>(
                
            <Day week_day={i}/>
            ))

        }
        
    </div>
    </center>
  )
}

export default Calender