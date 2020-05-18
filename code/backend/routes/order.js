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

    val = [req.body.seller_id, "You have sale with id " + order_id + ". Prepare the order.", new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", { order_id: order_id });
});

router.get('/customer/:id', async (req, res) => {
    var query = 'SELECT order_id, payment, order_date, receiver_name, receiver_phone, district_id, address_text, '
        + 'delivery_date, delivery_type, delivery_status, desired_delivery_date, desired_delivery_time, '
        + 'message, seller_status, courier_status, seller_id, courier_id, customer_id, F.arrangement_name, '
        + 'F.price FROM flowergarden.order natural join flower_arrangement as F WHERE customer_id = ?';

    var val = [req.params.id];

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var orders = rows[0];
    if (!orders || orders.length == 0) {
        sendResponse(res, 0, "No order with the given customer_id " + req.params.id, null);
        return;
    }

    for (i = 0; i < orders.length; ++i) {
        val = [orders[i].seller_id]
        rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name FROM account  WHERE account_id = ?', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
        var seller_info = rows[0][0];
        orders[i].seller = { first_name: seller_info.first_name, middle_name: seller_info.middle_name, last_name: seller_info.last_name }
    }

    for (i = 0; i < orders.length; ++i) {
        val = [orders[i].courier_id]
        rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name FROM account  WHERE account_id = ?', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
        var courier_info = rows[0][0];
        orders[i].courier = { first_name: seller_info.first_name, middle_name: seller_info.middle_name, last_name: seller_info.last_name }
    }
    sendResponse(res, 1, "Done.", orders);
});

router.get('/seller/:id', async (req, res) => {
    var query = 'SELECT O.order_id, F.arrangement_name, O.order_date, O.delivery_status, O.desired_delivery_date, O.desired_delivery_time, O.message, O.courier_id '
        + 'FROM flowergarden.order as O NATURAL JOIN flower_arrangement as F WHERE O.seller_id = ?';

    var val = [req.params.id];

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var sales = rows[0];
    if (!sales || sales.length == 0) {
        sendResponse(res, 0, "No sales with the given seller_id " + req.params.id, null);
        return;
    }

    for (i = 0; i < sales.length; ++i) {
        if (!sales[i].courier_id)
            continue;
        val = [sales[i].courier_id]
        rows = await dbconnection.promise().query('SELECT first_name, middle_name, last_name FROM account WHERE account_id = ?', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
        var courier_info = rows[0][0];
        sales[i].courier = { first_name: courier_info.first_name, middle_name: courier_info.middle_name, last_name: courier_info.last_name }
    }
    sendResponse(res, 1, "Done.", sales);
});


router.get('/courier/:id', async (req, res) => {
    var query = 'SELECT order_id, desired_delivery_date, desired_delivery_time, volume, A2.first_name, A2.middle_name, A2.last_name, A2.account_id, '
        + ' O.address_text, courier_status, delivery_status FROM flowergarden.order AS O, account AS A, '
        + ' flower_arrangement AS F, seller AS S, account as A2 WHERE courier_id = ? AND O.courier_id = A.account_id '
        + ' AND F.arrangement_id = O.arrangement_id AND S.account_id = F.seller_id AND A2.account_id = S.account_id';

    var val = [req.params.id];

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var deliveries = rows[0];
    if (!deliveries || deliveries.length == 0) {
        sendResponse(res, 0, "No deliveries with the given courier_id " + req.params.id, null);
        return;
    }

    for (i = 0; i < deliveries.length; ++i) {
        if (!deliveries[i].account_id)
            continue;
        deliveries[i].seller = { first_name: deliveries[i].first_name, middle_name: deliveries[i].middle_name, last_name: deliveries[i].last_name }
        deliveries[i].first_name = undefined;
        deliveries[i].last_name = undefined;
        deliveries[i].middle_name = undefined;
        deliveries[i].seller_id = deliveries[i].account_id;
        deliveries[i].account_id = undefined;

    }

    sendResponse(res, 1, "Done.", deliveries);
});


router.get('/:id', async (req, res) => {
    var query = 'SELECT *'
        + 'FROM flowergarden.order NATURAL JOIN flower_arrangement WHERE order_id = ?';

    var val = [req.params.id];

    let rows = await dbconnection.promise().query(query, val).catch((err) => {
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

    sendResponse(res, 1, "Done.", order);

});

router.get('/:id/seller/accept', async (req, res) => {
    var query = 'UPDATE flowergarden.order SET seller_status = "Accepted" WHERE order_id = ?';

    var val = [req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (rows[0].affectedRows <= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }

    rows = await dbconnection.promise().query('SELECT customer_id FROM flowergarden.order WHERE order_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    

    val = [rows[0][0].customer_id, "Your order with id " + req.params.id + " is accepted by the seller.", new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);
});

router.get('/:id/seller/reject', async (req, res) => {
    var query = 'SELECT seller_id, customer_id, arrangement_id FROM flowergarden.order WHERE order_id = ?';

    var val = [req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (!rows || rows[0].length<= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }

    var arrangement_id = rows[0][0].arrangement_id;
    var seller_id = rows[0][0].seller_id;
    var customer_id = rows[0][0].customer_id;

    query = 'SELECT count, flower_id, arrangement_id FROM composed_of  WHERE arrangement_id = ?';
    val = [arrangement_id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var flowers = rows[0];

    query = 'UPDATE flower_stock SET stock = stock + ? WHERE flower_id = ? AND seller_id = ?';

    for (i = 0; i < flowers.length; i++) {
        val = [flowers[i].count, flowers[i].flower_id, seller_id];
        rows = await dbconnection.promise().query(query, val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
    }

    query = 'DELETE FROM flowergarden.order WHERE order_id = ?';
    val = [req.params.id];
    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    query = 'INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )';
    val = [customer_id, 'Your order is rejected.', new Date().toISOString().slice(0, 19).replace('T', ' ')];
    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);
});


router.post('/:id/seller/assign', async (req, res) => {

    var query = 'UPDATE flowergarden.order SET courier_status = "Pending", courier_id = ? WHERE order_id = ?';

    var val = [req.body.courier_id, req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (rows[0].affectedRows <= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }

    query = 'INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )';
    val = [req.body.courier_id, 'You are assigned to a delivery with id ' + req.params.id + ".", new Date().toISOString().slice(0, 19).replace('T', ' ')];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);
});

router.get('/:id/seller/assign', async (req, res) => {

    var query = 'SELECT district_id, desired_delivery_date, desired_delivery_time, volume FROM flowergarden.order '
        + ' NATURAL JOIN flower_arrangement WHERE order_id = ?';

    var val = [req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (!rows || rows[0].length <= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }
    var data = rows[0][0];

    var date = new Date(data.desired_delivery_date + "T" + data.desired_delivery_time);
    var dayNo = date.getDay();
    var hour = date.getHours();

    var day;
    switch (dayNo) {
        case 1: day = 'mon'; break;
        case 2: day = 'tue'; break;
        case 3: day = 'wed'; break;
        case 4: day = 'thr'; break;
        case 5: day = 'fri'; break;
        case 6: day = 'sat'; break;
        case 0: day = 'sun'; break;
        default: day = null;
    }

    console.log(day + " " + hour);

    var query = 'SELECT C.account_id, A.first_name, A.middle_name, A.last_name FROM courier as C, '
        + ' courier_serves_to as CST, courier_working_time as CWT, account as A WHERE C.account_id = A.account_id '
        + ' AND CST.courier_id = A.account_id AND CWT.courier_id = A.account_id AND CWT.day = ? '
        + ' AND CWT.hour = ? AND CST.district_id = ? AND ? < C.max_volume';

    var val = [day, hour, data.district_id, data.volume];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", rows[0]);
});

router.get('/:id/seller/on_delivery', async (req, res) => {

    var query = 'UPDATE flowergarden.order SET delivery_status = "On Delivery" WHERE order_id = ?';

    var val = [req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (rows[0].affectedRows <= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }

    rows = await dbconnection.promise().query('SELECT customer_id FROM flowergarden.order WHERE order_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    val = [rows[0][0].customer_id, "Your order with id " + req.params.id + " is on delivery.", new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);
});

router.get('/:id/courier/accept', async (req, res) => {
    var query = 'UPDATE flowergarden.order SET courier_status = "Accepted" WHERE order_id = ?';

    var val = [req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (rows[0].affectedRows <= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }

    rows = await dbconnection.promise().query('SELECT seller_id FROM flowergarden.order WHERE order_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    val = [rows[0][0].seller_id, "Your courier assignment is accepted for sale with id " + req.params.id  + ".", new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);
});

router.get('/:id/courier/delivered', async (req, res) => {
    var query = 'UPDATE flowergarden.order SET delivery_status = "Delivered" WHERE order_id = ?';

    var val = [req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (rows[0].affectedRows <= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }

    rows = await dbconnection.promise().query('SELECT seller_id, customer_id FROM flowergarden.order WHERE order_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    var customer_id = rows[0][0].customer_id;
    val = [rows[0][0].seller_id, "Your sale with id " + req.params.id  + " is delivered.", new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    val = [customer_id, "Your order with id " + req.params.id  + " is delivered.", new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    sendResponse(res, 1, "Done.", null);
});

router.get('/:id/courier/reject', async (req, res) => {
    var query = 'UPDATE flowergarden.order SET courier_id = NULL, courier_status = "Not Assigned" WHERE order_id = ?';

    var val = [req.params.id];

    rows = await dbconnection.promise().query(query, val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    if (rows[0].affectedRows <= 0) {
        sendResponse(res, 0, "Invalid order_id.", null);
        return;
    }

    rows = await dbconnection.promise().query('SELECT seller_id FROM flowergarden.order WHERE order_id = ?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    val = [rows[0][0].seller_id, "Your courier assignment is rejected for sale with id " + req.params.id  + ". Please assign again.", new Date().toISOString().slice(0, 19).replace('T', ' ')]
    rows = await dbconnection.promise().query('INSERT INTO notification(account_id, description, timestamp) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });


    sendResponse(res, 1, "Done.", null);
});


module.exports = router;
