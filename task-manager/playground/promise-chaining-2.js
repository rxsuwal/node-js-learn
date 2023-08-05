require('../src/db/mongoose')

const task = require('../src/models/task')

task.findByIdAndDelete('64ce6cedd054d457d3860b98').then(res => {
    if (!res) {
        return "can't find task"
    }
    console.log(res)
    return task.countDocuments({ completed: false })
}).then(r => {
    console.log(r)
})
    .catch(err => {
        console.log(err)
    })