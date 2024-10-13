const router = require('express').Router();

// Controllers
const MoviesController = require('../controllers/MoviesController');

router.get('/', MoviesController.getAllMovies);
router.get('/top3', MoviesController.getTop3Movies);
router.get('/between/:start_year/:end_year', MoviesController.getMoviesBetweenStartYearEndYear);
router.get('/:movie_id', MoviesController.getMoviesById);
router.put('/:movie_id', MoviesController.updateMoviesByID);
router.delete('/:movie_id', MoviesController.deleteMoviesById);
router.post('/', MoviesController.createMovies);

module.exports = router;
