const express = require('express')
const User = require('../models/user')
const router = new express.Router()


router.post('/user', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})

        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e);
    }

    // User.find({}).then(rspnse => {
    //     res.send(rspnse)
    // }).catch(err => {
    //     res.status(500).send(err);
    // })
})

router.get('/user/:id', async (req, res) => {
    const _id = req.params.id.toString()

    try {
        const user = await User.findOne({ "_id": _id });
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e);
    }
    // User.findById(_id).then(rspnse => {

    //     if (!rspnse) {
    //         return res.status(404).send("User not found")
    //     }
    //     res.send(rspnse)
    // }).catch(err => {
    //     res.status(400).send(err);
    // })

})
router.patch('/user/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password', 'name']
    const isValidUpdate = updates.every(u => allowedUpdates.includes(u))

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid update" })
    }

    try {
        const user = await User.findById(req.params.id)

        updates.forEach(update => user[update] = req.body[update])

        user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e);
    }

})
router.delete('/user/:id', async (req, res) => {

    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).send("User not found")
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e);
    }

})

module.exports = router