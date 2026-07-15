

import express from 'express'
import {  books } from './index.js'
const app = express()
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello World')
})

app.get('/books', (req, res) => {
  res.status(200).send(books);
})


app.get('/books/:id', (req, res) => {
 res.status(200).send(books.find(book => Number(book.code) === Number(req.params.id)) );
})


app.post('/books/', (req, res) => {

 res.status(200).send(books.push(req.body));
})

app.put('/books/:id', (req, res) => {
     const b= books.find(book => Number(book.code) === Number(req.params.id)) 
if(b)
{
   b.name= req.body.name;
    b.category=req.body.category;
    b.price= req.body.price;
 res.status(200).send(b);
}
else{
     res.status(404).send("error");
}

});

app.patch('/books/:id/borrow', (req, res) => {
    const b= books.find(book => Number(book.code) === Number(req.params.id)) 

    if( b && b.isBorrowed ==false  )
    {
        b.isBorrowed=true;
        res.status(200).send(b.loans.push({ borrowDate: new Date(), customerCode: req.body.customerCode }));
    }
    else{
        res.status(404).send('already in use');
    }
});

app.patch('/books/:id/return', (req, res) => {
    const b= books.find(book => Number(book.code) === Number(req.params.id)) 

    if( b && b.isBorrowed ==true  )
    {
    console.log("returned");
    
        res.status(200).send( b.isBorrowed=false);
    }
    else{
        res.status(404).send('no idea');
    }
});

app.delete('/books/:id', (req, res) => {
   const index = books.findIndex(book => Number(book.code) === Number(req.params.id));


    if(index!==-1)
   {
    console.log("ddd");
  
        res.status(200).send( books.splice(index, 1));
    }
    else{
        res.status(404).send('not found');
    }
});


app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})