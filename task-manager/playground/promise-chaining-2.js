require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('64ce6cedd054d457d3860b98').then(res => {
//     if (!res) {
//         return "can't find task"
//     }
//     console.log(res)
//     return Task.countDocuments({ completed: false })
// }).then(r => {
//     console.log(r)
// })
//     .catch(err => {
//         console.log(err)
//     })


const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })

    return { task, count }
}


deleteTaskAndCount("64ce6cddd054d457d3860b96").then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})