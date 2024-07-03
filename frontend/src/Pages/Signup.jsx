import { useState, useContext } from 'react'
import '../sign.css'
import { Link, useNavigate } from 'react-router-dom'
import { WorkoutsContext } from '../Context/Context'
import { AuthContext } from '../Context/AuthContext'

const SignUp = () => {
    const navigate = useNavigate()
    const [visibility, setVisibility] = useState(false)
    const [error, setError] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {username, email, password}
        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(user)
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            dispatch({
                type:'SIGNIN',
                payload: json
            })
            localStorage.setItem('user', JSON.stringify(json))
            navigate('/')
        }
    }
    
    const {dispatch} = useContext(AuthContext)
    const {theme} = useContext(WorkoutsContext)

    return ( 
        <div className="sign">
            <form onSubmit={handleSubmit} className={theme ? 'light' : ''}>  
            <h2> Sign Up </h2>
            <div className="inputbox">
                <ion-icon name="person-outline"></ion-icon>
                <input value={username} onChange={(e)=> setUsername(e.target.value)} type="text"  required/>
                <label htmlFor=''>Username</label>           
            </div>
            <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" required/>
                <label htmlFor=''>Email</label>
            </div>
            <div className="inputbox">
                <span onClick={()=>setVisibility(!visibility)} class="material-symbols-outlined">
                   {visibility? 'visibility' : 'visibility_off'}
                </span>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type={visibility? 'text' : 'password'} required/>
                <label htmlFor=''>Password</label>
            </div>
            <div className="agree">
                <input type="checkbox" required/>
                <label>I agree on <a href="#">Terms and Conditions</a> </label>
            </div>
            <button className='btn' type="submit"> Register </button>
            <div className="agree">
                <p>Already have an account? <Link to='/signin'>Sign in</Link></p>
            </div>
            </form>
            {error && <div className='err'>{error}</div>}
        </div>
     )
}
 
export default SignUp;