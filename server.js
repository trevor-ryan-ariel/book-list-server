const express = require('express')
const pg = require('pg')
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')


const PORT = process.env.PORT || 3000
const app = express()

app.get('/test', (req, res) => res.send('hello world'))
app.listen(PORT, () => console.log('server started on port' + PORT))