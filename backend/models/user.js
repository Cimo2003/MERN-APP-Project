const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
}, {timestamps: true})

userSchema.statics.signup = async function (username, email, password)  {

    if(!email || !password || !username) throw Error('All fields must be filled')
    if(!validator.isEmail(email)) throw Error('email is invalid')
    if(!validator.isStrongPassword(password)) throw Error('Password is weak')

    const exists = await this.findOne({email})
    if(exists){
        throw Error('email already used')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({username, email, password: hash})

    return user
}

userSchema.statics.signin = async function (email, password) {
    
    if(!email || !password) throw Error('All fields must be filled')
    const user = await this.findOne({email})
    if(!user) throw Error('email is incorrect')
    const exists = await bcrypt.compare(password, user.password)
    if(!exists) throw Error('password is incorrect')
    
    return user
}

module.exports = mongoose.model('User', userSchema)
