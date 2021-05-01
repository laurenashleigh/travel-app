

//Setting up endpoint
let geoProjectData = {};

const dotenv = require('dotenv');
var path = require('path');
const fetch = require('node-fetch');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
dotenv.config();
const app = express();

/* Initialise main project folder */
app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true,
}))
app.use(bodyParser.json())

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function () {
    console.log('Example app listening on port 8080!')
})



/* Defining Variables */
// const baseUrl = 'http://api.geonames.org/searchJSON?q='
// const apiKey = process.env.API_KEY
// app.get('/get', function (req, res) {
//     res.send({ key: apiKey})
// })


/* Geonames API */
//GET & POST route for geoall
app.get('/geoall', (req, res) => {
    res.send(geoProjectData)
    console.log(geoProjectData, 'georojectdata posted successfully!')
})

// app.post('/geoall', (req, res) => {
//     res.send(geoProjectData);
//     console.log('Geo posted successfully!')
// })

//POST route
app.post('/geoadd', (req, res) => {
        let data = req.body;
        geoProjectData["newCity"] = data.newCity;
        geoProjectData["newDateInput"] = data.newDateInput;
        geoProjectData["newUserName"] = data.newUserName;
        geoProjectData["temperature"] = data.temperature;
        geoProjectData["country"] = data.country;
        geoProjectData["weather"] = data.weather;
        geoProjectData["icon"] = data.icon;
        res.send(geoProjectData);
        console.log('Geo added successfully!')
    // Object.assign(geoProjectData, req.body);
    // res.send(true);
})