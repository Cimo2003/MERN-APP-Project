import { createContext, useEffect, useReducer, useState } from "react"

export const AuthContext = createContext()

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNIN':
            return {
                user: action.payload
            }
        case 'SIGNOUT':
            return {
                user: null
            }
        default:
            return state
    }
}

const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, { user: null })
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({
               type: 'SIGNIN',
               payload: user
            })
        }
    },[])
    return ( 
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
     );
}

export default AuthContextProvider