//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
import React, { useReducer } from "react";

const initialState = {
  url: "http://localhost:3000/",
  token: null,
  username: null,
  notes: [], 
  new: {
     title: '',
     body: ''
  },
  edit: {
    id: 0,
    title: '',
    body: ''
  }
};

const reducer = (state, action) => {
    let newState;
  switch (action.type) {
    case "auth":
      newState= {...state,...action.payload}
      return newState 
    case 'logout':
      newState= {...state,token:null,username:null}
      localStorage.removeItem('token')
      return newState
    case 'getNotes':
      console.log("getNotesAppState",action.payload)
     newState ={...state, notes: action.payload}
     return newState
     case 'select':
      console.log("getNotesAppState",action.payload)
     newState ={...state, edit: action.payload}
     return newState
    default:
      return state;
  }
};
const AppContext = React.createContext(null);
//////////////////////////////////////////////////////
///APP COMPONENT
//////////////////////////////////////////////////
export const AppState = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}{" "}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  return React.useContext(AppContext);
};
