import { body, validationResult } from 'express-validator';

const eventValidationRules = () => {
  return [
    body('title')
    .notEmpty()
    .withMessage('Title is Required'),
    body('location')
    .notEmpty()
    .withMessage('Location is Required'),
    body('date')
    .notEmpty()
    .withMessage('Date is Required'),
  ]
}

export default eventValidationRules;