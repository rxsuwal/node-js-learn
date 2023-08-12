const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next)=>{
//     console.log(req.method,req.path)
//     res.status(503).send("server under maintenance")
// })

app.use(express.json())

// USER
const userRouter = require('./routers/user')
app.use(userRouter)

// TASKS
const taskRouter = require('./routers/task')
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server stared at " + `http://localhost:${port}`)
})


