const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/task', async (req, res) => {

    const task = new Task(req.body)

    try {

        await task.save()
        res.status(201).send(task)

    } catch (error) {
        res.status(400).send(error)
    }

    // task.save().then(respnse => {
    //     res.status(201).send(task)
    // }).catch(err => {
    //     res.status(400).send(err)
    // })
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(error);
    }
    // Task.find({}).then(rspnse => {
    //     res.send(rspnse)
    // }).catch(err => {
    //     res.status(500).send(err);
    // })
})

router.get('/task/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error);
    }
    // Task.findById(_id).then(rspnse => {

    //     if (!rspnse) {
    //         return res.status(404).send("task not found")
    //     }
    //     res.send(rspnse)
    // }).catch(err => {
    //     res.status(400).send(err);
    // })

})
router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed']
    const isValidOperation = updates.every(u => allowedUpdates.includes(u))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update operation' })
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error);
    }

})
router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error);
    }

})

module.exports = router