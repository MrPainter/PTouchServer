module.exports = function serverError (data, options) {

  // Get access to `req`, `res`, & `sails`
  var req = this.req;
  var res = this.res;
  var sails = req._sails;

  // Set status code
  res.status(200);


  // Only include errors in response if application environment
  // is not set to 'production'.  In production, we shouldn't
  // send back any identifying information about errors.
  // if (sails.config.environment === 'production' && sails.config.keepResponseErrors !== true) {
  //   data = undefined;
  // }

  return res.json({error: data.toString()});
};