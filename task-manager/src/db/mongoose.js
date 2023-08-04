const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const validater = require('validator')

// const User = mongoose.model('User',
//     {
//         name: {
//             type: String,
//             trim: true,
//             lowercase: true
//         },
//         email: {
//             type: String,
//             required: true,
//             trim: true,
//             lowercase: true,
//             validate(value) {
//                 if (!validater.isEmail(value)) {
//                     throw new Error('invalid email')
//                 }
//             }
//         },
//         password: {
//             type: String,
//             required: true,
//             minLength: 6,
//             trim: true,
//             validate(v) {
//                 if (v.toLowerCase().includes('password')) {
//                     throw new Error('password in password is not allowed!')
//                 }
//             }
//         }
//     })

// const me = new User({
//     name: 'Kaal FIFNNFNF     ',
//     email: "    mail@MAIL.i",
//     password: 'Phassword'
// });


// me.save().then((res) => console.log(res))
//     .catch(err => {
//         console.log(err)
//     });




// const Task = mongoose.model('Task',
//     {
//         description: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         completed: {
//             type: Boolean,
//             default: false
//         }
//     })


// const task = new Task({
//     description: "fuck you ",
// })
// task.save().then((res) => console.log(res))
//     .catch(err => {
//         console.log(err)
//     });