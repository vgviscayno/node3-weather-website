const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8e09a48a4b40c806ed7671ef4ff0a8ee&query='+ latitude +',' + longitude +'&units=f'

    request({url, json: true}, (error, {body}) => {
            if (error){
                callback('Unable to connect to weather service', undefined)
            } else if (body.error) {
                callback(response.body.error.info, undefined)
            } else {
                callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees.')
            }
        })

}

module.exports = forecast