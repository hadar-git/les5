import Joi from "joi";

export const userDt = Joi.object({
   code: Joi.number().required(),
    username: Joi.string().required(),
  borrowedBooks: Joi.number().min(0).max(4), 
    email: Joi.string().email().required(), 
   password: Joi.string().min(6).required()

});





// export const userUpdateDt = Joi.object({
//     name: Joi.string(),
//   password: Joi.string().min(6).required()
// });