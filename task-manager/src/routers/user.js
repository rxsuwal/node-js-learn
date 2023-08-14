const express = require('express')
const User = require('../models/user')
const router = new express.Router()

const authMiddleware = require('../middleware/auth')


router.post('/user', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user: user, token: token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})
router.post('/user/logout', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((t) => {
            return t.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})
router.post('/user/logoutall', authMiddleware, async (req, res) => {
    try {
        req.user.tokens = []

        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

// router.get('/users', authMiddleware, async (req, res) => {
//     console.log('first')

//     try {
//         const users = await User.find({})

//         res.status(200).send(users)
//     } catch (e) {
//         res.status(500).send(e);
//     }

//     // User.find({}).then(rspnse => {
//     //     res.send(rspnse)
//     // }).catch(err => {
//     //     res.status(500).send(err);
//     // })
// })

router.get('/user/me', authMiddleware, async (req, res) => {
    res.send(req.user)
})

const multer = require('multer')
const upload = multer({
    dest: './avatar'
})
router.post('/user/me/avatar', upload.single('upload'), async (req, res) => {
    res.send()
})

router.patch('/user/me',authMiddleware, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['password', 'name']
    const isValidUpdate = updates.every(u => allowedUpdates.includes(u))

    if (!isValidUpdate) {
        return res.status(400).send({ error: "Invalid update" })
    }

    try {
        const user = req.user

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
router.delete('/user/me',authMiddleware, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id);
        // if (!user) {
        //     return res.status(404).send("User not found")
        // }

        await req.user.deleteOne()

        res.send(req.user)

    } catch (e) {
        console.log(JSON.stringify(e))
        res.status(400).send(e);
    }

})

module.exports = router