import React from 'react'
import  "./MakeRecipe.css"
import { useRef,useState,useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";

import api from "../../api/axiosConfig";

const MakeRecipe = () => {
    const navigate=useNavigate();

     const currRef=useRef();
    const [ingredients,setIngredients] =useState([{ingredient:""}]);
    const [name,setName] = useState("")
    const [author,setAuthor] = useState("")
    const [url,setUrl] = useState("")
    const [image,setImage] = useState("")
    const [description,setDescription] = useState("")
    const [steps,setSteps] = useState([{step:""}])
    const [serves,setServes] = useState("")
    const [nutrients,setnutrientations] = useState([{nutrient:""},{nutrient:""},{nutrient:""},{nutrient:""}
        ,{nutrient:""},{nutrient:""},{nutrient:""},{nutrient:""}
    ])
    const [time,setTime] = useState([{time:""},{time:""}])
    const [difficult,setDifficult] = useState("")
    const addIngredient =() => {
        setIngredients([...ingredients,{ingredient:""}])
    }
    const removeIngredient =(index)=>{
        const list =[...ingredients]
        list.splice(index,1)
        setIngredients(list)
    }
    const handleIngredient= (e,index)=>{
        const list=[...ingredients]
        list[index]["ingredient"]=e.target.value
        setIngredients(list)
    }



    const addStep =() => {
        setSteps([...steps,{step:""}])
    }
    const removeStep =(index)=>{
        const list =[...steps]
        list.splice(index,1)
        setSteps(list)
    }
    const handleStep= (e,index)=>{
        const list=[...steps]
        list[index]["step"]=e.target.value
        setSteps(list)
    }




    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
           
            var stepList=""
            

            
            steps.map((step)=>{
                stepList+=step.step+",_"
            })
            stepList=stepList.slice(0,stepList.length-2)
                
            var nutrientList=""
            nutrients.map((nutrient)=>{
                nutrientList+=nutrient.nutrient+",_"
            })
            nutrientList=nutrientList.slice(0,nutrientList.length-2)   
            
            
            var timeList=""
            time.map((time)=>{
                timeList+=time.time+",_"
            })
            timeList=timeList.slice(0,timeList.length-2)   
            


            var ingredientsList=""
            ingredients.map((ingredient)=>{
                ingredientsList+=ingredient.ingredient+",_"
            })
            ingredientsList=ingredientsList.slice(0,ingredientsList.length-2)  

            const response = await api.post(`/api/meals/add`,
                JSON.stringify({name:name,url:url,image:image,
                    description:description,author:author,
                    ingredients:ingredientsList,steps:stepList,time:timeList,
                difficulty:difficult,serves:serves,nutrients:nutrientList}),
                {
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  }

            )
            navigate("/")
        }
        catch(err){
           
            var stepList=""
            

            
            steps.map((step)=>{
                stepList+=step.step+",_"
            })
            stepList=stepList.slice(0,stepList.length-2)
                
            var nutrientList=""
            nutrients.map((nutrient)=>{
                nutrientList+=nutrient.nutrient+",_"
            })
            nutrientList=nutrientList.slice(0,nutrientList.length-2)   
            
            
            var timeList=""
            time.map((time)=>{
                timeList+=time.time+",_"
            })
            timeList=timeList.slice(0,timeList.length-2)   
            


            var ingredientsList=""
            ingredients.map((ingredient)=>{
                ingredientsList+=ingredient.ingredient+",_"
            })
            ingredientsList=ingredientsList.slice(0,ingredientsList.length-2)  
            console.log(JSON.stringify({name:name,url:url,image:image,description:description,author:author,ingredients:ingredientsList,steps:stepList,time:timeList,
            difficulty:difficult,serves:serves,nutrients:nutrientList}))

        }
    }
  return (
    
        <form ref={currRef} onSubmit={handleSubmit} >
            <div className="main-info-container">
                <div className="left">
                <label htmlFor='name'>Name:</label>
            <input type="text" 
            id='name'
            ref={currRef}
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
            />
            <label htmlFor='author'>Author:</label>
            <input type="text" 
            id='author'
            ref={currRef}
            value={author}
            onChange={(e)=> setAuthor(e.target.value)}
            required
            />

            
            
                <label htmlFor='url'>Link:</label>
            <input type="text" 
            id='url'
            ref={currRef}
            value={url}
            onChange={(e)=> setUrl(e.target.value)}
            required
            />


                <label htmlFor='image'>Image Link:</label>
            <input type="text" 
            id='image'
            ref={currRef}
            value={image}
            onChange={(e)=> setImage(e.target.value)}
            required
            />

            <label htmlFor='description'>Description:</label>
            <textarea type="text" id='description' ref={currRef}
            value={description} onChange={(e)=>setDescription(e.target.value)}
            required/>


<label htmlFor='serves'>How Many People Does This Serve:</label>
            <input type="text" 
            id='serves'
            ref={currRef}
            value={serves}
            onChange={(e)=> setServes(e.target.value)}
            required
            />
           
            <label htmlFor='difficult'>Difficulty:</label>
            <input type="text" 
            id='difficult'
            ref={currRef}
            value={difficult}
            onChange={(e)=> setDifficult(e.target.value)}
            required
            />


<label htmlFor='cook_time'>Cook Time:</label>
            <input type="text" 
            id='time'
            ref={currRef}
            value={time[0]["time"]}
            onChange={(e)=> {const list=[...time]
                list[0]["time"]=e.target.value
                setTime(list)}}
            required
            />
            <label htmlFor='prep_time'>Prep Time:</label>
            <input type="text" 
            id='time'
            ref={currRef}
            value={time[1]["time"]}
            onChange={(e)=> {const list=[...time]
                list[1]["time"]=e.target.value
                setTime(list)}}
            required
            />


</div>
<div className="right">

                <label htmlFor='kcal'>Calories:</label>
                <input type="text" 
            id='kcal'
            ref={currRef}
            value={nutrients[0]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[0]["nutrient"]=e.target.value
                setnutrientations(list)}}
            />
             <label htmlFor='fat'>Fat:</label>
                <input type="text" 
            id='fat'
            ref={currRef}
            value={nutrients[1]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[1]["nutrient"]=e.target.value
                setnutrientations(list)}}
            />

<label htmlFor='saturates'>Saturates:</label>
                <input type="text" 
            id='saturates'
            ref={currRef}
            value={nutrients[2]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[2]["nutrient"]=e.target.value
                setnutrientations(list)}}
            />

<label htmlFor='carbs'>Carbs:</label>
                <input type="text" 
            id='carbs'
            ref={currRef}
            value={nutrients[3]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[3]["nutrient"]=e.target.value
                setnutrientations(list)}}
            />
<label htmlFor='sugars'>Sugars:</label>
                <input type="text" 
            id='sugars'
            ref={currRef}
            value={nutrients[4]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[4]["nutrient"]=e.target.value
                setnutrientations(list)}}
            />
            <label htmlFor='fibre'>Fiber:</label>
                <input type="text" 
            id='fibre'
            ref={currRef}
            value={nutrients[5]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[5]["nutrient"]=e.target.value
                setnutrientations(list)}}
            />
            <label htmlFor='protein'>Protein:</label>
                <input type="text" 
            id='protein'
            ref={currRef}
            value={nutrients[6]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[6]["nutrient"]=e.target.value
                setnutrientations(list)}}
            />
            <label htmlFor='salt'>Salt:</label>
                <input type="text" 
            id='salt'
            ref={currRef}
            value={nutrients[7]["nutrient"]}
            onChange={(e)=> {const list=[...nutrients]
                list[7]["nutrient"]=e.target.value
                setnutrientations(list)}}
            /> 









        {ingredients.map((singleingredient,index) =>{

            return(<div ref={currRef} key={index}  className='listItems'> 
                <label htmlFor='ingredient'>Ingredient {index+1}:</label>
                <input type="text" 
            id="ingredient"
            value={singleingredient.ingredient}
            onChange={(e) =>handleIngredient(e,index)}
            required
            /> <button type="button" onClick={()=>removeIngredient(index)}
            > Remove
            </button>
            
            </div>)
        })

        
        } 
        
        <button type="button"  onClick={addIngredient}>Add Ingredient</button>


        <label htmlFor='steps'>Steps:</label>    
        {steps.map((singleStep,index) =>{

            return(<div ref={currRef} key={index} className='listItems'>
                <label htmlFor='step'>Step {index+1}:</label>
                <input type="text" 
            id="step"
            value={singleStep.step}
            onChange={(e) =>handleStep(e,index)}
            required
            /> <button type="button" onClick={()=>removeStep(index)}
            > Remove
            </button>
            
            </div>)
        })

        
        }


        
<button type="button"  onClick={addStep}>Add Step</button>
        </div>
        
        </div>
        <button type='submit'>submit</button>

        
        </form>
  )
}

export default MakeRecipe