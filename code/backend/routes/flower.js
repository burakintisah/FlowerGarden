var express = require('express');

var router = express.Router();

router.get('/stock/:sellerId/:flowerId', (req, res, next) => {
    var val = [req.params.sellerId, req.params.flowerId];
    dbconnection.query('SELECT flower_id, stock FROM flower_stock WHERE seller_id = ?  AND flower_id =?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', result[0]);
    });
});

router.post('/stock/:id', async (req, res) => {
    var val = [req.params.id, req.body.flower_id];
    let rows = await dbconnection.promise().query('DELETE FROM flower_stock WHERE seller_id=? AND flower_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });


    val = [req.body.flower_id, req.params.id, req.body.stock];
    rows = await dbconnection.promise().query('INSERT INTO flower_stock (flower_id, seller_id, stock) VALUES ( ? , ? , ? )', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });
    sendResponse(res, 1, "Done.", null);
});

router.get('/', (req, res, next) => {
    dbconnection.query('SELECT * FROM flower', function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', result);
    });
});

module.exports = router;
