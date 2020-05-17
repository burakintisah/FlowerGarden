var express = require('express');

var router = express.Router();

router.post('/create', (req, res) => {
    var val = [req.body.order_id, req.body.complaint_date, req.body.customer_service_id, req.body.response_date, req.body.complaint_status];
    var query = 'INSERT INTO complaint (order_id, complaint_date, customer_service_id, response_date, complaint_status) '
        + ' VALUES ( ?, ?, ?, ?, ?)';
    
    dbconnection.query(query, val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', {complaint_id:result.insertId, order_id:req.body.order_id });
    });
});

module.exports = router;
