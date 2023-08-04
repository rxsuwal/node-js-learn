const mongoose = require('mongoose')
const validater = require('validator')

const User = mongoose.model('User',
    {
        name: {
            type: String,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validater.isEmail(value)) {
                    throw new Error('invalid email')
                }
            }
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            trim: true,
            validate(v) {
                if (v.toLowerCase().includes('password')) {
                    throw new Error('password in password is not allowed!')
                }
            }
        }
    })

module.exports = User
