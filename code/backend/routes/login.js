var express = require('express');

var router = express.Router();

router.post('/', (req, res) => {
  if (req.body.email == null) {
    sendResponse(res, 0, 'Request Error: There is no email field.', null);
    return;
  }

  if (req.body.email == "") {
    sendResponse(res, 0, 'Request Error: Email field is empty.', null);
    return;
  }

  dbconnection.query('SELECT email, password, account_id, account_type FROM account WHERE account.email=\'' + req.body.email + '\'', function (err, result, fields) {
    if (err) {
      sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
      console.log('Error at: ' + err.sql);
      return;
    }

    if (result.length != 0) {
      console.log(result[0] + "--" + req.body.password );
      if (result[0].password == req.body.password) {
        sendResponse(res, 1, 'Logged in.', result[0]);
      }
      else
        sendResponse(res, 0, 'Password is incorrect.', null);
    }
    else
      sendResponse(res, 0, 'Email is incorrect.', null);

  });
});

module.exports = router;
