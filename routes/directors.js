const router = require('express').Router();

// Controllers
const DirectorsController = require('../controllers/DirectorsController');

router.get('/', DirectorsController.getAllDirectors);
router.get('/:director_id', DirectorsController.getDirectorDetails);
router.post('/', DirectorsController.createNewDirector);
router.put('/:director_id', DirectorsController.updateDirectorById);
router.delete('/:director_id', DirectorsController.deleteDirectorById);

module.exports = router;