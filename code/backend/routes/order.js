var express = require('express');

var router = express.Router();

router.post('/', async (req, res) => {
    var val = [req.body.arrangement_id];
    var flowers;
    let rows = await dbconnection.promise().query('SELECT count, flower_id, arrangement_id FROM composed_of WHERE arrangement_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
    });

    flowers = rows[0];
    var val = [req.body.arrangement_id, flowers[0].flower_id]
    rows = await dbconnection.promise().query('SELECT flower_id, stock FROM flower_stock WHERE seller_id = ?  AND flower_id = ?', val).catch(sendResponse(res, 0, 'MySQL Error', null));
    console.log(rows);

    // for (i = 0; i < flowers.length; ++i) {
    //     var val = [req.body.arrangement_id, flowers[i].flower_id]
    //     rows = await dbconnection.promise().query('SELECT flower_id, stock FROM flower_stock WHERE seller_id = ?  AND flower_id = ?', val, function (err, result, fields) {
    //         if (err) {
    //             sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
    //             console.log('Error at: ' + err.sql);
    //             return;
    //         }
    //     });
    //     sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, rows[0]);

    // }

    // console.log(stocks);
    // sendResponse(res, 1, 'Done.', { order_id: 1 });

    // var query = 'INSERT INTO flowergarden.order '
    //     + '(payment, order_date, receiver_name, receiver_phone, district_id, address_text, '
    //     + 'delivery_date, delivery_type, delivery_status, desired_delivery_date, desired_delivery_time, '
    //     + 'message, seller_status, courier_status, seller_id, courier_id, customer_id, arrangement_id) '
    //     + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // var val = [req.body.payment, req.body.order_date, req.body.receiver_name, req.body.receiver_phone,
    // req.body.district_id, req.body.address_text, req.body.delivery_date, req.body.delivery_type,
    // req.body.delivery_status, req.body.desired_delivery_date, req.body.desired_delivery_time,
    // req.body.message, req.body.seler_status, req.body.courier_status, req.body.seller_id,
    // req.body.courier_id, req.body.customer_id, req.body.arrangement_id];

    // dbconnection.query(query, val, function (err, result, fields) {
    //     if (err) {
    //         sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
    //         console.log('Error at: ' + err.sql);
    //         return;
    //     }

    //     sendResponse(res, 1, 'Done.', { order_id: result.insertId });
    // });
});

module.exports = router;
