'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3005;
const app = express();
const weatherRouter = require('./modules/weather.js');
app.use(cors());


app.use('/weather', weatherRouter);



app.listen(PORT, () => console.log(`Keep Going. Port: ${PORT}`));