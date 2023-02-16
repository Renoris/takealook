const express = require('express');
const router = express.Router();
const authRouter = require('./auth/AuthRouter');
const movieRouter = require('./movie/MovieRouter');
const {accessFilter} = require('../../filter/JwtFilter');
const memberRouter = require('./member/MemberRouter')


//jwt 필요없음
router.use('/auth', authRouter);
router.use('/movie', movieRouter);

//이 아래로 jwt 필요
//req.body.authId 에 유저 id 첨가
router.use(accessFilter);
router.use('/member', memberRouter);


module.exports = router;