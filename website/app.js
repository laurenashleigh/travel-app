/* Global Variables */
const apiKey = '&appid=e417b88cc12c7202f273a0b0af0e5ed7&units=metric';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
let newDate = d.getDate()+' '+ month[d.getMonth()] + ' ' + d.getFullYear();

//Async GET request API data
const getZipCode = async (baseUrl, zipCode, apiKey) => {
    const response = await fetch(baseUrl+zipCode+apiKey)
    try {
        const newData = await response.json();
        console.log('data', newData)
        return newData;
    } catch(error) {
        console.log('error'. error);
    }
}

//Event listener to get weather data then post data to app then update the UI
const postToApp = (e) => {
    console.log('button clicked');
    let newZipCode = document.getElementById('zip').value;
    let newUserResponse = document.getElementById('feelings').value;
    let newUserName = document.getElementById('name').value;
    getZipCode(baseUrl, newZipCode, apiKey)
    .then((data) => {
        console.log(newUserName);
        postData(`/add`, {weather: data.weather[0].description, temperature: data.main.temp, date: newDate, userResponse: newUserResponse, userName: newUserName})
    })
    .then(() => {
        updateUI();
    })
}

document.getElementById('generate').addEventListener('click', postToApp)

//Event listener to validate zip code entry meets criteria
const validateZipcode = () => {
    if(document.getElementById('zip').value.length !== 5) {
        alert('Please enter 5-digit zipcode')
    };
    var letters = /^[A-Za-z]+$/;
    if(document.getElementById('zip').value.match(letters)) {
        alert('US zip codes only! (no letters allowed)')
    }
}
document.getElementById('generate').addEventListener('mouseover', validateZipcode)

//Async POST API data and user's data to app
const postData = async (url = '', data = {}) => {
    const request = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    try {
        const newData = await request.json();
        return newData;
    } catch(error) {
        console.log('error', error)
    }
}

//Update the UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log('all data', allData);
        document.getElementById('weather').innerHTML = `It was ${allData.temperature} degrees and ${allData.weather}`;
        document.getElementById('date').innerHTML = `On ${allData.date}`;
        document.getElementById('content').innerHTML = `${allData.userName} was feeling ${allData.userResponse}`;
    } catch(error) {
        console.log('error', error)
    }
}

