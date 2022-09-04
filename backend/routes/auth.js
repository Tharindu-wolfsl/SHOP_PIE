const express=require('express');
const router=express.Router();
const {registerUser,
     loginUser,
     logoutUser,
     forgotPassword,
     resetPassword,
      getCurrentUser,
       updatePassword,
        updateUserProfile,
        getAllUsers,
        getUser,
    updateUser,
deleteUser}=require('../controllers/authControllers')


const {isUserAuthenticated,authorizeRoles} = require('../middlewares/auth')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(logoutUser)

router.route('/me').get(isUserAuthenticated,getCurrentUser)
router.route('/password/update').put(isUserAuthenticated,updatePassword)
router.route('/me/update').put(isUserAuthenticated,updateUserProfile)

router.route('/admin/users').get(isUserAuthenticated,authorizeRoles('admin'),getAllUsers)
router.route('/admin/user/:id').get(isUserAuthenticated,authorizeRoles('admin'),getUser)
.put(isUserAuthenticated,authorizeRoles('admin'),updateUser)
router.route('/admin/user/delete/:id').get(isUserAuthenticated,authorizeRoles('admin'),deleteUser)


module.exports = router