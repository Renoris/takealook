const express = require('express');
const router = express.Router();
const movieService = require('./MovieService');
const statusBuilder = require("../../../util/response/ResponseBuilder");

router.get('/', async (req, res) => {
    try {
        const {limit, offset, genre, pubDate} = req.query;
        res.status(200);
        res.header({
            'Content-Type' : contentType.json
        });
        res.send(await movieService.getMovies(1, genre, pubDate, limit, offset));
    } catch (error) {
        res.status(400);
        res.send({message : 'request is bad'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        res.header({
            'Content-Type' : contentType.json
        });
        res.status(200);
        res.send(await movieService.getMovieDetail(id));
    } catch (error) {
        res.status(400);
        res.send({message : 'request is bad'});
    }

});

module.exports = router;