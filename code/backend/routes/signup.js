var express = require('express');

var router = express.Router();

router.post('/', (req, res) => {
    var query = 'INSERT INTO account (first_name, middle_name, last_name, email, password, phone, last_login_date, account_type) VALUES (?)'
    var values = [req.body.first_name, req.body.middle_name, req.body.last_name, req.body.email, req.body.password, req.body.phone, req.body.last_login_date, req.body.account_type];
    dbconnection.query(query, [values], function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        else {
            accountId = result.insertId;
            var table = '';
            query = '';

            if (req.body.account_type == 0) {
                query = 'INSERT INTO customer (account_id, credit_card) VALUES (?)'
                values = [accountId, null];
            } else if (req.body.account_type == 1) {
                query = 'INSERT INTO courier (account_id, max_volume, iban_no) VALUES (?)'
                values = [accountId, req.body.max_volume, req.body.iban_no];
            } else if (req.body.account_type == 2) {
                query = 'INSERT INTO seller (account_id, district_id, address_text, iban_no) VALUES (?)'
                values = [accountId, req.body.district_id, req.body.address_text, req.body.iban_no];
                console.log(query);
            } else if (req.body.account_type == 3) {
                query = 'INSERT INTO customer_service (account_id, count) VALUES (?)'
                values = [accountId, req.body.count];
            } else {
                sendResponse(res, 0, 'Undefined account type.', null);
                return;
            }

            dbconnection.query(query, [values], function (err3, result3, fields3) {
                if (err) {
                    sendResponse(res, 0, 'MySQL Error: ' + err3.sqlMessage, null);
                    console.log('Error at: ' + err3.sql);
                    return;
                }
                sendResponse(res, 1, 'Inserted', { account_id: accountId });
            });
        }
    });
});

module.exports = router;
