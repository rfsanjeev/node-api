import express from 'express';
import { createEvent, updateEvent, deleteEvent, getEventById, getEvent } from '../controllers/event.js';
//import logger from '../middleware/logger.js';
import catchAsync from '../utils/catchAsync.js';
import multer from 'multer';
import { validate } from '../validation/userValidator.js';
import eventValidationRules from '../validation/eventValidator.js';
import { checkJwtToken, isUserAllowToAccess } from '../middleware/middleware.js';

const router = express.Router();
const upload = multer();

router.route('/')
   .get(checkJwtToken, catchAsync(getEvent))
   .post(upload.none(), checkJwtToken, eventValidationRules(), validate, catchAsync(createEvent));

router.route('/:id')
   .get(checkJwtToken, isUserAllowToAccess, catchAsync(getEventById))
   .put(checkJwtToken, isUserAllowToAccess, eventValidationRules(), validate, catchAsync(updateEvent))
   .delete(checkJwtToken, isUserAllowToAccess, catchAsync(deleteEvent));

router.use((err, req, res, next) => {
   const {message = 'something went wrong', status = 500} = err;
   //logger.error(message);
   res.status(status).send(message)
})

export default router;