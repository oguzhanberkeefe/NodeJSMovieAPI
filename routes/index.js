const router = require('express').Router();

// Controllers
const IndexController = require('../controllers/IndexController');

router.get('/', IndexController.getIndexPage);
router.post('/register', IndexController.registerUser);
router.post('/login', IndexController.loginUser);

module.exports = router;
