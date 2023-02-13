const express = require('express');
const router = express.Router();
const movieService = require('./MovieService');


router.get('/', async (req, res) => {
    const {limit, offset, genre, pubDate} = req.query;
    res.send(await movieService.getMovies(1, genre, pubDate, limit, offset));
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.send(await movieService.getMovieDetail(id));
});

module.exports = router;