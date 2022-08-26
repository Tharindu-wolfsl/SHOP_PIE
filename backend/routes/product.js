const express=require('express')
const router=express.Router()
const {newProduct,getProduct,getSingleProduct,updateProduct,deleteProduct}=require('../controllers/productController')



router.route('/products').get(getProduct)

router.route('/admin/products/new').post(newProduct);

router.route('/products/:id').get(getSingleProduct)

router.route('/admin/products/:id').put(updateProduct).delete(deleteProduct);


module.exports=router

