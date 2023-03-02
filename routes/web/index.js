const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/account', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'account.html');
  res.sendFile(filePath);
})
router.get('/search', (req, res) => {
  const filePath = path.join(__dirname,'..','..','public', 'search.html');
  res.sendFile(filePath);
})

router.get('/mylist', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'mylist.html');
  res.sendFile(filePath);
})

router.get('/myinformation', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'myinformation.html');
  res.sendFile(filePath);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname,'..','..' ,'public', 'index.html');
  res.status(200);
  res.headers = {
    'Content-Type' : 'text/html'
  }
  res.sendFile(filePath);
});


module.exports = router;