const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const UserController = require('../controllers/user');


router.get('/',  UserController.get_admin_users);
router.get('/user',  UserController.get_all_users);
router.post('/signup', UserController.user_signup);
router.post('/login/user', UserController.user_login);

module.exports = router;