const express = require('express');
const router = express.Router();
const movieService = require('./MovieService');
const statusBuilder = require("../../../util/response/ResponseHandler");

router.get('/', async (req, res) => {
    try {
        const {limit, offset, genre, pubDate} = req.query;
        statusBuilder.setIsOkToJson(res);
        res.send(await movieService.getMovies(1, genre, pubDate, limit, offset));
    } catch (error) {
        statusBuilder.badRequest(res);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        if (id) statusBuilder.badRequest(res);
        statusBuilder.setIsOkToJson(res);
        res.send(await movieService.getMovieDetail(id));
    } catch (error) {
        statusBuilder.badRequest(res);
    }

});

module.exports = router;