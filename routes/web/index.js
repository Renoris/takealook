const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/account', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'account.html');
  res.status(200);
  res.sendFile(filePath);
})

router.get('/mylist', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'mylist.html');
  res.status(200);
  res.sendFile(filePath);
})

router.get('/myinformation', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'myinformation.html');
  res.status(200);
  res.sendFile(filePath);
})

router.get('/index', function (req, res) {
  const filePath = path.join(__dirname,'..','..','public', 'index.html');
  res.status(200);
  res.sendFile(filePath);
})
module.exports = router;