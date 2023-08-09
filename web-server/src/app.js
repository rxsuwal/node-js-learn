const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const getWeather = require('./utils/getWeather')

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

app.get('/weather', (req, res) => {
    if (req.query.address) {

        const data = geoCode(req.query.address, (err, response) => {
            if (err) {
                return res.send(err)
            } else {

                console.log(`Getting weather for ${response.location}`)

                getWeather(`${response.lat},${response.long}`, (errr, rspnse) => {
                    if (err) {
                        return res.send(errr)
                    }
                    else {
                        return res.send({ forecast: rspnse, location: response.location, address: req.query.address })
                    }
                })


            }
        })
    } else {
        res.send({ error: "no address provided" })
    }


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
    console.log('starting at port http://localhost:3000')
})