const router = require('express').Router();

//IMPORT SUB ROUTES
const users = require('./user');
const posts = require('./post');
const connexion = require('./connexion');
const features = require('./feature');


router.use('/users', users);
router.use('/posts', posts);
router.use('/auth', connexion);
router.use('/features', features);


module.exports = router;