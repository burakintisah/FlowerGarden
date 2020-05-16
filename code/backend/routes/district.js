var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    val = [req.body.province_id]
  dbconnection.query('SELECT district_id, district_name FROM district WHERE province_id=?', val, function (err, result, fields) {
    if (err) {
      sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
      console.log('Error at: ' + err.sql);
      return;
    }
    if (result.length > 0)
        sendResponse(res, 1, 'Done.', result);
    else
        sendResponse(res, 0, 'Incorrect province_id.', null);

  });
});

module.exports = router;
