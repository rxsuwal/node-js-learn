const getWeather = require('./utils/getWeather.js')
const geoCode = require('./utils/geocode.js')

const address = process.argv[2]

if (!address) {
        console.log('no address provided')
} else {

        geoCode(address, (error, { lat, long, location }={}) => {
                if (error) {
                        return console.log('EROR', error)
                } else {

                        console.log('FORECASTING FOR..... ' + location)

                        getWeather(`${lat},${long}`, (error, data) => {

                                if (error) {
                                        return console.log(error)
                                } else {

                                        console.log(data)
                                }
                        })
                }
        })
}

