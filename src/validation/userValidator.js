import { body, validationResult } from 'express-validator';

const userValidationRules = () => {
  return [
    body('email')
    .isEmail()
    .withMessage('Invalid Email Address'),
    body('password')
    .isLength({ min: 6 })
    .withMessage('Must be at least 6 chars long')
    .not()
    .isIn(['12345', 'password'])
    .withMessage('Do not use a common word as the password'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  console.log(extractedErrors);

  return res.status(422).json({
    errors: extractedErrors,
  })
}

export { userValidationRules, validate }