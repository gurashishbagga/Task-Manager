const express = require('express')
const Task = require('../models/task.js')
const router = new express.Router()
const bcrypt = require('bcryptjs')

router.use(express.json())

router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find()
        res.send(tasks)
    }catch(err){
        res.status(500).send(err)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id
    try{
        const task = await Task.findById(id) 
        res.send(task)
    }catch(err){
        res.status(500).send(err)
    }
})


router.post('/tasks',async (req, res) => {
    const task = new Task(req.body)
    try{
        await task.save()
        res.status(201).send(task)
    }catch(err){
        res.status(400).send(err)
    }
})


router.patch('/tasks/:id',async (req, res) => {
    const allowedUpdates = ['description','completed']
    const providedUpdates = Object.keys(req.body)
    const isValidOperation = providedUpdates.every((providedUpdate) => allowedUpdates.includes(providedUpdate))
    if(!isValidOperation){
        return res.send({error: 'Inavlid Updates!'})
    }
    try{
        const user = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(!user){
            return res.status(404).send({error: 'Task not found'})
        }
        res.send(user)
    }catch(err){
        res.status(400).send(err)
    }
})


router.delete('/tasks/:id',async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send({error: 'user not found'})
        }
        res.send(task)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router