const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/account', function (req, res) {
  const filePath = path.join(__dirname,'..','..','views', 'account.html');
  res.status(200);
  res.sendFile(filePath);
})

router.get('/mylist', function (req, res) {
  const filePath = path.join(__dirname,'..','..','views', 'mylist.html');
  res.status(200);
  res.sendFile(filePath);
})

router.get('/myinformation', function (req, res) {
  const filePath = path.join(__dirname,'..','..','views', 'myinformation.html');
  res.status(200);
  res.sendFile(filePath);
})

router.get('/shared_list', function (req, res) {
  res.redirect('/error');
})

router.get('/shared_list/:bucketId', function (req, res) {
  const filePath = path.join(__dirname,'..','..','views', 'shared_list.html');
  console.log(5235);
  res.status(200);
  res.sendFile(filePath);
})

router.get('/', function (req, res) {
  const filePath = path.join(__dirname,'..','..','views', 'index.html');
  res.status(200);
  res.sendFile(filePath);
})
module.exports = router;