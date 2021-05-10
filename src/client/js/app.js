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

let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Async GET request API data
const getCity = async (baseUrl, baseUrlTwo, newCity, apiKey) => {
    const response = await fetch(baseUrl+newCity+baseUrlTwo+apiKey)
    console.log('url', response)
    try {
        const newData = await response.json();
        console.log('data', newData)
        return newData;
    } catch(error) {
        console.log('error getting city'. error);
        document.getElementById('error').innerText = 'There was an error getting the city data';

    }
}

const getWeather = async (latitude, longitude, dateInput) => {
    const request = await fetch(weatherBitUrl + '&lat=' + latitude + '&lon=' + longitude + '&start_date=' + dateInput + '&end_date=' + dateInput +"&units=I"+"&key=" + weatherbitApiKey);
    try {
        const weatherData = await request.json();
        return weatherData;
    } catch(error) {
        console.log('error getting weather', error);
        //document.getElementById('error').innerText = 'There was an error getting the weather data';
    }
}

//Event listener to get weather data then post data to app then update the UI
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
        const allData = postData(`http://localhost:8080/geoadd`, {newCity, newDateInput, newUserName, temperature: tempCelsius, weather: weatherData.data[0].weather.description, icon: weatherData.data[0].weather.icon})
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
        console.log('error posting data', error)
        //document.getElementById('error').innerText = 'There was an error posting the data';
    }
}

export const executePostToApp = () => {
    document.getElementById('generate').addEventListener('click', postToApp)
}

// Event listener to validate city name entry meets criteria
const validateCityName = () => {
    var letters = /^[A-Za-z]+$/;
    if(document.getElementById('city').value.match(letters)) {
        return null;
    } else {
        alert('Enter a valid city name!')
    }
}
export const eventListener = () => {document.getElementById('generate').addEventListener('mouseover', validateCityName)}
            
            
            //Update the UI
const updateUI = async (allData) => {
    const request = await fetch(pixabayBaseUrl + pixabayApi + '&q=' + allData.newCity + '+&image_type=illustration');

    try {
        const pixabayImage = await request.json();
        //Countdown
        const currentDate = new Date();
        const dateInput = new Date (document.getElementById('date-input').value);
        const endDate = new Date (document.getElementById('enddate-input').value);
        const daysLeft = Math.ceil((dateInput - currentDate) / (3600 * 1000 * 24));
        const tripDays = Math.ceil((endDate- dateInput) / (3600 * 1000 * 24));
        let newDateInput = dateInput.getDate()+' '+ month[dateInput.getMonth()] + ' ' + dateInput.getFullYear();

        //Return default image if no image available
        const pixaSrc = pixabayImage.hits[0].webformatURL ? pixabayImage.hits[0].webformatURL : 'https://www.umthunzi.co.za/2016/wp-content/uploads/2017/02/Benefits-Family-Holiday-1.jpg';
        // const icon = `../media/icons/${allData.icon}.png`;
        const icon2 = `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`;
        document.getElementById('response-header').innerText = `You're travelling to ${allData.newCity}!!`
        document.getElementById('weather').innerHTML = `<strong>The weather will be ${allData.temperature} degrees and ${allData.weather}</strong>`;
        document.getElementById('date').innerHTML = `You'll be leaving on ${newDateInput} and staying for ${tripDays} days`;
        document.getElementById('content').innerHTML = `${allData.newUserName}, ${daysLeft} days until you're travelling to ${allData.newCity}!`;
        document.getElementById('city-image').setAttribute('src', pixaSrc);
        document.getElementById('weather-image').setAttribute('src', icon2);
        document.getElementById('error').innerHTML = '<h1>There was an error posting the data</h1>';

    } catch(error) {
        console.log('error updating UI', error);
        //document.getElementById('error').innerText = 'There was an error updating the web page';

    }
}

export { postToApp };