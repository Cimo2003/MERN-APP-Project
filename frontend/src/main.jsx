import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import WorkoutsContextProvider from './Context/Context.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
    
    
  </React.StrictMode>
)
