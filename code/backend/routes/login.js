var express = require('express');

var router = express.Router();

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  dbconnection.query('SELECT * FROM Account ', function(err, data){
    if(err)
      res.send(err);
    else
      res.json(data);
    console.log(res.data);

  });
});

router.post('/', (req, res) => {
  dbconnection.query('SELECT * FROM Account WHERE Account.email=\'' + req.body.email +'\'', function(err, data){
    if(err)
      res.send(err);
    else {
      if (data.length != 0) {
        if (data[0].password == req.body.password) {
          res.json({status:1, message:'Logged in.', data:data[0]});
        }
        else
          res.json({status:0, message:'Password is incorrect.'});
      }
      else {
        res.json({status:0, message:'Email is incorrect.'});
      }
    }
  });
  //console.log(res.body);
});

module.exports = router;
