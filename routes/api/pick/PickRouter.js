const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const movieService = require('./PickService');


router.get('/', async (req, res) => {
    try {
        const {authId, movieId} = req.body;
        const result = await movieService.getPickMovies(authId);
        responseHandler.setIsOkToJson(res);
        res.send(result);
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.post('/:movieId', async (req, res) => {
    try {
        const {authId, movieId} = req.body;
        await movieService.pickMovie(authId, movieId);
        responseHandler.setIsOkToJson(res);
        res.send({message:"success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.delete('/:movieId', async (req, res) => {
    try {
        const {authId, movieId} = req.body;
        await movieService.deletePick(authId, movieId);
        responseHandler.setIsOkToJson(res);
        res.send({message:"success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

module.exports = router;