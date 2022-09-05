const express = require('express');
const { createOrder,getSingleOrder, myOrders ,allOrders, updateOrder,deleteOrder} = require('../controllers/orderController');
const router=express.Router();


const {isUserAuthenticated,authorizeRoles}=require('../middlewares/auth')



router.route('/order/new').post(isUserAuthenticated,createOrder)
router.route('/order/:id').get(isUserAuthenticated,getSingleOrder)
router.route('/orders/me').get(isUserAuthenticated,myOrders)
router.route('/admin/orders').get(isUserAuthenticated,authorizeRoles('admin'),allOrders)
router.route('/admin/order/:id').put(isUserAuthenticated,authorizeRoles('admin'),updateOrder)
router.route('/admin/order/:id').delete(isUserAuthenticated,authorizeRoles('admin'),deleteOrder)




module.exports=router