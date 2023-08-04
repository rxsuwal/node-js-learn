const express = require('express')
const User = require('./models/user')
const Task = require('./models/task')
require('./db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.get('/'), (req, res) => {
    res.send("Server up and running")
}

// USER
app.post('/user', (req, res) => {

    const user = new User(req.body)

    user.save().then(respnse => {
        res.status(201).send(user)
    }).catch(err => {
        res.status(400).send(err)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then(rspnse => {
        res.send(rspnse)
    }).catch(err => {
        res.status(500).send(err);
    })
})

app.get('/user/:id', (req, res) => {
    const _id = req.params.id.toString()
    User.findById(_id).then(rspnse => {

        if (!rspnse) {
            return res.status(404).send("User not found")
        }
        res.send(rspnse)
    }).catch(err => {
        res.status(400).send(err);
    })

})

// TASKS
app.post('/task', (req, res) => {

    const task = new Task(req.body)

    task.save().then(respnse => {
        res.status(201).send(task)
    }).catch(err => {
        res.status(400).send(err)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(rspnse => {
        res.send(rspnse)
    }).catch(err => {
        res.status(500).send(err);
    })
})

app.get('/task/:id', (req, res) => {
    const _id = req.params.id
    Task.findById(_id).then(rspnse => {

        if (!rspnse) {
            return res.status(404).send("task not found")
        }
        res.send(rspnse)
    }).catch(err => {
        res.status(400).send(err);
    })

})

app.listen(port, () => {
    console.log("Server stared at " + `http://localhost:${port}`)
})