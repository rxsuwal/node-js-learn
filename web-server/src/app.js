const express = require('express')
const path = require('path')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

const publicPathDirectory = path.join(__dirname, '../public')

app.use(express.static(publicPathDirectory))

// const aboutPath = path.join(__dirname, '../public/about.html')

// app.use('/about',express.static(aboutPath))

// const helpPath = path.join(__dirname, '../public/help.html')

// app.use('/help',express.static(helpPath))

// app.get('', (req, res) => {
//     res.send("hello express")
// })
// app.get('/about', (req, res) => {
//     res.send("<h1>About</h1>")
// })
// app.get('/weather', (req, res) => {
//     res.send({ forecast: "its fuckty", location: "san francisco" })
// })



app.listen(3000, () => {
    console.log('starting at port 3000')
})