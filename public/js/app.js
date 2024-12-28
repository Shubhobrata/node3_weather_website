console.log('Client side javascript file is loaded!');

/*
fetch("http://localhost:3000/weather?address=Mexico").then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error);
        }else{
            console.log(data.location);
            console.log(data.forecast.temperature);
        }
    });
}).catch((error) => {
    console.log(error);
});*/

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector('input').value;
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error);
            }else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast.temperature
                // console.log(data.location);
                // console.log(data.forecast.temperature);
            }
        });
    }).catch((error) => {
        console.log(error);
    });
});