const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/task', auth, async (req, res) => {

    // const task = new Task(req.body,)
    const task = new Task({ ...req.body, owner: req.user._id })

    try {

        await task.save()
        res.status(201).send(task)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        console.log(parts)
        sort[parts[0]] = parts[1] == 'desc' ? -1 : 1
    }

    console.log(sort)

    try {
        // const tasks = await Task.find({owner: req.user._id })
        // const tasks = await Task.find({ owner: req.user._id })
        // await req.user.populate('tasks').execPopulate()
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     // createdAt: -1,
                //     completed:1
                // }
            }
        })
        res.send(req.user.tasks)
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

router.get('/task/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error);
    }

})
router.patch('/task/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['completed', 'description']
    const isValidOperation = updates.every(u => allowedUpdates.includes(u))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid update operation' })
    }

    try {

        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send("task not found")
        }

        updates.forEach(update => task[update] = req.body[update])

        task.save()

        res.send(task)
    } catch (error) {
        res.status(400).send(error);
    }

})
router.delete('/task/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send("task not found")
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error);
    }

})

module.exports = router