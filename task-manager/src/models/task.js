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
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

// taskSchema.methods.toJSON = function () {
//     const task = this
//     const taskData = task.toObject()
//     delete taskData.owner

//     return taskData

// }

const Task = mongoose.model('Task',taskSchema)

module.exports = Task
