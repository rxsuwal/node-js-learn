const http = require('node:http');
const url = `http://api.weatherstack.com/current?access_key=4059ad8e7333e3ec758e9d4fd088c31f&query=bhaktapur&units=f`

const request = http.request(url, (response) => {
    let data
    response.on("data", (d) => {
        data = d.toString()
    })

    response.on("end", () => {
        console.log(data)
    })

})

request.end()