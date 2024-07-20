import "./Home.css"
import {Link} from "react-router-dom"
import React from 'react'
import {Paper} from "@mui/material"

const Home = ({recipes}) => {
  return (
    
    <center className="recipes-holder">
        <div className="container">
           {recipes&& recipes.map((recipe) => {
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
  )
}

export default Home