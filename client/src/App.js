import "./App.css";
import React,{useEffect} from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { Routes, Route,useNavigate} from "react-router-dom";
import { useAppState } from './AppState.jsx';


function App() {
  const navigate =useNavigate()
  const {dispatch} = useAppState()
  useEffect(()=>{
    const auth = localStorage.getItem('token')
    if(auth){
      dispatch({type:'auth', payload:auth})
      navigate('/dashboard')
    }else{
      navigate('/')
    }

  }, [])
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/:form" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
