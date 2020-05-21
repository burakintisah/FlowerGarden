var express = require('express');

var router = express.Router();

router.post('/create', (req, res) => {
    var val = [req.body.order_id, req.body.complaint_date, 28, null, "Waiting", req.body.complaint_text];
    var query = 'INSERT INTO complaint (order_id, complaint_date, customer_service_id, response_date, complaint_status, complaint_text) '
        + ' VALUES ( ?, ?, ?, ?, ?, ?)';

    dbconnection.query(query, val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', { complaint_id: result.insertId, order_id: req.body.order_id });
    });
});

router.get('/', async (req, res) => {
    var val = [req.query.complaint_id, req.query.order_id];
    var query = 'SELECT complaint_date, complaint_status, customer_service_id, response_date FROM complaint WHERE complaint_id= ? AND order_id= ?';

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var result = rows[0][0];
    if (!result || result == "") {
        sendResponse(res, 0, "No complaint with the given order_id and complaint_id.", null);
        return;
    }

    query = 'SELECT *'
        + 'FROM flowergarden.order NATURAL JOIN flower_arrangement NATURAL JOIN district NATURAL JOIN province WHERE order_id = ?';

    val = [req.query.order_id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var order = rows[0][0];
    if (!order || order == "") {
        sendResponse(res, 0, "No order with the given order_id " + req.params.id, null);
        return;
    }

    val = [order.seller_id]
    rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name, phone, email, address_text, district_name FROM account NATURAL JOIN seller NATURAL JOIN district WHERE account_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    order.seller = rows[0][0];

    val = [order.courier_id];
    rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name, phone, email FROM account WHERE account_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    order.courier = rows[0][0];

    if (!order.courier){
        order.courier = {};
        order.courier.first_name = null;
        order.courier.last_name = null;
        order.courier.middle_name = null;
        order.courier.phone = null;
        order.courier.email = null;
    }

    val = [order.customer_id];
    rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name, phone, email FROM account WHERE account_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    order.customer = rows[0][0];

    result.order = order;
    sendResponse(res, 1, "Done.", result);

});

router.get('/account/:id', async (req, res) => {
    var val = [req.params.id];
    var query = 'SELECT C.complaint_id, C.complaint_date, C.complaint_status, O.order_id, A1.email as customer_email, '
        + ' A2.email as seller_email FROM complaint as C NATURAL JOIN flowergarden.order as O, '
        + ' account as A1, account as A2 WHERE O.customer_id = A1.account_id AND '
        + ' O.seller_id = A2.account_id AND customer_service_id = 4';

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var result = rows[0];
    sendResponse(res, 1, "Done.", result);
});

router.get('/replied', async (req, res) => {
    var val = [req.query.complaint_id, req.query.order_id];;
    var query = 'UPDATE complaint SET complaint_status = "Replied" WHERE complaint_id = ? AND order_id = ?'

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);

});

router.get('/solved', async (req, res) => {
    var val = [req.query.complaint_id, req.query.order_id];;
    var query = 'UPDATE complaint SET complaint_status = "Solved" WHERE complaint_id = ? AND order_id = ?'

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);

});





module.exports = router;
