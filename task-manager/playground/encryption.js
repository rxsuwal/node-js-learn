var bcrypt = require('bcryptjs');

const encryptDecrypt = async () => {
    const password = 'FUCK YO'

    const hash = await bcrypt.hash(password, 10)

    console.log(hash)

    const isMatch = await bcrypt.compare('password', hash)
    console.log(isMatch)
    // console.log(bcrypt.compare('password', hash)
    // .then(res=>console.log(res)))


}

encryptDecrypt()