

import { model, Schema} from 'mongoose';
const loans =new Schema({
    custCode: Number, 
    date: String
})
const bookSchema =new Schema({
code:Number, 
name: String, 
price: Number, 
category: String, 
author: {
    aName: String, 
    phone: Number, 
    email: String, 
}, 
 isBorrowed:Boolean, 
 loans: [loans],
});


export const book =model('books', bookSchema);