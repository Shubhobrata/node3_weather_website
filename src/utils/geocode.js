const request = require('request');
const mapboxApiKey = "pk.eyJ1Ijoic2h1YmhvMTk4NSIsImEiOiJjbHV5Nmg5OXowdzdiMmpyemN2bTVtdXR3In0.__SzGE2cSzYmEu4fqGQRvw";
const mapboxUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1Ijoic2h1YmhvMTk4NSIsImEiOiJjbHV5Nmg5OXowdzdiMmpyemN2bTVtdXR3In0.__SzGE2cSzYmEu4fqGQRvw&limit=1`;

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(address)}&access_token=${mapboxApiKey}&limit=1`;
    request({url:url, json:true}, (error, response) => {
        if(error){
            callback("Unable to connect to location services", undefined);
        }else if(response.body.features.length === 0){
            callback("Unable to find location. Try another search.", undefined);
        }else{
            const data = response.body.features[0].properties.coordinates;
            callback(undefined, {
                latitude: data.latitude,
                longitude: data.longitude,
                location: response.body.features[0].properties.name
            });
        }
    });
}

module.exports = geocode;