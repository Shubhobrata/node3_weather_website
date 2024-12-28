const request = require('request');
const apiKey = "5e7d32182a6fecd584f9a6da0c08f406";
const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=37.8267,-122.4233`;

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${latitude},${longitude}`;
    request({url:url, json:true}, (error, response) => {
        if(error){
            callback("Unable to connect to weather service", undefined);
        }else if(response.body.error){
            callback("Unable to find location", undefined);
        }else{
            const data = response.body.current;
            callback(undefined, {
                temperature: data.temperature,
                feelslike: data.feelslike
            });
        }
    });
}

module.exports = forecast;