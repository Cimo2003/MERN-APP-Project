require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/users')

const app = express()
app.use(cors())
//middleware to send json body with a request
app.use(express.json())

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to database and create the server
mongoose.connect(process.env.URI)
  .then(()=>{
    app.listen(process.env.PORT, () =>{
    console.log('Connected to the Database and Listening on port', process.env.PORT)
})
  })
  .catch((error)=>console.log(error))