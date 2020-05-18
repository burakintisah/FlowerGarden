var express = require('express');

var router = express.Router();

router.post('/customer/', (req, res) => {
  var query = 'WITH to_display AS ('
    + 'SELECT arrangement_id, image_path, arrangement_name, volume, price, seller_id, details, rate, count '
    + 'FROM flower_arrangement '
    + 'WHERE seller_id IN ( SELECT seller_id FROM seller_serves_to WHERE district_id = ?)) '
    + 'SELECT DISTINCT TD.arrangement_id, TD.image_path, TD.arrangement_name, TD.price, A.first_name, A.last_name, TD.details, TD.rate, TD.count '
    + 'FROM to_display as TD, occasion as O, seller_working_time as SWT, composed_of C, account as A '
    + 'WHERE A.account_id = TD.seller_id AND SWT.seller_id = A.account_id AND TD.arrangement_id = O.arrangement_id '
    + 'AND C.arrangement_id = O.arrangement_id AND SWT.day=? AND SWT.hour=? ';

  var val = [req.body.district_id, req.body.day, req.body.hour];

  if (req.body.occasions && req.body.occasions.length > 0) {
    var occasion_query = " AND ( occasion_name=?";
    val.push(req.body.occasions[0].occasion_name);
    for (i = 1; i < req.body.occasions.length; i++) {
      occasion_query = " OR occasion_name=?";
      val.push(req.body.occasions[i].occasion_name);
    }
    query = query + occasion_query + ')';
  }

  if (req.body.flowers && req.body.flowers.length > 0) {
    var flower_query = " AND ( flower_id=?";
    val.push(req.body.flowers[0].flower_id);
    for (i = 1; i < req.body.flowers.length; i++) {
      flower_query = " OR flower_id=?";
      val.push(req.body.flowers[i].flower_id);
    }
    query = query + flower_query + ')';
  }

  dbconnection.query(query, val, function (err, result, fields) {
    if (err) {
      sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
      console.log('Error at: ' + err.sql);
      return;
    }
    sendResponse(res, 1, 'Done.', result);
  });
});

router.get('/:id', async (req, res) => {
  var query = "SELECT * FROM flower_arrangement WHERE arrangement_id = ?";
  var val = [req.params.id];

  let rows = await dbconnection.promise().query(query, val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);
  });
  result = rows[0][0];

  if (!result)
    sendResponse(res, 0, "Incorrect arrangement_id", null);

  query = "SELECT * FROM occasion WHERE arrangement_id = ?";
  rows = await dbconnection.promise().query(query, val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);
  });
  result.occasions = rows[0];

  query = "SELECT * FROM composed_of NATURAL JOIN flower WHERE arrangement_id = ?";
  rows = await dbconnection.promise().query(query, val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);
  });
  result.flowers = rows[0];

  query = "SELECT * FROM comment WHERE arrangement_id = ?";
  rows = await dbconnection.promise().query(query, val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);
  });
  result.comments = rows[0];

  sendResponse(res, 1, 'Done.', result);

});

router.get('/seller/:id', (req, res) => {
  var query = 'SELECT * FROM flower_arrangement natural join occasion WHERE seller_id = ?';
  var val = [req.params.id];

  dbconnection.query(query, val, function (err, result, fields) {
    if (err) {
      sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
      console.log('Error at: ' + err.sql);
      return;
    }
    sendResponse(res, 1, 'Done.', result);
  });
});

router.post('/create', async (req, res) => {
  var query = 'INSERT INTO flower_arrangement ( image_path, arrangement_name, volume, price, seller_id, details, rate, count, enabled) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ? )';
  var val = [req.body.image_path, req.body.arrangement_name, req.body.volume, req.body.price, req.body.seller_id, req.body.details, req.body.rate, req.body.count, req.body.enabled];

  let rows = await dbconnection.promise().query(query, val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);

  });

  arrangement_id = rows[0].insertId;
  var occasions = req.body.occasions;
  query = 'INSERT INTO occasion (arrangement_id, occasion_name) VALUES (?, ?)';

  for (i = 0; i < occasions.length; i++) {
    val = [arrangement_id, occasions[i].occasion_name]
    let rows = await dbconnection.promise().query(query, val).catch((err) => {
      console.log('Error at: ' + err);
      sendResponse(res, 0, err.sqlMessage, null);
    });
  }

  var flowers = req.body.flowers;
  query = 'INSERT INTO composed_of (count, flower_id, arrangement_id) VALUES ( ?, ?, ? )';
  for (i = 0; i < occasions.length; i++) {
    val = [flowers[i].count, flowers[i].flower_id, arrangement_id];
    let rows = await dbconnection.promise().query(query, val).catch((err) => {
      console.log('Error at: ' + err);
      sendResponse(res, 0, err.sqlMessage, null);
    });
  }

  sendResponse(res, 1, "Done.", { arrangement_id: arrangement_id });

});

router.get('/:id/delete', (req, res) => {
  var query = 'UPDATE flower_arrangement SET enabled = false WHERE arrangement_id = ?';
  var val = [req.params.id];

  dbconnection.query(query, val, function (err, result, fields) {
    if (err) {
      sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
      console.log('Error at: ' + err.sql);
      return;
    }
    sendResponse(res, 1, 'Done.', null);
  });
});

module.exports = router;