//jshint esversion:6
const express = require("express");

const app = express();

const https = require("https");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000,function() {
    console.log("Server Started on port 3000");
});

app.post("/",function(req,res){
    const query = req.body.city;
    const apiKey = "ADD your api key here you can get from openweathermap";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;
    
    https.get(url,function(response){
        
        console.log(response.statusCode);
        
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const tempDesc = weatherData.weather[0].description;
            const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
            
            res.write("<h1>The temperature is "+ tempDesc + "</h1>");
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees celsius</h1>");
            res.write("<img src= " + icon + ">");
        });
    });   
})



