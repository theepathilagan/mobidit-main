const router = require('express').Router({
	mergeParams: true,
});
const UserController = require('../controllers/post');

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.get('/feed/:username', UserController.showUser);
router.post('/create', UserController.create);
router.put('/:id/update', UserController.update);
router.delete('/:id/delete', UserController.supprimer);

module.exports = router;