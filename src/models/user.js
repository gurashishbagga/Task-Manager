const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim : true,
    },
    age: {
        type: Number,
        validate(value){
            if(value<=0){
                throw new Error('Please enter a positive age')
            }
        }
    },
    email: {
        unique: true,
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid Email')
            }
        }
    },
    password: {
        trim: true,
        type: String,
        required: true,
        minlength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain the string "password"')
            }
        }
    },
    tokens:[{
        token: {
            type: String,
            required: true
        },
    }],
})

userSchema.methods.createAuthToken = async function(){
    const user = this
    const token = await jwt.sign({id: user._id.toString()}, 'thisisnodecourse')
    user.tokens.push({token})
    await user.save()
}


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User