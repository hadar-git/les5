import { Schema, model } from 'mongoose'

const loanSchema = new Schema({
    bookCode: Number,
    bookName: String,
    userCode: Number,
    borrowDate: { type: Date, default: Date.now },
    returnDate: Date
})

export const loan = model('loans', loanSchema);