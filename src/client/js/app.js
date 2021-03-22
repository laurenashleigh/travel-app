

/* Geonames API */
const baseUrl = 'http://api.geonames.org/searchJSON?q=';
const baseUrlTwo = '&maxRows=1&username=';
const apiKey = 'lauarmstrong';

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
        console.log(newUserName);
        console.log(data, 'data')
        console.log('data geonames', data.geonames[0].lat)
        postData(`/geoadd`, {newDateInput, newUserName, longitude: data.geonames[0].lng, latitude: data.geonames[0].lat, country: data.geonames[0].countryName})
    })
    .then((data) => {
        console.log('data2', data);
        updateUI('/geoall');
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
const updateUI = async (url) => {
    const request = await fetch(url)
    try {
        const allData = await request.json();
        //Countdown
        const currentDate = new Date();
        const dateInput = new Date (document.getElementById('date-input').value)
        const daysLeft = Math.ceil((dateInput - currentDate) / (3600 * 1000 * 24))
        let newDateInput = dateInput.getDate()+' '+ month[dateInput.getMonth()] + ' ' + dateInput.getFullYear();
        console.log('all data', allData);
        console.log('days left', daysLeft);
        console.log('current date', currentDate);
        document.getElementById('weather').innerHTML = `The weather will be: ${allData.longitude} degrees and ${allData.latitude}`;
        document.getElementById('date').innerHTML = `Departing on: ${newDateInput}`;
        document.getElementById('content').innerHTML = `${allData.newUserName}, ${daysLeft} days until you're travelling to ${allData.country}!`;
    } catch(error) {
        console.log('error', error);
    }
}

