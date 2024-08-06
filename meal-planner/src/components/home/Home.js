import "./Home.css"
import {Link} from "react-router-dom"
import {useRef,useState , useEffect, useContext} from "react";
import api from "../../api/axiosConfig";

import React from 'react'
import {Paper} from "@mui/material"


const Home = ({recipes}) => {
  const currRef=useRef();
  const [search, setSearch]=useState("");
  const [curRecipes,setRecipes]=useState();


  const findSearch=async()=>{
      try{
        let toSearch=search
        toSearch=toSearch.split(" ").join("_");
        
        if(toSearch.length>0){
         const response=await api.get(`/api/meals/search/${toSearch}`)
         if(response.data.length>0){
         setRecipes(response.data)}}
        else{ const response=await api.get(`/api/meals`)
          setRecipes(response.data)
        }
        
      }catch(err){
        console.error(err)
        let toSearch=search
        toSearch=toSearch.split(" ").join("_");
        console.log(`/meals/search/${toSearch}`)
      }

  }




  useEffect(() => {
      findSearch()
  },[search]
)
useEffect(() => {
  setRecipes(recipes)
},[]
)
  return (<>
    
    <center className="recipes-holder" ref={currRef}>
    <input type="text" className="search-input" 
          placeholder="Search" value={search}
          id="search" onChange={(e)=>setSearch(e.target.value)}
          />
        <div className="container">
          
           {curRecipes&& curRecipes.map((recipe) => {
            return(
                <Paper key={recipe.id}className="recipeHolder">
           <Link to= {`/singleRecipe/${recipe.id}`}>
           <img className="image" src={recipe.image} alt="" />
                <div className="infoHolder">
                    {recipe.name}
                </div>
        </Link>
        </Paper>
        
            )
})


 }
 </div>

    </center>
    </>
  )
}

export default Home