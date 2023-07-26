//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
import React, { useReducer } from "react"

const initialState ={
    url: '/'
}


const reducer = (state,action) =>{
      switch(action.type){ 
        default:
            return  state

      }
}
const AppContext = React.createContext(null)
 //////////////////////////////////////////////////////
 ///APP COMPONENT
 //////////////////////////////////////////////////
export const  AppState = (props) =>{

    const [state,dispatch] = useReducer(reducer,initialState)

    return <AppContext.Provider  value={{state,dispatch}}>{props.children} </AppContext.Provider>

}

export const useAppState = () =>{
    return React.useContext(AppContext)
}