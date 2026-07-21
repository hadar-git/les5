import { notFound } from '../middlewares/error.middleware.js';
import {user} from '../models/user.model.js'


 export const getAllUsers =async (req, res, next) => {
try{
  const u = await user.find();
     res.status(200).send(u);
}
    
catch(err)
{
   err.status = 500;        
  err.type = 'server error'; 
  next(err);
}
}

export const registerUser = async (req, res, next) => {
try {
const u=  new user(req.body);
await    u.save();
 res.status(201).send(u);
} catch (err) {
        err.status = 500;        
        err.type = 'server error'; 
        next(err);
}

}



export const loginUser =async (req, res, next) => {
try {
    const u = await user.findOne({email: req.body.email ,password: req.body.password})
    if(u)
    {
        res.status(200).send(u);
    }
    else{
        
       const err = new Error('could not find it');
    err.status = 401; 
    err.type = 'authentication error';
    next(err);
    }
} catch (err) {
     err.status = 500;        
        err.type = 'server error'; 
        next(err);
} 
}
