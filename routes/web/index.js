const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname,'..','..' ,'public', 'index.html');
  res.sendFile(filePath);
});

router.get('/mylist', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'mylist.html');
  res.sendFile(filePath);
})


module.exports = router;