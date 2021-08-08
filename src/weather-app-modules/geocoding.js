const request = require('postman-request');


const geocoding = (place, callback) => {
    const place1 = encodeURI(place);
    
    const url  = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place1}.json?access_token=pk.eyJ1IjoibXJpdHl1bmpheS1tYXBib3giLCJhIjoiY2tlM3hhMWN3MG5tbDMxcGQzZWNzaXMxYiJ9.TEfKsoMFJU61lY-u3T085Q`;

    request({url: url, json: true}, (error, response) => {
        if(error) {
            return callback('error', null);
        }
        if(response.body.features.length == 0){
            return callback('Sorry Place not recognized', null);
        }
        //console.log(response.body);
        
        const coordinates = {
            latitude: response.body.features[0].center[0],
            longitude: response.body.features[0].center[1],
            place_name: response.body.features[0].place_name
        }
        console.log(coordinates);
        
        
        callback(null, coordinates);
    })
}

const forecast = (latitude, longitude, callback) => {
    const url2 = `http://api.weatherstack.com/current?access_key=9063cf03cd0f4baf5ef40de1a44ef9a2&query=${longitude},${latitude}&units=f`;
    request({url: url2, json: true}, (error, response) => {
        if(error){
            callback(error, null);
        }
        callback(null, response);
    })
}

module.exports = {geocoding: geocoding, forecast: forecast};