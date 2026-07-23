import { Schema, model } from 'mongoose'


const loans= new Schema({
 name: String, 
    code: Number, 
    returningDate: String
})
const borrowedBooks =new Schema({
   
})
export const userSchema = new Schema({
    name: String,
    code: Number, 
    phoneN:{type: String,  match: /^05\d{8}$/ }, 
    email: {type: String, unique: true }, 
    password: {type: String ,min: (4)}, 
    registeringDate: {type: Date, default: Date.now}, 
    loans:[loans], 
    
})

export const user = model('user', userSchema);