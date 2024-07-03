const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id: id}, process.env.SECRET, {expiresIn: '2d'})
}

//sign in
route.post('/login', async (req, res) => {
    const {email, password} = await req.body
    try {
        const user = await User.signin(email, password)
        const username = user.username
        //create a token
        const token = createToken(user._id)

        res.status(200).json({username, email, token})
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }
})

// sign up
route.post('/signup', async (req, res) => {
    const {username, email, password} = await req.body

    try {
        const user = await User.signup(username, email, password)
        //create a token
        const token = await createToken(user._id)
        res.status(200).json({username, email, token})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = route