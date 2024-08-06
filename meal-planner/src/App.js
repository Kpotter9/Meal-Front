import './App.css';
import Home from './components/home/Home'
import Header from './components/nav/Header'
import {Route, Routes,Link} from "react-router-dom"
import api from "./api/axiosConfig"
import {useState, useEffect} from "react"
import Login from "./components/login/Login"
import Holder from './components/holder/Holder'
import Register from"./components/login/Register"
import Calender from"./components/calender/Calender"
import Add from"./components/add/Add"
import MakeRecipe from './components/makeRecipe/MakeRecipe';
import ShoppingList from './components/shoppingList/ShoppingList.js';
function App() {
  const [recipes, setRecipes]= useState();
  const [User, setUser]=useState();


  const getRecipes =async() => {
    
    try {
      const responses = await api.get("/api/meals")
      setRecipes(responses.data);
    } catch (err) {
      console.error(err)
    }

    
  }
  
  useEffect(() => {
    getRecipes()
  }, [])
  return (
  <div className="App">
  <Header/>
  <Routes>

    
    
    <Route path='/' element={<Home recipes={recipes}/>}/>
    <Route path ='singleRecipe/:recipeId' element={<Holder />}/>
    <Route path ='/login'  element={<Login/>} />
    <Route path ='/register'  element={<Register/>} />
    <Route path ='/calender'  element={<Calender/>} />
    <Route path ='add/:recipeId'  element={<Add/>} />
    <Route path="/makeRecipe" element={<MakeRecipe/>}/>
    <Route path ="/shoppinglist" element={<ShoppingList/>}/>




    

  </Routes>
  </div>)
}

export default App;
