const express = require('express');
const router = express.Router();

router.get("/",  (req, res) => {
    console.log('a');
    console.log(req.body.authId);
})

module.exports = router;