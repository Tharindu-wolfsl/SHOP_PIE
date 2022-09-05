const Order= require('../models/order')
const Product=require('../models/product')
const User=require('../models/user')


const ErrorHanlder = require('../utils/errorHandler')
const handleAsyncErrors=require('../middlewares/catchAsyncErrors')



//Create new order in api/v1/order/new
exports.createOrder=handleAsyncErrors(async (req, res,next) => {

    const {shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;


    const order=await Order.create({

        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.User._id

    })

    res.status(200).json({

        success:true,
        order

    })

})

//get single order /api/v1/order/:id


exports.getSingleOrder=handleAsyncErrors(async (req,res,next)=>{

    const order=await Order.findById(req.params.id).populate('user','name email')

    if(!order){

        return next(new ErrorHanlder('Order not found!',404))
    }

    res.status(200).json({

        success:true,
        order

    })

})

//Get Orders of current user in api/v1/order/me
exports.myOrders=handleAsyncErrors(async (req,res,next)=>{

    console.log(req.User._id)
    const order=await Order.find({user:req.User._id});

    if(!order){

        return next(new ErrorHanlder('Orders not found!',404))
    }

    res.status(200).json({

        success:true,
        order

    })

})
//Get all orders in api/v1/admin/orders
exports.allOrders=handleAsyncErrors(async (req,res,next)=>{


    const order=await Order.find()

    if(!order){

        return next(new ErrorHanlder('Orders not found!',404))
    }

    let totalAmount=0;

    order.forEach((o)=>{

        totalAmount+=o.totalPrice;
    })

    res.status(200).json({

        success:true,
        totalAmount,
        order

    })

})

//Update order status in /api/v1/admin/order/:id


exports.updateOrder=handleAsyncErrors(async (req,res,next) => {


  //Get order
  
  const order=await Order.findById(req.params.id)

  if(!order){

    return next(new ErrorHanlder('Order not found!',404))
    }

if(order.orderStatus === "Delivered"){

    return next(new ErrorHanlder('Order already delivered!',400))
}


//update product stock

order.orderItems.forEach(async item=>{

    await updateStock(item.product,item.quantity)
})

    order.orderStatus=req.body.status
    order.deliveredAt=Date.now()

    await order.save({validateBeforeSave:false})


    res.status(200).json({
        success: true,
        order

    })
})


async function updateStock(id,quantity) {

    const product=await Product.findById(id)

    product.stock=product.stock-quantity


    await product.save({validateBeforeSave:false})


}


//delte order by admin in api/v1/order/:id

exports.deleteOrder=handleAsyncErrors(async (req,res,next) => {


  //Get order
  
  const order=await Order.findById(req.params.id)

    if(!order){

        return next(new ErrorHanlder('Order not found!',404))
    }

    await order.remove()


    res.status(200).json({

        success: true,
        message: 'Order deleted successfully'
    })

})