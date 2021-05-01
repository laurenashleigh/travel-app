var Client =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
    .then( async (weatherData) => {
        const tempCelsius = Math.round((weatherData.data[0].temp -32) *5/9);
        const allData = await postData(`http://localhost:8080/geoadd`, {newCity, newDateInput, newUserName, temperature: tempCelsius, weather: weatherData.data[0].weather.description, icon: weatherData.data[0].weather.icon})
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

// Event listener to validate city name entry meets criteria
const validateCityName = () => {
    var letters = /^[A-Za-z]+$/;
    if(document.getElementById('city').value.match(letters)) {
        return null;
    } else {
        alert('City names only! (no numbers allowed)')
    }
}
document.getElementById('generate').addEventListener('mouseover', validateCityName)
            
            
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
        const icon = `src/client/media/icons/${allData.icon}.png`;
        const icon2 = `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`;
        document.getElementById('response-header').innerText = `You're travelling to ${allData.newCity}!!`
        document.getElementById('weather').innerHTML = `<strong>The weather will be ${allData.temperature} degrees and ${allData.weather}</strong>`;
        document.getElementById('date').innerHTML = `You'll be leaving on ${newDateInput} and staying for ${tripDays} days`;
        document.getElementById('content').innerHTML = `${allData.newUserName}, ${daysLeft} days until you're travelling to ${allData.newCity}!`;
        document.getElementById('city-image').setAttribute('src', pixaSrc);
        document.getElementById('weather-image').setAttribute('src', icon2);
    } catch(error) {
        console.log('error', error);
    }
}

module.exports = {postToApp};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./src/client/js/app.js
var app = __webpack_require__(0);

// CONCATENATED MODULE: ./src/client/styles/style.scss
// extracted by mini-css-extract-plugin

// CONCATENATED MODULE: ./src/client/index.js



/* harmony default export */ var client = __webpack_exports__["default"] = ({postToApp: app["postToApp"]});




/***/ })
/******/ ]);