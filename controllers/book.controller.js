
import { book } from '../models/book.model.js'

 export const getAllBooks = async (req, res, next) => {
try {
     const { limit = '10', page= '1' , name = ''} = req.query;
      const startIndex = limit * (page - 1);
const resu = await book.find({ name: new RegExp(name, 'i') })
  .skip(startIndex)
  .limit(Number(limit));

      res.status(200).json(resu);

} catch (err) {
    err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
    
}

export const getBookByID = async (req, res, next) => {
    try {
        let b= await book.findOne({ code: +req.params.id  });
if(b)
{
     res.status(200).send(b);
}
       
else{
        const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
}
    } catch (err) {
         err.status = 500;        
        err.type = 'server error'; 
        next(err);
    }

}

 export const addBook =async  (req, res, next) => { 
try {
    const newB = new book(req.body);
   await newB.save();
    res.status(201).send(newB);
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
  
}

export const updateBook =async  (req, res, next) => {

    try {
   const b=await book.findOne({code: +req.params.id}); 
    if(b)
    {
       b.name= req.body.name;
        b.category=req.body.category;
        b.price= +req.body.price;
        await b.save();
     res.status(200).send(b);
    }
    else{

   const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
    } 
}
catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
} 
 }


export const updateLoaningBook =async  (req, res, next) => {

       try {
    
    const b= await book.findOne({code: +req.params.id});
    if(!b)
    {
  const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
    }
   else if (b.isBorrowed == false) {
    b.isBorrowed = true;
    b.loans.push({ borrowDate: new Date(), customerCode: req.body.customerCode });
    await b.save();
    res.status(200).send(b);
    }
    else{
      const err = new Error('already in use');
    err.status = 409; 
    err.type = 'conflict';
    next(err);
    }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}

};


export const updateReturnedBook =async (req, res, next) => {


    try {
     const b=await book.findOne({code:+req.params.id }); 
     if(!b)
    {
  const err = new Error('could not find it');
    err.status = 404; 
    err.type = 'not found';
    next(err);
    }
    else if(b.isBorrowed ==true)
        {
        console.log("returned");
        b.isBorrowed=false
       await b.save();
            res.status(200).send(b);
        }
        else{
             const err = new Error('not borrowed');
    err.status = 409; 
    err.type = 'conflict';
    next(err);
        }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
     
}


export const deleteBook =async (req, res, next) => {

    try {      
     const b = await book.findOneAndDelete({ code: +req.params.id});
    if(b)
    {
        res.status(200).send();
    }
    else{
       const err = new Error('not found');
    err.status = 404; 
    err.type = 'not found';
    next(err);  
    }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
}
};