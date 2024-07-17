import './App.css';
import Home from './components/home/Home'
import Nav from './components/nav/Nav'
import {Route, Routes,Link} from "react-router-dom"

function App() {
  
  return (
  <div className="App">
  <Nav/>
  <Routes>
    
    
    <Route path='/' element={<Home/>}/>
    <Route/>

    

  </Routes>
  </div>)
}

export default App;
