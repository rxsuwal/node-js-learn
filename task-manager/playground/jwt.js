const jwt = require('jsonwebtoken')

const myFunction = ()=>{
    const token = jwt.sign({_id:"eofvjf"},"task-manager-api",{expiresIn:"7 days"})
    console.log(token)

    const verify = jwt.verify(token,"task-manager-api")

    console.log(verify)
}


myFunction()