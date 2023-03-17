import express from 'express';
import { userRegistration, userLogin } from '../controllers/user.js';
import catchAsync from '../utils/catchAsync.js';
import multer from 'multer';
import { userValidationRules, validate } from '../validation/userValidator.js';
import { isUserExist } from '../middleware/middleware.js';

const router = express.Router();
const upload = multer();

router.post('/registration',upload.none(),isUserExist,userValidationRules(),validate,catchAsync(userRegistration));
router.post('/login',upload.none(),isUserExist,userValidationRules(),validate,catchAsync(userLogin));

export default router;