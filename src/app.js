const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Weather App',
        name: 'Author Andrew'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Weather App',
        name: 'Help Created by Andrew Mead'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location}) => {
        //console.log("Location : " + location);
        //console.log("Data : " + data);    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                console.log(error);
            }
            console.log(forecastData.temperature);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help article not found'
    });
});

app.get("*", (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found'
    });
});

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});

app.get('/help', (req, res) => {
    res.send('[{name: "Andrew", age: 27}, {name: "Sarah", age: 25}]');
});

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>');
});

app.get('/weather', (req, res) => {
    res.send({forecast: 'It is snowing', location: 'Philadelphia'});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});