const path = require('path');
const express = require('express');
const hbs = require('hbs');

const {geocoding, forecast} =  require('./weather-app-modules/geocoding');

const server1 = express();
const port  =  process.env.PORT || 8080;

server1.use(express.static(path.join(__dirname, '../public')));
server1.set('view engine', 'hbs');

server1.set('views', path.join(__dirname, '/templates/views'));
hbs.registerPartials(path.join(__dirname, '/templates/partials') );

server1.get('/', (req, res) => {
    res.render('index');
})

server1.get('/weather', (req, res) => {
    res.render('index');
})
server1.get('/weather/:place', (req, res) => {
    
    let place = req.params.place;

    geocoding(place, (error, geocodingdata) => {
        if(error){
            return res.status(500).send({message: 'some error ocurred'});
        }
        forecast(geocodingdata.latitude, geocodingdata.longitude, (error, forecastdata) => {
            if(error){
                return res.status(500).send({error: 'something went wrong'});
            }
            const temp = `Temperature = ${forecastdata.body.current.temperature} F and there is ${forecastdata.body.current.cloudcover} % chance of rain.`;
            
            res.status(200).send({
                    realforecastdata: forecastdata.body,
                    place: geocodingdata.place_name
                });
        })
    })
})

server1.get('/scrollbar' , (req, res) => {
    res.render('scrollbar');
})

server1.listen(port, () =>{
    console.log('Server is up at port:' + port);
})