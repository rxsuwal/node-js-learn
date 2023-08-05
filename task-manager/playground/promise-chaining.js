require('../src/db/mongoose')

const user = require('../src/models/user')

user.findByIdAndUpdate('64cd25ac549937b0c057f548', { password: "muji randiko ban" }).then(res => {
    console.log(res)

    return user.countDocuments()
}).then(r => {
    console.log(r)
})
    .catch(err => {
        console.log(err)
    })