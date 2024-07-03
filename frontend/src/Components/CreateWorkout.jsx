import { useContext, useState } from "react"
import { WorkoutsContext } from "../Context/Context"
import { AuthContext } from "../Context/AuthContext"

const CreateWorkout = () => {
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('0')
    const [reps, setReps] = useState('0')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {dispatch, theme} = useContext(WorkoutsContext)
    const {user} = useContext(AuthContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!user){
            setError('You need to be logged in')
            return
        }
        const workout ={title, load, reps}
        const response = await fetch('http://localhost:4000/api/workouts', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization' : `Bearer ${user.token}`
            },
            body: JSON.stringify(workout)
         })
         const json = await response.json()
         if(!response.ok){
           setError(json.error)
           setEmptyFields(json.emptyFields)

         }
         if(response.ok){
            setError(null);
            setEmptyFields([]);
            setTitle('');
            setLoad('0');
            setReps('0');
            console.log('new workout added', json);
            dispatch({
                type: 'ADD_WORKOUT',
                payload: json
            })
         }
    }
    return ( 
        <div className="formContainer">
        <form className={theme ? 'light' : ''} action="" method="post" onSubmit={handleSubmit}>
            <h2>Add a new exercice</h2><br />
            <label htmlFor="title">Exercice name:</label>
            <input type="text" onChange={(e)=> setTitle(e.target.value)} value={title} className={emptyFields.includes('title') ? 'error' : ''}/>
            <label htmlFor="load">Load (kg):</label>
            <input type="number" onChange={(e)=> setLoad(e.target.value)} value={load} className={emptyFields.includes('load') ? 'error' : ''}/>
            <label htmlFor="reps">Reps:</label>
            <input type="number" onChange={(e)=> setReps(e.target.value)} value={reps} className={emptyFields.includes('reps') ? 'error' : ''}/>
            <br />
            <button type="submit">ADD</button>
        </form>
        {error && <div className="err">{error}</div>}
        </div>
        
     )
}
 
export default CreateWorkout;