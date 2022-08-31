"use strict";
const express = require("express");
require("dotenv").config();
const weatherRouter = express.Router();
const axios = require("axios");

const cache = {};

weatherRouter.get("/", async (request, response) => {
  // const cityName = "dallas";
    const cityName = request.query.cityName
  const URL = `http://api.weatherbit.io/v2.0/forecast/daily/?key=6479beee993b401ea9769c4021833d9e&lang=en&city=${cityName}&days=5`;

  if (cache[cityName] !== undefined) {
    const ifTime = Date.now();
    console.log("Getting info from database", cityName, ifTime);
    response.status(200).send(cache[cityName]);
  } else {
    try{
      const currentTime =  Date.now();
      // const timestamp = currentDate.getTime();
    console.log(`Fetching data: ${currentTime}`);
    // inMemoryDB[cityName].datetime = Date.now();
    const res = await axios.get(URL);

    const weatherArray = res.data.data.map((day) => new Weather(day));
    // response.send(weatherArray);
    cache[cityName] = weatherArray;

    response.status(200).send(weatherArray);
    
    // return inMemoryDB[cityName].data;
    } catch (error) {
      console.log(error);
    } finally {
      console.log(cache)
    }

  }

  // function weatherHandler(request, response) {
  //   const { lat, lon } = request.query;
  //   weather(lat, lon)
  //   .then(summaries => response.send(summaries))
  //   .catch((error) => {
  //     console.error(error);
  //     response.status(200).send('Sorry. Something went wrong!')
  //   });
  // }
}); //end of app.get

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
  }
} //end of class Weather

module.exports = weatherRouter;
