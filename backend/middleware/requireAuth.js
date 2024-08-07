const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requireAuth = async (req, res, next) => {
    try {
        const {authorization} = req.headers
        if(!authorization) throw Error('Authorization is required')

        const token = authorization.split(' ')[1]

        try {
            const {_id} = jwt.verify(token, process.env.SECRET)
            req.user = await User.findOne({_id}).select('_id')
            next()
        } catch (error) {
        res.status(401).json({error: 'token is invalid'})
        }
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = requireAuth