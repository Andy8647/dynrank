/* server.js - Express server*/
'use strict';

const express = require('express')
const app = express();
const path = require('path');


app.use(express.static(path.join(__dirname, '/pub')))




app.get('/', (req, res) => {
	res.sendFile(__dirname + '/pub/pages/index.html')
})

// app.get('/doc', (req, res) => {
// 	res.sendFile(__dirname + '/pub/pages/documentation.html')
// })

// app.get('/exp', (req, res) => {
// 	res.sendFile(__dirname + '/pub/pages/examples.html')
// })

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
}) 
