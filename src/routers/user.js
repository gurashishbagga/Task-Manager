const express = require('express')
const router = new express.Router()
const User = require('../models/user.js')
const auth = require('../middleware/auth.js')
//const bcrypt = require('bcryptjs')

router.use(express.json())


router.get('/users/me',auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', async (req, res) => {
    const id = req.params.id
    try{
        const user = await User.findById(id)
        res.send(user)
    }catch(err){
        res.status(500).send(err)
    }
})

router.post('/users',async (req,res) => {
    const user = new User(req.body)
    try{
        await user.createAuthToken()
        res.status(201).send(user)
    }catch(err){
        res.status(400).send(err)
    }
    //res.send('testing!')
})

router.patch('/users/:id',async (req, res) => {
    const allowedUpdates = ['name','age','email','password']
    const providedUpdates = Object.keys(req.body)
    const isValidOperation = providedUpdates.every((providedUpdate) => allowedUpdates.includes(providedUpdate))
    if(!isValidOperation){
        return res.send({error: 'Inavlid Updates!'})
    }
    try{
        const user = await User.findByIdAndUpdate(req.params.id)
        if(!user){
            return res.status(404).send({error: 'User not found'})
        }
        providedUpdates.forEach((providedUpdate) => user[providedUpdate] = req.body[providedUpdate])
        await user.save()
        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
})

router.delete('/users/:id',async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send({error: 'user not found'})
        }
        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        await user.createAuthToken()
        res.send(user)
    }catch(err){
        res.status(400).send()
    }
})

module.exports = router