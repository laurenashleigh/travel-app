//const { catch } = require("fetch-mock");


/* Geonames API */
const baseUrl = 'http://api.geonames.org/searchJSON?q=';
const baseUrlTwo = '&maxRows=1&username=';
const apiKey = 'lauarmstrong';

/* WeatherBit API */
const weatherbitApiKey = '787c183ebc954dc9a4e455ca50a32a06';
const weatherBitUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';

/* Pixabay API */
const pixabayBaseUrl = 'https://pixabay.com/api/?key=';
const pixabayApi = '20825092-adac6544cffffad2ebb93dcf1';
// Create a new date instance dynamically with JS

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

// Globally defined variables
let newCity = document.getElementById('city').value;

//Async GET request API data
const getCity = async (baseUrl, baseUrlTwo, newCity, apiKey) => {
    const response = await fetch(baseUrl+newCity+baseUrlTwo+apiKey)
    console.log('url', response)
    try {
        const newData = await response.json();
        console.log('data', newData)
        return newData;
    } catch(error) {
        console.log('error'. error);
    }
}

const getWeather = async (latitude, longitude, dateInput) => {
    const request = await fetch(weatherBitUrl + '&lat=' + latitude + '&lon=' + longitude + '&start_date=' + dateInput + '&end_date=' + dateInput +"&units=I"+"&key=" + weatherbitApiKey);
    try {
        const weatherData = await request.json();
        return weatherData;
    } catch(error) {
        console.log('error', error);
    }
}

//getData function
// const getGeoData = async (url) => {
//     const response = await fetch(url);
//     try {
//         const geoData = await response.json();
//         return geoData;
//     } catch (error) {
//         console.log("error", error)
//     }
// }


//Event listener to get weather data then post data to app then update the UI
//userResponse: newUserResponse, userName: newUserName, longitude: data.geonames[0].lng, latitude: data.geonames[0].lat, country: data.geonames[0].countryName
const postToApp = (e) => {
    console.log('button clicked');
    let newCity = document.getElementById('city').value;
    let newDateInput = document.getElementById('date-input').value;
    let newUserName = document.getElementById('name').value;
    getCity(baseUrl, baseUrlTwo, newCity, apiKey)
    .then((data) => {
        const latitude = data.geonames[0].lat;
        const longitude = data.geonames[0].lng;
        const weatherData = getWeather(latitude, longitude, newDateInput);
        return weatherData;
    })
    .then((weatherData) => {
        const tempCelsius = Math.round((weatherData.data[0].temp -32) *5/9);
        const allData = postData(`/geoadd`, {newCity, newDateInput, newUserName, temperature: tempCelsius, weather: weatherData.data[0].weather.description})
        console.log('ALL DATA', allData);
        console.log('weatherdata', weatherData);
        return allData;
    })
    .then((allData) => {
        updateUI(allData);
    })
}
//Async POST API data and user's data to app
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    console.log('response', response)
    console.log('response body', response.body)
    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log('error', error)
    }
}

document.getElementById('generate').addEventListener('click', postToApp)

//Event listener to validate zip code entry meets criteria
// const validateZipcode = () => {
    //     if(document.getElementById('zip').value.length !== 5) {
        //         alert('Please enter 5-digit zipcode')
        //     };
        //     var letters = /^[A-Za-z]+$/;
        //     if(document.getElementById('zip').value.match(letters)) {
            //         alert('US zip codes only! (no letters allowed)')
            //     }
            // }
            // document.getElementById('generate').addEventListener('mouseover', validateZipcode)
            
            
            //Update the UI
const updateUI = async (allData) => {
    const request = await fetch(pixabayBaseUrl + pixabayApi + '&q=' + allData.newCity + '+&image_type=illustration');
    try {
        const pixabayImage = await request.json();
        //Countdown
        const currentDate = new Date();
        const dateInput = new Date (document.getElementById('date-input').value)
        const daysLeft = Math.ceil((dateInput - currentDate) / (3600 * 1000 * 24))
        let newDateInput = dateInput.getDate()+' '+ month[dateInput.getMonth()] + ' ' + dateInput.getFullYear();
        console.log('all data', allData);
        console.log('days left', daysLeft);
        console.log('current date', currentDate);
        console.log('pixaimage', pixabayImage);
        document.getElementById('weather').innerHTML = `The weather will be ${allData.temperature} degrees and ${allData.weather}`;
        document.getElementById('date').innerHTML = `Departing on: ${newDateInput}`;
        document.getElementById('content').innerHTML = `${allData.newUserName}, ${daysLeft} days until you're travelling to ${allData.newCity}!`;
        document.getElementById('city-image').setAttribute('src', pixabayImage.hits[0].webformatURL);
    } catch(error) {
        console.log('error', error);
    }
}

