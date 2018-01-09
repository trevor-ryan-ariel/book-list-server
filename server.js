'use strict'

const express = require('express');
const pg = require('pg');
const cors = require('cors');


const PORT = process.env.PORT || 3000;
const app = express();

//consString for Trevor
// const DATABASE_URL = process.env.DATABASE_URL || 'postgres://trevorjdobson:1234@localhost:5432/books_app';
//conString for Ryan
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app';

const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => {
  console.error(err);
});

app.get('/test', (req, res) => res.send('hello world'));

app.get('/api/v1/books', (req, res) => {
  client.query(`
        SELECT book_id, title, author, image_url FROM books;
        `)
    .then(result => res.send(result.rows))
    .catch(err => console.error(err));
});

app.listen(PORT, () => console.log('server started on port' + PORT));