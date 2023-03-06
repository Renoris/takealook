const express = require('express');
const router = express.Router();
const movieService = require('./MovieService');
const statusBuilder = require('../../../util/response/ResponseHandler');
const jwtUtil = require('../../../util/jwt/JwtUtils');

router.get('/', async (req, res) => {
    try {
        const {genre, pubDate, query, limit, offset} = req.query;
        const {authorization} = req.headers;

        console.log(genre);
        console.log(pubDate);

        let result;
        if (authorization) {
            const token = jwtUtil.resolveToken(authorization);
            const auth = jwtUtil.verify(token);
            result = await movieService.getMovies(auth.id, genre, pubDate, query ,limit, offset);
        } else {
            result = await movieService.getMovies(undefined, genre, pubDate,query , limit, offset);
        }

        statusBuilder.setIsOkToJson(res);
        res.send(result);
    } catch (error) {
        statusBuilder.badRequest(res, error.msg);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params?.id;
        const movieDetail = await movieService.getMovieDetail(id);
        statusBuilder.setIsOkToJson(res);
        res.send(movieDetail);
    } catch (error) {
        statusBuilder.badRequest(res);
    }

});

module.exports = router;