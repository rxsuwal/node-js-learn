require('../src/db/mongoose')

const user = require('../src/models/user')

// user.findByIdAndUpdate('64cd25ac549937b0c057f548', { password: "muji randiko ban" }).then(res => {
//     console.log(res)

//     return user.countDocuments()
// }).then(r => {
//     console.log(r)
// })
//     .catch(err => {
//         console.log(err)
//     })

const updatePassword = async (id, password) => {
    const userr = await user.findByIdAndUpdate(id, { password: password })
    const count = await user.countDocuments()
    return count
}

updatePassword('64c610de95127b69f38abe1e', "muji randiko ban").then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})