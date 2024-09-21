import { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { WorkoutsContext } from '../Context/Context'
import { AuthContext } from '../Context/AuthContext'

const NavBar = () => {

    const handleClick = () => {
        localStorage.removeItem('user')
        dispatch({
            type: 'SIGNOUT'
        })
        workoutDispatch({
            type: 'SET_WORKOUTS',
            payload: null
        })
    }

    const {user, dispatch} = useContext(AuthContext)
    const {theme, setTheme, dispatch: workoutDispatch} = useContext(WorkoutsContext)
    const [isToggled, setIsToggled] = useState(false)
    const handleChange = () =>{
        setIsToggled(!isToggled)
        setTheme(!theme)
    }
    return ( 
        <nav className={`navbar ${theme ? 'light' : ''}`}>
            <div className="logo">
                <Link to='/' className={theme ? 'light' : ''}>
                <h1>Workout</h1>
                <h1 id='ex'>!</h1>
                </Link>
            </div>
            <div className="links">
                {user?
                 <>
                  <p>{user.email}</p>
                  <button onClick={handleClick}>Logout</button> 
                 </>
                 :
                 <>
                  <Link to='/signin' className={theme ? 'light' : ''}>Login</Link>
                  <Link to='/signup' className='signup' >Signup</Link>
                 </>
                }
                
                <div id='toggle' className={theme ? 'light' : ''}>
                    <i onClick={handleChange} className={`indicator ${isToggled ? '' : 'active'}`} ></i>
                </div>
            </div>
            
        </nav>
            
     );
}
 
export default NavBar;