const express = require('express')
const mongoose = require('mongoose')
const Workout = require('../models/workout')
const requireAuth = require('../middleware/requireAuth')
const route = express.Router()

//require auth for all routes
route.use(requireAuth)

//send all workouts sorted by date
route.get('/',async (req, res) => {

    const userID = req.user._id
       
    const workouts = await Workout.find({userID}).sort({createdAt: -1})
    res.status(200).json(workouts)
} )

//send a specific workout
route.get('/:id', async(req, res) => {
    const {id} = req.params
    const workout = await Workout.findById(id)
    if(!workout) return res.status(404).json({error:'no such workout exists'})
    res.status(200).json(workout)
} )

//create a new workout
route.post('/', async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = [];
    if(!title) emptyFields.push('title')
    if(!load) emptyFields.push('load')
    if(!reps) emptyFields.push('reps')
    if(emptyFields.length > 0) return res.status(400).json({error:'Please fill in all the fields', emptyFields})

    try{
        const userID = req.user._id
        const workout = await Workout.create({title, load, reps, userID})
        res.status(200).json(workout)
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
} )

//delete a specific workout
route.delete('/:id', async (req, res) => {
    const {id} = req.params
    const workout = await Workout.findByIdAndDelete({_id: id})
    if(!workout) return res.status(404).json({error:'no such workout exists'})
    res.status(200).json(workout)
} )

//modify a workout
route.patch('/:id', async (req, res) => {
    const {id} = req.params
    const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body}, { new: true})
    if(!workout) return res.status(404).json({error:'no such workout exists'})
    res.status(200).json(workout)

} )

module.exports = route