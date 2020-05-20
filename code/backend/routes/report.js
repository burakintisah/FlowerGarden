var express = require('express');

var router = express.Router();

router.get('/seller/:id', (req, res) => {
    var val = [req.params.id]
    var query = 'SELECT district_id, min(order_date) as first_order, count(order_id) as number_of_orders, '
        + ' sum(price) as total_revenue, avg(price) as average_revenue, avg(rate) as average_rate FROM flowergarden.order '
        + ' NATURAL JOIN flower_arrangement WHERE seller_id = ? GROUP BY district_id ORDER BY average_revenue';

    dbconnection.query(query, val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result[0]);
        else
            sendResponse(res, 0, 'The seller doesn\'t have any order yet', null);

    });
});

module.exports = router;
