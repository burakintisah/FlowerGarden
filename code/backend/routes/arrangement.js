var express = require('express');

var router = express.Router();

router.post('/customer/', (req, res) => {
  if (req.body.search_text) {
    var query = 'WITH to_display AS ('
      + 'SELECT arrangement_id, image_path, arrangement_name, volume, price, seller_id, details, rate, count '
      + 'FROM enabled_arrangements '
      + 'WHERE seller_id IN ( SELECT seller_id FROM seller_serves_to WHERE district_id = ?)) '
      + 'SELECT DISTINCT TD.arrangement_id, TD.image_path, TD.arrangement_name, TD.price, A.first_name, A.middle_name, A.last_name, TD.details, TD.rate, TD.count '
      + 'FROM to_display as TD, account as A '
      + 'WHERE A.account_id = TD.seller_id AND TD.arrangement_name LIKE ?';

    var val = [req.body.district_id, "%" + req.body.search_text + "%"];
  }
  else {
    var query = 'WITH to_display AS ('
      + 'SELECT arrangement_id, image_path, arrangement_name, volume, price, seller_id, details, rate, count '
      + 'FROM enabled_arrangements '
      + 'WHERE seller_id IN ( SELECT seller_id FROM seller_serves_to WHERE district_id = ?)) '
      + 'SELECT DISTINCT TD.arrangement_id, TD.image_path, TD.arrangement_name, TD.price, A.first_name, A.middle_name, A.last_name, TD.details, TD.rate, TD.count '
      + 'FROM to_display as TD, occasion as O, seller_working_time as SWT, composed_of C, account as A '
      + 'WHERE A.account_id = TD.seller_id AND SWT.seller_id = A.account_id AND TD.arrangement_id = O.arrangement_id '
      + 'AND C.arrangement_id = O.arrangement_id  ';

    var val = [req.body.district_id];

    if (req.body.day && req.body.hour) {
      var day_query = " AND SWT.day=? AND SWT.hour=? ";
      val.push(req.body.day);
      val.push(req.body.hour);
      query = query + day_query;
    }

    if (req.body.occasions && req.body.occasions.length > 0) {
      var occasion_query = " AND ( occasion_name=?";
      val.push(req.body.occasions[0].occasion_name);
      for (i = 1; i < req.body.occasions.length; i++) {
        occasion_query = occasion_query + " OR occasion_name=?";
        val.push(req.body.occasions[i].occasion_name);
      }
      query = query + occasion_query + ')';
    }

    if (req.body.flowers && req.body.flowers.length > 0) {
      var flower_query = " AND ( flower_id=?";
      val.push(req.body.flowers[0].flower_id);
      for (i = 1; i < req.body.flowers.length; i++) {
        flower_query = flower_query + " OR flower_id=?";
        val.push(req.body.flowers[i].flower_id);
      }
      query = query + flower_query + ')';
    }

    if (req.body.price && req.body.price.length > 0) {
      var price_query = "AND ((TD.price BETWEEN ? AND ?) ";
      val.push(req.body.price[0].lower);
      val.push(req.body.price[0].upper);

      for (i = 1; i < req.body.price.length; i++) {
        price_query = price_query + " OR (TD.price BETWEEN ? AND ?)";
        val.push(req.body.price[i].lower);
        val.push(req.body.price[i].upper);
      }
      query = query + price_query + ' )';
    }
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

  val = [result.seller_id];
  rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name FROM account  WHERE account_id = ?', val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);
  });
  result.seller = rows[0][0];

  rows = await dbconnection.promise().query('SELECT AVG(F.rate) as rating FROM seller as S, flower_arrangement as F WHERE S.account_id = F.seller_id AND S.account_id = ?', val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);
  });

  result.seller.rating = rows[0][0].rating;

  sendResponse(res, 1, 'Done.', result);

});

router.get('/seller/:id', async (req, res) => {
  var query = 'SELECT * FROM enabled_arrangements WHERE seller_id = ?';
  var val = [req.params.id];

  let rows = await dbconnection.promise().query(query, val).catch((err) => {
    console.log('Error at: ' + err);
    sendResponse(res, 0, err.sqlMessage, null);
  });
  var arrangements = rows[0];
  query = 'SELECT occasion_name FROM occasion WHERE arrangement_id = ?';

  for (i = 0; i < arrangements.length; i++) {
    val = [arrangements[i].arrangement_id]
    let rows = await dbconnection.promise().query(query, val).catch((err) => {
      console.log('Error at: ' + err);
      sendResponse(res, 0, err.sqlMessage, null);
    });
    arrangements[i].occasions = rows[0];
  }

  sendResponse(res, 1, "Done.", arrangements);


});

router.post('/create', async (req, res) => {
  var query = 'INSERT INTO flower_arrangement ( image_path, arrangement_name, volume, price, seller_id, details, rate, count, enabled) VALUES ( ? , ?, ?, ?, ?, ?, ?, ?, ? )';
  var val = [req.body.image_path, req.body.arrangement_name, req.body.volume, req.body.price, req.body.seller_id, req.body.details, 0, 0, req.body.enabled];

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
  for (i = 0; i < flowers.length; i++) {
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