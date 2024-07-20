import "./Holder.css"
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig"

import React from 'react'
import {useState, useEffect} from "react"
import { Button } from "react-bootstrap";

const Holder = () => {
    const [recipe, setRecipe]= useState();


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
           if(nutrients!=null){
            return(<div className="holdNutr">
                Cal: {nutrients.kcal}<br/>
                Fat: {nutrients.fat} <br/>
                Saturates: {nutrients.saturates} <br/>
                Carbs: {nutrients.carbs} <br/>
                Surgar: {nutrients.sugars} <br/>
                Fiber: {nutrients.fibre} <br/>
                Protein: {nutrients.protein} <br/>
                Salt: {nutrients.salt}<br/>
                </div>)
           }
        

        
      })

      useEffect(() => {
        getRecipe()
      }, [])
  return (
    
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
            <img className="pic"src={recipe&&recipe.image} alt="null" />
            <div className="discription">
                {recipe&&recipe.description}
               <div className="nutrients">
                {getNutrients(recipe&&recipe.nutrients)}
               </div>
               
                </div>
                <div className="link"> 
                    <Button  variant="primary" size="lg" href={recipe&&recipe.url} target="_blank">More Info</Button>
                </div>
            </div>
            
                
            
                <div className="recipe">
                    <div className="ingredient">
                {recipe&&recipe.ingredients.map((ingredient)=>
                    <li>{ingredient}</li>
            ) }
               </div>
                <div className="steps">
                {recipe&&recipe.steps.map((step)=>
                    <li>{step}</li>
            ) }
                </div>
                </div>
                

               
                
                



        </div>
  )
}

export default Holder