const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const {userProfile } = require("../controllers/auth");
const {allUsers, singleUser, editUser, deleteUser}= require('../controllers/userController');

router.get('/admin/isAdmin',  isAuthenticated, isAdmin, userProfile);
router.get('/allusers', isAuthenticated, isAdmin, allUsers);
router.put('/admin/user/edit/:id', isAuthenticated, isAdmin, editUser);
router.put('/user/dashboard/edit/:id', isAuthenticated, editUser);
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

module.exports = router;