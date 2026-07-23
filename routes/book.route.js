

import {getAllBooks, getBookByID, addBook, updateBook, updateReturnedBook, updateLoaningBook, deleteBook, getBookByCategory } from '../controllers/book.controller.js'
import { Router } from "express";

const router = Router();

// router.get('/', (req, res) => {
//   res.status(200).send('Hello World')
// })

import {validateBody} from '../middlewares/validate.middleware.js'
import { bookDt, bookUpdateDt } from '../schemas_/book.schema.js';


router.get('/',getAllBooks);
router.get('/:id/category', getBookByCategory);
router.get('/:id', getBookByID);

router.post('/',validateBody(bookDt),  addBook);
router.put('/:id', validateBody(bookUpdateDt),updateBook );
router.patch('/:id/borrow', updateLoaningBook); 
router.patch('/:id/return', updateReturnedBook);
router.delete('/:id/',deleteBook );
export default router;