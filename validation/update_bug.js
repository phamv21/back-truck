const {bugServerity, bugStatus} = require('../config/constants')
const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateUpdateBugInput(data) {
  let errors = {};

  data.status = validText(data.status) ? data.status : '';
  data.serverity = validText(data.serverity) ? data.serverity : '';

  



  if (Validator.isEmpty(data.status)) {
    errors.status = 'status is required';
  }
 
  if (Validator.isEmpty(data.serverity)) {
    errors.serverity = 'serverity is required';
  }
 
  

 

  if(!Validator.isIn(data.status,bugStatus)){
    errors.status = 'Invalid status'
  }

  if(!Validator.isIn(data.serverity,bugServerity)){
    errors.serverity = 'Invalid serverity'
  }
  


  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
