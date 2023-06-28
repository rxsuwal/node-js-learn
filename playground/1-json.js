const fs = require('fs')

const dataBuffer = fs.readFileSync('1-json.json')

const dataString = dataBuffer.toString()

const dataObj = JSON.parse(dataString)

dataObj.name = "RANJAN"
dataObj.planet = "Not from Earth"
dataObj.age = "near 28"

fs.writeFileSync('1-json.json', JSON.stringify(dataObj))