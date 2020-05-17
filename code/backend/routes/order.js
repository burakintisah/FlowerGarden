var express = require('express');

var router = express.Router();

router.post('/', async (req, res) => {
    var val = [req.body.arrangement_id];
    var flowers;
    let rows = await dbconnection.promise().query('SELECT count, flower_id, arrangement_id FROM composed_of WHERE arrangement_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    flowers = rows[0];
    for (i = 0; i < flowers.length; ++i) {
        val = [req.body.seller_id, flowers[i].flower_id]
        rows = await dbconnection.promise().query('SELECT flower_id, stock FROM flower_stock WHERE seller_id = ?  AND flower_id = ?', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);

        });
        if (rows[0].length != 0)
            flowers[i].stock = rows[0][0].stock;
        else
            flowers[i].stock = 0;
    }
    for (i = 0; i < flowers.length; i++) {
        if (flowers[i].stock < flowers[i].count) {
            sendResponse(res, 0, "Flower stock is not enough for flower with id " + flowers[i].flower_id + ". Order is not created.", null);
            return;
        }
    }

    var query = 'INSERT INTO flowergarden.order '
        + '(payment, order_date, receiver_name, receiver_phone, district_id, address_text, '
        + 'delivery_date, delivery_type, delivery_status, desired_delivery_date, desired_delivery_time, '
        + 'message, seller_status, courier_status, seller_id, courier_id, customer_id, arrangement_id) '
        + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    var val = [req.body.payment, req.body.order_date, req.body.receiver_name, req.body.receiver_phone,
    req.body.district_id, req.body.address_text, req.body.delivery_date, req.body.delivery_type,
    req.body.delivery_status, req.body.desired_delivery_date, req.body.desired_delivery_time,
    req.body.message, req.body.seler_status, req.body.courier_status, req.body.seller_id,
    req.body.courier_id, req.body.customer_id, req.body.arrangement_id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var order_id = rows[0].insertId;

    for (i = 0; i < flowers.length; ++i) {
        val = [flowers[i].stock - flowers[i].count, req.body.seller_id, flowers[i].flower_id]
        rows = await dbconnection.promise().query('UPDATE flower_stock SET stock = ? WHERE seller_id = ? AND flower_id = ?', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
        flowers[i].stock = flowers[i].stock - flowers[i].count
    }

    val = [req.body.seller_id, "You have order with id " + order_id, new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? );', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", {order_id: order_id});
});

module.exports = router;
