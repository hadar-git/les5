import Joi from "joi";

export const userDt = Joi.object({
   code: Joi.number().required(),
   name: Joi.string().required(),
    email: Joi.string().email().required(), 
   password: Joi.string().min(6).required(), 
   phoneN: Joi.string().required()
  

});





// export const userUpdateDt = Joi.object({
//     name: Joi.string(),
//   password: Joi.string().min(6).required()
// });