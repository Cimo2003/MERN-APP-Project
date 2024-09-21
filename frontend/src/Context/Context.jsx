import { createContext, useReducer, useState } from "react"

export const WorkoutsContext = createContext()


const WorkoutsReducer = (state, action) =>{
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'ADD_WORKOUT':
            return {
                workouts: [...state.workouts, action.payload]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
            }
        case 'UPDATE_WORKOUT' :
            return {
                workouts: state.workouts.map((w) => {
                    if(w._id === action.payload._id){ 
                        return action.payload}
                    return w
                })
            }
        default:
            return state
    }
}

const WorkoutsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(WorkoutsReducer, {
        workouts: null
    })
    const [theme, setTheme] = useState(true)
    return ( 
        <WorkoutsContext.Provider value={{...state, dispatch, theme, setTheme}}>
            {children}
        </WorkoutsContext.Provider>
     );
}

export default WorkoutsContextProvider
