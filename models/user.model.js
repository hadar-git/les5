import { Schema, model } from 'mongoose'


const loans= new Schema({
    code: Number, 
    bName: String

})
export const userSchema = new Schema({
    name: String, 
    phoneN:{type: String,  match: /^05\d{8}$/ }, 
    email: {type: String, unique: true }, 
    password: {type: String ,min: (4)}, 
    registeringDate: {type: String, default: Date.now}, 
    loans:[loans]
})

export const user = model('user', userSchema);