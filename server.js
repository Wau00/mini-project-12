// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// add __dirname to make sure that we are grabbing from the right directory
const uuid = require(__dirname + '/helpers/uuid');

// set up express and data parsing
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());