var express = require('express');

var router = express.Router();

router.get('/:id', (req, res) => {
    val = [req.params.id]
    dbconnection.query('SELECT A.first_name, A.middle_name, A.last_name, A.email, A.phone, A.last_login_date, A.account_type FROM account as A WHERE A.account_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result[0]);
        else
            sendResponse(res, 0, 'Incorrect account_id.', null);

    });
});

router.get('/customer/:id', (req, res) => {
    val = [req.params.id]
    dbconnection.query('SELECT * FROM customer WHERE  account_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result[0]);
        else
            sendResponse(res, 0, 'Incorrect account_id.', null);

    });
});

router.get('/customer/:id/saved_addresses/', (req, res) => {
    val = [req.params.id]
    dbconnection.query('SELECT * FROM saved_addresses WHERE customer_id = ?', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        if (result.length > 0)
            sendResponse(res, 1, 'Done.', result);
        else
            sendResponse(res, 0, 'Incorrect account_id.', null);

    });
});

router.post('/customer/:id/credit_card', (req, res) => {
    val = [req.body.credit_card, req.params.id];
    dbconnection.query('UPDATE customer SET credit_card=? WHERE account_id=? ', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', null);
    });
});

router.post('/customer/:id/saved_addresses', (req, res) => {
    val = [req.body.address, req.body.district_id, req.body.customer_id];
    dbconnection.query('INSERT INTO saved_addresses (address, district_id, customer_id) VALUES (? , ?, ?)', val, function (err, result, fields) {
        if (err) {
            sendResponse(res, 0, 'MySQL Error: ' + err.sqlMessage, null);
            console.log('Error at: ' + err.sql);
            return;
        }
        sendResponse(res, 1, 'Done.', null);
    });
});

router.get('/seller/:id', async (req, res) => {
    val = [req.params.id];
    let rows = await dbconnection.promise().query('SELECT district_id, district_name, province_id, province_name FROM seller_serves_to NATURAL JOIN province NATURAL JOIN district WHERE seller_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var result = { districts: rows[0] };

    rows = await dbconnection.promise().query('SELECT hour, day FROM seller_working_time WHERE seller_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });


    result.working_times = rows[0];

    sendResponse(res, 1, "Done.", result);

});

router.get('/seller/:id/district_hour', async (req, res) => {
    val = [req.params.id];
    let rows = await dbconnection.promise().query('SELECT district_id, district_name, province_id, province_name FROM seller_serves_to NATURAL JOIN province NATURAL JOIN district WHERE seller_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var result = { districts: rows[0] };

    rows = await dbconnection.promise().query('SELECT hour, day FROM seller_working_time WHERE seller_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });


    result.working_times = rows[0];

    sendResponse(res, 1, "Done.", result);

});

router.post('/seller/:id/district_hour', async (req, res) => {

    var val = [req.params.id];
    let rows = await dbconnection.promise().query('DELETE FROM seller_serves_to WHERE seller_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var districts = req.body.districts;

    for (i = 0; i < districts.length; i++) {
        val = [districts[i].district_id, req.params.id];
        rows = await dbconnection.promise().query('INSERT INTO seller_serves_to  (district_id, seller_id) VALUES ( ?, ? )', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
    }

    val = [req.params.id];
    rows = await dbconnection.promise().query('DELETE FROM seller_working_time WHERE seller_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var working_times = req.body.working_times;

    for (i = 0; i < working_times.length; i++) {
        val = [working_times[i].hour, working_times[i].day, req.params.id];
        rows = await dbconnection.promise().query('INSERT INTO seller_working_time  (hour, day, seller_id) VALUES ( ? , ? , ? )', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
    }

    sendResponse(res, 1, "Done.", null);

});

router.get('/courier/:id/district_hour', async (req, res) => {
    val = [req.params.id];
    let rows = await dbconnection.promise().query('SELECT district_id, district_name, province_id, province_name FROM courier_serves_to NATURAL JOIN province NATURAL JOIN district WHERE courier_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var result = { districts: rows[0] };

    rows = await dbconnection.promise().query('SELECT hour, day FROM courier_working_time WHERE courier_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });


    result.working_times = rows[0];

    sendResponse(res, 1, "Done.", result);

});

router.post('/courier/:id/district_hour', async (req, res) => {

    var val = [req.params.id];
    let rows = await dbconnection.promise().query('DELETE FROM courier_serves_to WHERE courier_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var districts = req.body.districts;

    for (i = 0; i < districts.length; i++) {
        val = [districts[i].district_id, req.params.id];
        rows = await dbconnection.promise().query('INSERT INTO courier_serves_to  (district_id, courier_id) VALUES ( ?, ? )', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
    }

    val = [req.params.id];
    rows = await dbconnection.promise().query('DELETE FROM courier_working_time WHERE courier_id=?', val).catch((err) => {
        console.log('Error at: ' + err);
        sendResponse(res, 0, err.sqlMessage, null);
    });

    var working_times = req.body.working_times;

    for (i = 0; i < working_times.length; i++) {
        val = [working_times[i].hour, working_times[i].day, req.params.id];
        rows = await dbconnection.promise().query('INSERT INTO courier_working_time  (hour, day, courier_id) VALUES ( ? , ? , ? )', val).catch((err) => {
            console.log('Error at: ' + err);
            sendResponse(res, 0, err.sqlMessage, null);
        });
    }

    sendResponse(res, 1, "Done.", null);

});

module.exports = router;
