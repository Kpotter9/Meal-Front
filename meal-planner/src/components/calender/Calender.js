import "./Calender.css"
import AuthContext from "../../context/AuthProvider";
import { useContext,useState,useEffect } from "react"
import {Link} from "react-router-dom"

import api from "../../api/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";

import React from 'react'

const Calender = () => {

    const date= new Date();

    function Day({week_day}){
        const[plans,setPlans]=useState();
        const { auth,isLoggedIn } = useContext(AuthContext);
    
       
    
        const getDay =async  ()=>{
            try{
                const response = await api.post("api/user/getplans",
                    JSON.stringify({username: auth, days: week_day}),
                    {
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    }
                  );
    
                setPlans(response.data)
            }catch(e){
                console.error(e)
    
    
            }
        }
    
        const day_name=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        useEffect(() => {
            getDay()
          }, [])
        return(
    <div className="day">
        <h3 className="cal_head">{day_name[(week_day+date.getDay())%7]}</h3>
            <div className="plans">
               {
               
               
               plans&&plans.map((planned)=> {
                return(
                    <Link className="recipe_plan" to={`/singleRecipe/${planned.recipe[0].id}`}>
                        {
                        planned.recipe[0].name}</Link>
    
                )
               })
               
               
               
               
               }
    
    
    
    
                
            </div>
            
    
    </div>)
    }






const {isLoggedIn } = useContext(AuthContext);
const navigate=useNavigate();

    if (!isLoggedIn){ 
        
        return(navigate("/")
    )}
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