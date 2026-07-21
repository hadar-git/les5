

import { model, Schema} from 'mongoose';
const loans =new Schema({
    custCode: Number, 
    date: String
})
const bookSchema =new Schema({
code:Number, 
name: {type: String, min: 2, max: 20, unique: true},  
price: Number, 
category: {type: String, enum:['abc', 'def', 'ghi', 'jkl']}, 
author: {
    aName: String, 
    phone: Number, 
    email: String, 
}, 
 isBorrowed:Boolean, 
 loans: [loans],
});


export const book =model('books', bookSchema);