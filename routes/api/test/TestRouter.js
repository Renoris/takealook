const express = require('express');
const memberService = require("../member/MemberService");
const responseHandler = require("../../../util/response/ResponseHandler");
const memberStorage = require("../member/MemberStorage");
const router = express.Router();

router.get('/', (req, res) => {
    res.send({message:'success'});
})

router.post("/",  (req, res) => {
    try {
        const {email, firstName, lastName, gender, nickName} = req.body;
        if (!email) throw Error ("이메일이 없습니다.")
        if (!firstName) throw Error ("이름이 없습니다.")
        if (!lastName) throw Error ("이름_성이 없습니다.")
        if (!gender) throw Error ("성별이 없습니다.")
        if (!nickName) throw Error ("닉네임이 없습니다.")

        res.status(200);
        res.send({message:"success"})
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

module.exports = router;