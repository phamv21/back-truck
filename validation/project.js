
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateProjectInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : '';
  


  if (Validator.isEmpty(data.title)) {
    errors.title = 'title field is required';
  }
  if (!Validator.isLength(data.title, { min: 2, max: 30 })) {
    errors.title = 'username must be between 2 and 30 characters';
  }

  

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
