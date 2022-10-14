const {bugCategory, bugPiority, bugServerity} = require('../config/constants')
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateBugInput(data) {
  let errors = {};

  data.category = validText(data.category) ? data.category : '';
  data.piority = validText(data.piority) ? data.piority : '';
  data.serverity = validText(data.serverity) ? data.serverity : '';
  data.summary = validText(data.summary) ? data.summary : '';
  data.description = validText(data.description) ? data.description : '';
  data.reproduce = validText(data.reproduce) ? data.reproduce : '';
  



  if (Validator.isEmpty(data.category)) {
    errors.category = 'category is required';
  }
  if (Validator.isEmpty(data.piority)) {
    errors.piority = 'piority is required';
  }
  if (Validator.isEmpty(data.serverity)) {
    errors.serverity = 'serverity is required';
  }
 
  if (Validator.isEmpty(data.summary)) {
    errors.summary = 'summary is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'description is required';
  }

  if(!Validator.isLength(data.summary,{min:2,max:160})){
    errors.summary = 'summary length should be between 2 and 160 characters'
  }
  if(!Validator.isLength(data.description,{min:2,max:2000})){
    errors.description = 'Description should be between 2 and 2000 characters'
  }
  if(!Validator.isLength(data.reproduce,{min:0,max:3000})){
    errors.reproduce = 'Reproduce step should lessser than 3000 characters'
  }

  if(!Validator.isIn(data.category,bugCategory)){
    errors.category = 'Invalid category'
  }

  if(!Validator.isIn(data.piority,bugPiority)){
    errors.piority = 'Invalid piority'
  }
  if(!Validator.isIn(data.serverity,bugServerity)){
    errors.serverity = 'Invalid serverity'
  }
  


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
