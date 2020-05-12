var express = require('express');

var router = express.Router();

/* GET accounts listing. */
router.get('/', function(req, res, next) {
  dbconnection.query('SELECT * FROM Account', function(err, data){
    if(err)
      res.send(err);
    else
      res.json({accounts: data});
  });
});

router.post('/', (req, res) => {
  console.log(req.body)
});

module.exports = router;
