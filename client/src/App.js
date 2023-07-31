import "./App.css";
import React,{useEffect} from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import { Routes, Route,useNavigate} from "react-router-dom";
import { useAppState } from './AppState.jsx';
import Forming from "./components/Forming";



function App() {

  const { state, dispatch } = useAppState();
  const { url, token } = state;

  const getNotes = async () => {
    try {
      const response = await fetch(url + "notes/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token, 
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notes.");
      }

      const notesData = await response.json();
      dispatch({ type: "getNotes", payload: notesData });
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };
  const navigate =useNavigate()
  
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
        <Route path="/dashboard/*" element={<Dashboard  getNotes={getNotes}   />} />
        <Route path="/dashboard/new" element={<Forming getNotes={getNotes} />}/>
      
      </Routes>
    </div>
  );
}

export default App;
