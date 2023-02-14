const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  const filePath = path.join(__dirname,'..', 'public', 'index.html');
  res.sendFile(filePath);
});

router.get('/mainpage', function(req, res, next) {
  const filePath = path.join(__dirname, '..', 'public', 'mainpage.html');
  res.sendFile(filePath);
});

router.get('/api/hello', function(req, res, next) {
  res.send({
    array:
    [{title : '게시글제목1', creator: '누군가1'}, {title : '게시글제목2', creator: '누군가2'}]
  });
});



module.exports = router;