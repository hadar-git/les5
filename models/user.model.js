import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt';

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

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    // next();
});

userSchema.statics.comparePassword = async function (candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword,hashedPassword);
};

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
       // delete ret.__v;
        return ret;
    }
});

export const user = model('user', userSchema);