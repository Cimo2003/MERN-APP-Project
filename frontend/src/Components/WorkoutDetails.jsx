import { useContext, useState } from "react"
import { WorkoutsContext } from "../Context/Context"
import { formatDistanceToNow } from "date-fns"
import { AuthContext } from "../Context/AuthContext"

const WorkoutDetails = ({workout}) => {
    const {dispatch, workouts} = useContext(WorkoutsContext)
    const {user} = useContext(AuthContext)
    const [modify, setModify] = useState(false)
    const [title, setTitle] = useState(workout.title)
    const [load, setLoad] = useState(workout.load)
    const [reps, setReps] = useState(workout.reps)

    const handleDelete = async () =>{
        if(!user) {
            return
        }
        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id,{
            method: 'DELETE',
            headers: {'Authorization' : `Bearer ${user.token}` }
        })
        const json = await response.json()
        if(response.ok){
            console.log("Workout deleted")
            dispatch({
                type: 'DELETE_WORKOUT',
                payload: json
            })
        }
    }

    const handleUpdate = async () =>{
        if(!user) {
            return
        }
        const new_workout ={title, load, reps}
        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(new_workout)
        })
        const json = await response.json()
        console.log(json)
        if(response.ok){
            const json = await response.json()
            dispatch({
                type: 'UPDATE_WORKOUT',
                payload: json
            })
            setModify(false)
        }
    }


    return ( 
        <div className='workoutContent'>
            <h2>{modify ? <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} /> : workout.title}</h2>
            <p><strong>load (kg):</strong> {modify ? <input type="number" onChange={(e) => setLoad(e.target.value)} value={load} /> : workout.load}</p>
            <p><strong>reps: </strong>{modify ? <input type="number" onChange={(e) => setReps(e.target.value)} value={reps} /> : workout.reps}</p>
            <br />
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
               <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})} </p>
               <div>
                {modify && <span onClick={handleUpdate} class="material-symbols-outlined">check</span>}
                <span onClick={()=>setModify(!modify)} class="material-symbols-outlined">{modify ? 'edit_off' : 'edit'}</span>
                <span onClick={handleDelete} class="material-symbols-outlined">delete</span>
               </div>
               
            </div>    
        </div>
    )
}
 
export default WorkoutDetails;
