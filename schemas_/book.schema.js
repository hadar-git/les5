
import Joi from "joi"

export const bookDt= Joi.object({
    code: Joi.number().required(), 
    name: Joi.string(), 
    category: Joi.string(), 
    price: Joi.number().min(0).max(100).required(), 
isBorrowed: Joi.boolean().required(), 
loans: Joi.array()
})


export const bookUpdateDt = Joi.object({
    name: Joi.string(),
    category: Joi.string(),
    price: Joi.number().min(0).max(100)
});