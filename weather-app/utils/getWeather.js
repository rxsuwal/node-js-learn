const request = require('request')

const getWeather = (coordinate, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=4059ad8e7333e3ec758e9d4fd088c31f&query=${coordinate}&units=f`

    request({ url: url, json: true }, function (error, response, { current } = {}) {
        if (error) {
            callback('unable to connect to weatherstack.com', undefined)
        }
        else if (response.body.error) {
            callback("invalid coordinate", undefined)

        }
        else {
            callback(undefined,
                `It is currently is ${current.temperature} degrees out. But it feels like ${current.feelslike} degree`)

        }

    });
}

module.exports = getWeather