// external imports
const { check, validationResult } = require('express-validator');

const addCustomerValidator = [
  check('firstName')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other then alphabet')
    .trim(),
  check('lastName')
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isAlpha('en-US', { ignore: ' -' })
    .withMessage('Name must not contain anything other then alphabet')
    .trim(),
  check('email').isEmail().withMessage('Invalid email address').trim(),

  check('phoneNo')
    .isMobilePhone('bn-BD', { strictMode: true })
    .withMessage('Mobile number must be valid Bangladeshi number!'),

  check('password')
    .isStrongPassword()
    .withMessage(
      'Password must be 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol',
    ),
];

const addCustomerValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.status(500).json({ errors: mappedErrors });
  }
};

module.exports = { addCustomerValidator, addCustomerValidationHandler };

// if (req.files?.length > 0) {
//   const fileName = req.files[0].filename;
//   unlink(
//     path.join(__dirname, `/../../public/uploads/avatars/${fileName}`),
//     (err) => {
//       if (err) console.log(err);
//     },
//   );
// }
