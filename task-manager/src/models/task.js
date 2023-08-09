const mongoose = require('mongoose')
const validater = require('validator')

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false
    }
})



// HASHING PASSWORD
taskSchema.pre('save', async function (next) {
    
    console.log('task middleware running..')

    next()
})

const Task = mongoose.model('Task',taskSchema)

module.exports = Task
