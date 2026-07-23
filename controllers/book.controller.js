
import { book } from '../models/book.model.js'
import { loan } from '../models/loans.model.js';
import { user } from '../models/user.model.js';
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
        const u = await user.findOne({ code: req.body.customerCode });

        if (u.loans.length >= 3) {
            const err = new Error('you already have 3 books borrowed');
            err.status = 403;
            err.type = 'borrow limit reached';
            return next(err);
}
        else{
             b.isBorrowed = true;
         
b.borrowedBy = req.body.customerCode;
    b.loans.push({ borrowDate: new Date(), customerCode: req.body.customerCode });
    const returningDate = new Date();
returningDate.setDate(returningDate.getDate() + 14);
    u.loans.push({ name: b.name, code: b.code, returningDate});
    const newLoan = new loan({
    bookCode: b.code,
    bookName: b.name,
    userCode: req.body.customerCode
});
await newLoan.save();
    await u.save(); 
    await b.save();
    res.status(200).send(b);
        }
   
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
      {  const borrowerCode = b.borrowedBy;  

b.isBorrowed = false;
b.borrowedBy = null;

const loanRecord = await loan.findOne({ 
    bookCode: +req.params.id, 
    userCode: borrowerCode,  // ← משתמשים בערך השמור
    returnDate: undefined 
});
if (loanRecord) {
    loanRecord.returnDate = new Date();
    await loanRecord.save();
}

const u = await user.findOne({ code: borrowerCode });  // ← גם כאן
u.loans = u.loans.filter(bb => bb.code !== +req.params.id);
await u.save();
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

export const getBookByCategory = async(req, res, next) => {


   
     try {
    const { category } = req.params;
    const resu = await book.find({ category });
    res.status(200).send(resu);
  } catch (err) {
    err.status = 500;
    err.type = 'server error';
    next(err);
  }
};