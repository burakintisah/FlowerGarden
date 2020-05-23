var express = require('express');

var router = express.Router();

router.get('/seller/:id', (req, res) => {
    val = [req.params.id]
    dbconnection.query('SELECT AVG(F.rate) FROM seller as S, flower_arrangement as F WHERE S.account_id = F.seller_id AND S.account_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result[0]);
        else
            sendResponse(res, 0, 'Incorrect seller_id.', null);
    });
});

module.exports = router;
