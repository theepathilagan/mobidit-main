const router = require('express').Router({
	mergeParams: true,
});
const UserController = require('../controllers/user');

router.get('/', UserController.index);
router.get('/:username', UserController.show);
router.post('/create', UserController.create);
router.put('/:username/update', UserController.update);
router.delete('/:username/delete', UserController.supprimer);

module.exports = router;