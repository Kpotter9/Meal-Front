import "./Holder.css"
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig"
import { Link } from "react-router-dom";
import React from 'react'
import {useState, useEffect,useContext} from "react"
import { Button } from "react-bootstrap";
import AuthContext from "../../context/AuthProvider";



const Holder = () => {
    const [recipe, setRecipe]= useState();
    const {isLoggedIn}=useContext(AuthContext);

    let params=useParams();
    const key=params.recipeId;
    const getRecipe =async() => {
        

        try {
          const responses = await api.get(`/api/meals/${key}`)
          const recipe = responses.data
          setRecipe(responses.data);
        } catch (err) {
          console.error(err)
        }}
        const getNutrients=((nutrients)=>{
           if(nutrients!=null&&nutrients.kcal!=null){
            return(<div className="holdNutr">
                Cal: {nutrients.kcal} Fat: {nutrients.fat} Saturates: {nutrients.saturates} Carbs: {nutrients.carbs} Surgar: {nutrients.sugars} Fiber: {nutrients.fibre} Protein: {nutrients.protein} Salt: {nutrients.salt}<br/>
                </div>)
           }
        

        
      })

      useEffect(() => {
        getRecipe()
      }, [])
  return (<center>                                {isLoggedIn?<Link className="Add_Button" to={`/add/${key}`}>ADD</Link>: null}

<button className="info_button" variant="primary" size="lg" href={recipe&&recipe.url} target="_blank">More Info</button>

        <div key={recipe&&recipe.id} className="container">

            <div className="name">
                    {recipe&&recipe.name}

                </div>
                <div className="about">
                <div >
                Preparation: {recipe&&recipe.times.Preparation}<br/>
                Cook Time: {recipe&&recipe.times.Cooking}
                </div>
                
                Difficulty: {recipe&&recipe.difficult}
               
                </div>
                
            <div className="imageHolder">
                <center>
            <img className="pic"src={recipe&&recipe.image} alt="null" />
            
            <div className="discription">
                {recipe&&recipe.description}
               
               
                </div>
                </center>
            </div>
            
               
            
                
            
                <div className="recipe">
                    <div className="ingredient">
                {recipe&&recipe.ingredients.map((ingredient)=>
                    <p>{ingredient}</p>
            ) }
               </div>
                <div className="steps">
                {recipe&&recipe.steps.map((step,index)=>

                    <p>Step{index+1}:<br/> {step}</p>
            ) }
                </div>
                </div>
                

               
                
                

                {getNutrients(recipe&&recipe.nutrients)}
        </div>
        </center>
  )
}

export default Holder