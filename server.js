'use strict'

const express = require('express');
const pg = require('pg');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');


const PORT = process.env.PORT || 3000;
const app = express();

//consString for Trevor
// const conString = 'postgres://trevorjdobson:1234@localhost:5432/books_app';
//conString for Ryan
const conString = 'postgres://localhost:5432/books_app';

const client = new pg.Client(conString);
client.connect();
client.on('error', err => {
    console.error(err);
});

app.get('/test', (req, res) => res.send('hello world'));

app.get('/api/v1/books', (req, res) => {
    client.query(`
        SELECT book_id, title, author, image_url FROM books;
        `)
    .then(result => consoel.log(result)
});

app.listen(PORT, () => console.log('server started on port' + PORT));