import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Home from './Pages/Home'
import { useContext } from 'react'
import { WorkoutsContext } from './Context/Context'
import Signup from './Pages/Signup.jsx'
import Signin from './Pages/Signin.jsx'
import { AuthContext } from './Context/AuthContext.jsx'

function App() {
  const {theme} = useContext(WorkoutsContext)
  const {user} = useContext(AuthContext)

  return (
    <BrowserRouter>
    <NavBar/>
    <div className={`container ${theme ? 'light' : ''}`}>
      <Routes>
        <Route path='/' element={user ? <Home/> : <Navigate to='/signin'/>}/>
        <Route path='/signin' element={user ? <Navigate to='/'/> : <Signin/>}/>
        <Route path='/signup' element={user ? <Navigate to='/'/> : <Signup/>}/>
      </Routes>
    </div>
    
    </BrowserRouter>
  )
}

export default App;
