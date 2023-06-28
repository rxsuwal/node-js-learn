const request = require('request')

const geoCode = (address, callback) => {
    const mapbox_access_token = 'pk.eyJ1Ijoia2FhbHh2YWlyYWIiLCJhIjoiY2xqYXpoaHFvMTl5NjNxbXU5MGo1ajR6dCJ9.mo54kRCSYCHlQrsZDXX5qA'
    const mapbox_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places'

    request({ url: `${mapbox_url}/${encodeURIComponent(address)}.json?access_token=${mapbox_access_token}`, json: true }, function (error, response, { features }={}) {
        if (error) {
            callback('unable to connect to mapbox', undefined)
        } else if (features.length == 0) {
            callback('unable to find locarion', undefined)
        } else {
            callback(undefined, {
                lat: features[0].center[0],
                long: features[0].center[1],
                location: features[0].place_name,
            })

        }
    })
}

module.exports = geoCode