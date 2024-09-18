const router = require('express').Router({
	mergeParams: true,
});
const UserController = require('../controllers/connexion');

// router.get('/', UserController.index);
router.get('/', UserController.verify);
router.post('/login', UserController.login);


module.exports = router;