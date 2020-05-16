var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    var query = 'SELECT * FROM comment '
    if (req.body.arrangement_id || req.body.customer_id)
        query = query + "WHERE ";

    val = [];
    if (req.body.arrangement_id) {
        query = query + "arrangement_id=? ";
        val.push(req.body.arrangement_id);
        if (req.body.customer_id)
            query = query + "AND "
    }

    if (req.body.customer_id) {
        query = query + "customer_id=?";
        val.push(req.body.customer_id);
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

module.exports = router;
