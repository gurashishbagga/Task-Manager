const mongoose = require('mongoose')


const Task = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        default: false,
        type: Boolean,
    },
})


module.exports = Task