const express = require('express');

const sequalize = require('../config/connection');

const app =express();
const PORT = process.env.PORT || 3001;