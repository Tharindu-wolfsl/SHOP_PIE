const express=require('express')
const router=express.Router()
const {newProduct,getProduct,getSingleProduct,updateProduct,deleteProduct, createReview, getAllReview, deleteReview}=require('../controllers/productController')

const {isUserAuthenticated,authorizeRoles} = require('../middlewares/auth')




router.route('/products').get(getProduct)

router.route('/products/:id').get(getSingleProduct)

router.route('/admin/products/new').post(isUserAuthenticated,authorizeRoles('admin'),newProduct);

router.route('/admin/products/:id').put(isUserAuthenticated,authorizeRoles('admin'),updateProduct).delete(isUserAuthenticated,authorizeRoles('admin'),deleteProduct);
router.route('/review').put(isUserAuthenticated,createReview).get(isUserAuthenticated,getAllReview).delete(isUserAuthenticated,deleteReview)

module.exports=router

