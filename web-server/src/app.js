const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()


const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// SERVE STATIC HTML
const publicPathDirectory = path.join(__dirname, '../public')

app.use(express.static(publicPathDirectory))


// HANDLE BARS HTML TEMPLATE


app.get('', (req, res) => {
    res.render('index', { title: 'TITLE FOR HBS' })
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'about' })
})
app.get('/help', (req, res) => {
    res.render('help', { title: 'help' })
})


app.get('/help/*', (req, res) => {
    res.render('404', { msg: 'help data not found' })
})
app.get('*', (req, res) => {
    res.render('404', { msg: 'page not found' })
})

// // BASIC ROUTE SERVICE 
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