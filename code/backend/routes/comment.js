var express = require('express');

var router = express.Router();

router.post('/', (req, res) => {
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

router.post('/create', async (req, res) => {
    var query = 'INSERT INTO comment(description, customer_id, date, rating, arrangement_id) '
        + 'VALUES ( ? , ? , ? , ? , ? )';

    var val = [req.body.description, req.body.customer_id, req.body.date, req.body.rating, req.body.arrangement_id];

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var comment_id = rows[0].insertId;

    query = 'SELECT rate FROM flower_arrangement WHERE arrangement_id = ? ';

    val = [req.body.arrangement_id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", {comment_id:comment_id});
});

module.exports = router;
