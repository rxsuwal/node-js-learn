const mongoose = require('mongoose')
const validater = require('validator')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');


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

    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})



userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'task-manager-api')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token

}
userSchema.methods.toJSON = function () {
    const user = this
    const userData = user.toObject()
    delete userData.password
    delete userData.tokens

    return userData

}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

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

// DELETING CONTENT ON USER DELETE
userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany(this.user._id)
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User
