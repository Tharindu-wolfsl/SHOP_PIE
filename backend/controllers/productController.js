
const Product=require('../models/product')
const ErrorHandler=require('../utils/errorHandler')
const handleAsyncErrors=require('../middlewares/catchAsyncErrors')
const APIFeatures=require('../utils/apiFeatures')
const User=require('../models/user')

//create new product => /api/v1/product/new

exports.newProduct=handleAsyncErrors(async (req,res,next)=>{


    req.body.user=req.User.id;

    const product=await Product.create(req.body);

    res.status(201).json({

        success:true, 
        product

    })

})
//get all products => /api/v1/products

exports.getProduct=handleAsyncErrors( async (req,res, next)=>{


    const resultPage=2;
    const productCount=await Product.countDocuments()

    const apiFeatures=new APIFeatures(Product.find(),req.query).search().filter().pagination(resultPage)


    const products=await apiFeatures.query;

    res.status(200).json({

        success:true,
        count:products.length,
        productCount,
        products
    })

})



//get specific single product => /api/v1/products/:id


exports.getSingleProduct=handleAsyncErrors( async (req,res,next)=>{

    const product=await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found!',404));
    }

    res.status(201).json({
        success:true,
     
        product

    })

})


//update products => /api/v1/admin/products/:id

exports.updateProduct=handleAsyncErrors( async (req,res,next)=>{

    let product=await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found!',404));
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{

            new:true,
            runValidators:true,
            useFindAndModify:false

    });

    res.status(201).json({
        success:true,
     
        product

    })

})

exports.deleteProduct=handleAsyncErrors( async (req,res,next)=>{

    const product=await Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler('Product not found!',404));
    }

    await product.remove();

    res.status(201).json({
        success:true,
        message:'Product deleted!'

    })


})
