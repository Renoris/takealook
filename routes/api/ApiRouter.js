const express = require('express');
const router = express.Router();
const authRouter = require('./auth/AuthRouter');
const movieRouter = require('./movie/MovieRouter');
const {accessFilter} = require('../filter/JwtFilter');
const memberRouter = require('./member/MemberRouter');
const testRouter = require('./test/TestRouter');
const signUpRouter = require('./member/SignUpRouter');
const pickRouter = require('/pick/PickRouter');

//jwt 필요없음
router.use('/auth', authRouter);
router.use('/movie', movieRouter);
router.use('/signup', signUpRouter);
router.use('/test', testRouter);
//이 아래로 jwt 필요
//req.body.authId 에 유저 id 첨가
router.use(accessFilter);

router.use('/member', memberRouter);
router.use('/pick', pickRouter);
module.exports = router;