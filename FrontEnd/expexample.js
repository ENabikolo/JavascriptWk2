"use strict"; 

import{getLeagueAndOutput} from "./punkAPI.js";

const url = "https://api.punkapi.com/v2/beers/1"; 

//require express and create an instance of it.i.e import the express module. 
const express = require("express");   //let express = require('express');
//const open = require ("open"); //opens a new browser everytime the app is run. 
const app = express(); // initialized the express object.
const port = 3000; //use the const keyword as the port is an unchangeable variable. 

//added a handler got get.
app.get('/', function(req, res) {   
	res.send('Make Your Own Brew!');
});

//Tell express to listen to HTTP requests on port 3000. 
app.listen(port, function() {  
console.log('Welcome to the home of the Brew!');
});
