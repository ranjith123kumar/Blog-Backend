const express = require("express");
const http = require("http");
const router = require("./routes/routes"); 
const app = express();

app.use(express.json()); 
app.use(router); 

const server = http.createServer(app);

module.exports = server;
