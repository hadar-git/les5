

import express from 'express'
import {  books } from './index.js'
const app = express()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/books', (req, res) => {
  res.send(books);
})


app.get('/books/:id', (req, res) => {
 res.send(books.find(book => Number(book.code) === Number(req.params.id)) );
})


app.post('/books/', (req, res) => {

    
 res.send(books.push(req.body));
})

app.patch('/books/:id/borrow', (req, res) => {
    const b= books.find(book => Number(book.code) === Number(req.params.id)) 

    if( b && b.isBorrowed ==false  )
    {
        b.isBorrowed=true;
        res.send(b.loans.push({ borrowDate: new Date(), customerCode: req.body.customerCode }));
    }
    else{
        res.send('already in use');
    }
});

app.patch('/books/:id/return', (req, res) => {
    const b= books.find(book => Number(book.code) === Number(req.params.id)) 

    if( b && b.isBorrowed ==true  )
    {
    console.log("returned");
    
        res.send( b.isBorrowed=false);
    }
    else{
        res.send('no idea');
    }
});

app.delete('/books/:id', (req, res) => {
   const index = books.findIndex(book => Number(book.code) === Number(req.params.id));

    if(index!==-1)
   {
    console.log("ddd");
    
        res.send( books.splice(index, 1));
    }
    else{
        res.send('not found');
    }
});


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})