import { Button } from "@mui/material";
import "./Add.css"
import { Navigate, useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import api from "../../api/axiosConfig";


import React from 'react'

const Add = () => {
    const navigate=useNavigate();

    let params=useParams();
    const recipe=params.recipeId;
    async function  addPlan(day) {
    
        try{
            const response = await api.post('api/user/addplan',
                JSON.stringify({username:auth, days:day, recipe:recipe}),
                    {
                        headers: {
                          'Content-Type': 'application/json',
                        },
                      })

                      try{
                        var list=response.data.recipe[0].ingredients.join(",_");
                        const listResponse=await api.post('api/items/addlist',
                            JSON.stringify({item:list, uname:auth}),
                            {
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                            })



                        
                      }catch(err){
                        console.log(err);
                      }
                      navigate("/")
        }
        catch(err){
            console.error(err);
            console.log(recipe);
        }
        
    
    
    }
    const {auth}=useContext(AuthContext);

    const date= new Date();
function Day({week_day}){
    const day_name=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    return(
<div className="add_day" onClick={()=>addPlan(week_day)}>
    <div className="date">
    <h3 className="add_week">{day_name[(week_day+date.getDay())%7]}</h3>
       
    </div>

</div>)
}
  return (<center>
    <center className="add_cal">
        <Day week_day={0}/>
        <Day week_day={1}/>
        <Day week_day={2}/>
        <Day week_day={3}/>
        <Day week_day={4}/>
        <Day week_day={5}/>
        <Day week_day={6}/>
    </center>
    </center>
  )
}

export default Add