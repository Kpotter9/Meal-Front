import './App.css';
import Home from './components/home/Home'
import Header from './components/nav/Header'
import {Route, Routes,Link} from "react-router-dom"
import api from "./api/axiosConfig"
import {useState, useEffect} from "react"
import Login from "./components/login/Login"
import Holder from './components/holder/Holder'
import Register from"./components/login/Register"
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


    

  </Routes>
  </div>)
}

export default App;
