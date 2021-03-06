'use strict'

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 3000;
const app = express();

//consString for Trevor
// const DATABASE_URL = process.env.DATABASE_URL || 'postgres://trevorjdobson:1234@localhost:5432/books_app';
//conString for Ryan
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/books_app';
//conString for Ariel
// const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:1234@localhost:5432/books_app';

const client = new pg.Client(DATABASE_URL);
client.connect();
client.on('error', err => {
  console.error(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.get('/test', (req, res) => res.send('hello world'));

//get all
app.get('/api/v1/books', (req, res) => {
  client.query(`
        SELECT book_id, title, author, image_url FROM books;
        `)
    .then(result => res.send(result.rows))
    .catch(err => console.error(err));
});

//get one
app.get('/api/v1/books/:id', (req, res) => {
  client.query(`
    SELECT * FROM books WHERE book_id=${req.params.id}
`).then(result => res.send(result.rows[0]))
    .catch(err => console.error(err))
});

//post
app.post('/api/v1/books', express.json(), express.urlencoded({
  extended: true
}), (req, res) => {
  client.query(`
        INSERT INTO books 
            (title, author, image_url, isbn, description)
            VALUES($1, $2, $3, $4, $5);
    `, [
      req.body.title,
      req.body.author,
      req.body.image_url,
      req.body.isbn,
      req.body.description
    ])

    .then(() => res.send('new book added'))
    .catch(err => console.error(err))
})

//update
app.put('/api/v1/books/:id', express.json(), express.urlencoded({
  extended: true
}), (req, res) => {
  client.query(`
        UPDATE books 
            SET title='${req.body.title}',
            author='${req.body.author}',
            image_url='${req.body.image_url}',
            isbn='${req.body.isbn}',
            description='${req.body.description}'
            WHERE book_id=${req.body.book_id};
    `)
    .then(() => res.sendStatus(200, ' ok'))
    // .catch(err => console.error(err, req, res))
})

//delete
app.delete('/api/v1/books/:id', (req, res) => {
  client.query(`
      DELETE FROM books WHERE book_id=${req.params.id};
  `)
})

app.listen(PORT, () => console.log('server started on port ' + PORT));