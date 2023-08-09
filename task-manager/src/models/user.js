const mongoose = require('mongoose')
const validater = require('validator')
var bcrypt = require('bcryptjs');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
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
        },

    }
})



userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error('email doesnot exist')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('invalid password')
    }

    return user
}

// HASHING PASSWORD
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        console.log('hashing password')
        //hash the passowrd before saving it to database
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User
