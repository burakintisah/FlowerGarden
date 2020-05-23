var express = require('express');

var router = express.Router();

router.get('/', (req, res, next) => {
  dbconnection.query('SELECT * FROM province', function (err, result, fields) {
    if (err) {
      sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
      console.log('Error at: ' + err.sql);
      return;
    }
    sendResponse(res, 1, 'Done.', result);
  });
});

module.exports = router;
