import { useContext, useEffect, useState} from "react"
import CreateWorkout from "../Components/CreateWorkout"
import WorkoutDetails from "../Components/WorkoutDetails"
import { WorkoutsContext } from "../Context/Context"
import { AuthContext } from "../Context/AuthContext"

const Home = () => {
    const { user } = useContext(AuthContext)
    const {workouts, dispatch, theme} = useContext(WorkoutsContext)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        const fetchWorkouts = async () =>{
            if(!user){
                setIsLoading(false)
                setError('Authorization required')
                return
            }
            try {
                const response = await fetch('http://localhost:4000/api/workouts',{
                    headers: {'Authorization' : `Bearer ${user.token}` }
                })

                const json = await response.json()
                if(!response.ok){
                    setIsLoading(false)
                    throw Error(json.error)
                }
                if(response.ok){
                    setIsLoading(false)
                    setError(null)
                    dispatch({
                        type: 'SET_WORKOUTS',
                        payload: json
                    })
                    
                }
            } 
            catch (error) {

                setIsLoading(false)
                setError(error.message)
                
            }
            
        }
        fetchWorkouts()
    },[dispatch, user])

    return ( 
        <>
        <div className="workoutList">
            {isLoading && <p style={{textAlign: 'center'}}>Loading...</p>}
            {error && <div style={{textAlign: 'center'}}>{error}</div>}
            {workouts && 
                (workouts.length == 0 ?
                    <div style={{textAlign: 'center'}}>there's no workouts, add a new one!</div> 
                :
                    workouts.map((workout)=>(
                        <div className={`workoutContainer ${theme ? 'light' : ''}`} key={workout._id}>
                            <WorkoutDetails workout={workout}/>
                        </div>
                    ))
                )
            }
        </div>
        <div className="workoutForm">
            <CreateWorkout/>
        </div>
        </>
     );
}
 
export default Home;