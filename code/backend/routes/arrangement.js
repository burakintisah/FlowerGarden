var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
  var query = 'WITH to_display AS ('
    + 'SELECT arrangement_id, image_path, arrangement_name, volume, price, seller_id, details, rate, count '
    + 'FROM flower_arrangement '
    + 'WHERE seller_id IN ( SELECT seller_id FROM seller_serves_to WHERE district_id = ?)) '
    + 'SELECT DISTINCT TD.arrangement_id, TD.image_path, TD.arrangement_name, TD.price, A.first_name, A.last_name, TD.details, TD.rate, TD.count '
    + 'FROM to_display as TD natural join occasion as O, seller_working_time as SWT, composed_of C, account as A '
    + 'WHERE TD.arrangement_id = O.arrangement_id AND SWT.day=? AND SWT.hour=? AND A.account_id = TD.seller_id';

  var val = [req.body.district_id, req.body.day, req.body.hour];

  if (req.body.occasions && req.body.occasions.length > 0) {
    var occasion_query = " AND occasion_name=?";
    val.push(req.body.occasions[0].occasion_name);
    for (i = 1; i < req.body.occasions.length; i++) {
      occasion_query = " OR occasion_name=?";
      val.push(req.body.occasions[i].occasion_name);
    }
    query = query + occasion_query
  }

  if (req.body.flowers && req.body.flowers.length > 0) {
    var flower_query = " AND flower_id=?";
    val.push(req.body.flowers[0].flower_id);
    for (i = 1; i < req.body.flowers.length; i++) {
      flower_query = " OR flower_id=?";
      val.push(req.body.flowers[i].flower_id);
    }
    query = query + flower_query
  }


  // var query = 'WITH to_display AS (' 
  //             + 'SELECT arrangement_id, image_path, arrangement_name, volume, price, seller_id, details, rate, count '
  //             + 'FROM flower_arrangement ' 
  //             + 'WHERE seller_id IN ( SELECT seller_id FROM seller_serves_to WHERE district_id = ?)) '
  //             + 'SELECT TD.arrangement_id, TD.image_path, TD.arrangement_name, TD.price, A.first_name, A.last_name, TD.details, TD.rate, TD.count '
  //             + 'FROM to_display as TD, occasion as O, seller_working_time as SWT, composed_of C, account as A '
  //             + 'WHERE TD.arrangement_id = O.arrangement_id AND O.occasion_name = ? AND  SWT.day=? AND SWT.hour=? AND C.count=? AND C.flower_id=? AND A.account_id = TD.seller_id;'

  dbconnection.query(query, val, function (err, result, fields) {
    if (err) {
      sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
      console.log('Error at: ' + err.sql);
      return;
    }
    sendResponse(res, 1, 'Done.', result);
  });
});

module.exports = router;