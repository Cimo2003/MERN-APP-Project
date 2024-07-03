import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import '../sign.css'
import { WorkoutsContext } from '../Context/Context'
import { AuthContext } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'


const SignIn = () => {
    const navigate = useNavigate()
    const [visibility, setVisibility] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {email, password}
        const response = await fetch('http://localhost:4000/api/user/login', {
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

    const {theme} = useContext(WorkoutsContext)
    const {dispatch} = useContext(AuthContext)

    return ( 
        <div className="sign">
            <form onSubmit={handleSubmit} className={theme ? 'light' : ''}>
            <h2>Login</h2>
            <div className="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="text" required/>
                <label htmlFor=""> Email</label>
            </div>
            <div className="inputbox">
                <span onClick={()=>setVisibility(!visibility)} class="material-symbols-outlined">
                   {visibility? 'visibility' : 'visibility_off'}
                </span>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type={visibility? 'text' : 'password'} required/>
                <label htmlFor=""> Password</label>
            </div>
            <div className="forgot">        
                <input type="checkbox" />
                <label>remember me</label>
                <a href="#" >forgot password</a> 
            </div>
            <button className="btn" type="submit">Log in</button>
            <div className="agree">         
                <p>don't have an account? <Link to='/signup' >Register</Link></p> 
            </div>
            </form>  
            {error && <div className='err'>{error}</div>}    
        </div>
     )
}
 
export default SignIn;