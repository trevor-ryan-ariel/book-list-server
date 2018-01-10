'use strict'

const express = require('express')
const pg = require('pg')
const cors = require('cors')
// const bodyParser = require('body-parser') //not necessary with this express
// const fs = require('fs');        not currently used so not currently necessary

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app'

const client = new pg.Client()
client.connect()

const app = express()

app.use(cors()) //call cors to be used, this opens your file fully for all to see and use

app.get('/', (rec, res) => {
    client.query(`
    SELECT book_id, title, author, image_url FROM books;
`).then(result => res.send(result.rows))
        .catch(err => console.log(err))
})


//consString for Trevor
// const conString = 'postgres://trevorjdobson:1234@localhost:5432/books_app';
//conString for Ryan
// const conString = 'postgres://localhost:5432/books_app';


// client.on('error', err => {
//     console.error(err);
// });

// app.get('/test', (req, res) => res.send('hello world'));

// app.get('/api/v1/books', (req, res) => {
//     client.query(`
//         SELECT book_id, title, author, image_url FROM books;
//         `)
//     .then(result => consoel.log(result)
// });

app.listen(PORT, () => console.log('server started on PORT ' + PORT));