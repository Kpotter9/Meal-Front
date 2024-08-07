import "./Shoppinglist.css"
import { useContext,useState,useEffect,useRef } from "react"
import api from "../../api/axiosConfig"
import AuthContext from "../../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";



import React from 'react'


const ShoppingList = () => {
    const navigate=useNavigate();
    const removeItem=async(item,index )=> {
        try{
            const response=api.post("api/items/remove",

                JSON.stringify({uname:auth,id:item}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }

            )
            const newlist=[...list]
            newlist.splice(index,1)
            setList(newlist)
        }catch(err){
            console.error(err)
        }
      
      }
      const currRef=useRef();
    const { auth,isLoggedIn } = useContext(AuthContext);

    const [list, setList] = useState([]);
    const makeList=async() =>{
        try{
            const response = await api.get(`/api/user/getlist/${auth}`);
            setList(response.data);
             console.log(response)
        }catch(err){
            console.error(err);
        }


    }
  useEffect(() => {
    if (!isLoggedIn){navigate("/")}
    
    makeList();
  },[])
  return (<center>
    <br/>
    <h1>Shopping List</h1>
    <div className="list" ref={currRef}>
        
        {
               
               list&&list.map((item,index)=> {
                return(
                    <button className="item" ref={currRef} onClick={()=>removeItem(item.id,index)} key={item.id}>{item.item}</button>
                )
               })
               
               
               
               
               }
    </div></center>
  )




    }



    


export default ShoppingList