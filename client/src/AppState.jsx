//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
import React, { useReducer } from "react";

const initialState = {
  url: "http://localhost:3000/",
  token: null,
  username: null,
};

const reducer = (state, action) => {
    let newState;
  switch (action.type) {
    case "auth":
      newState= {...state,...action.payload}
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
