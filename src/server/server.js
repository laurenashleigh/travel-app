// // Setup empty JS object to act as endpoint for all routes
// projectData = {};

// // Require Express to run server and routes
// const express = require('express');

// // Start up an instance of app
// const app = express();

// /* Middleware*/
// //Here we are configuring express to use body-parser as middle-ware.
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Cors for cross origin allowance
// const cors = require('cors');
// app.use(cors());

// // Initialize the main project folder
// app.use(express.static('dist'));

// const port = 8080;

// // Setup Server
// app.listen(port, () => {console.log('running on localhost: ', port)});

// //GET route
// app.get('/all', (request, response) => {
//     response.send(projectData);
// });

// //POST route
// app.post('/add', (request, response) => {
//     let data = request.body;
//     projectData = {
//         // weather: data.weather,
//         // temperature: data.temperature,
//         // date: data.date,
//         userResponse: data.userResponse,
//         userName: data.userName
//     }
//     response.send(projectData);
// })

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}))

// designates what port the app will listen to for incoming requests
const port = 8080;
app.listen(port, function () {
    console.log('Example app listening on port 8080!')
})

//Setting up endpoint
let geoProjectData = {};

/* Defining Variables */
// const baseUrl = 'http://api.geonames.org/searchJSON?q='
// const apiKey = process.env.API_KEY
// app.get('/get', function (req, res) {
//     res.send({ key: apiKey})
// })


/* Geonames API */
//GET & POST route for geoall
app.get('/geoall', (req, res) => {
    // let data = req.body;
    // geoProjectData = {
    //     longitude: data.lng,
    //     latitude: data.lat,
    //     country: data.countryName,
    //     userResponse: data.userResponse,
    //     userName: data.userName
    // }
    res.send(geoProjectData)
    console.log(geoProjectData, 'georojectdata posted successfully!')
})

// app.post('/geoall', (req, res) => {
//     res.send(geoProjectData);
//     console.log('Geo posted successfully!')
// })

//POST route
app.post('/geoadd', (req, res) => {
        let data = request.body;
        projectData = {
            // weather: data.weather,
            // temperature: data.temperature,
            // date: data.date,
            userResponse: data.userResponse,
            userName: data.userName
        }
        res.send(projectData);
        console.log('Geo added successfully!')
    // Object.assign(geoProjectData, req.body);
    // res.send(true);
})