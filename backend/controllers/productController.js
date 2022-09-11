
const Product=require('../models/product')
const ErrorHandler=require('../utils/errorHandler')
const handleAsyncErrors=require('../middlewares/catchAsyncErrors')
const APIFeatures=require('../utils/apiFeatures')
const User=require('../models/user')
const product = require('../models/product')

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

   // return next(new ErrorHandler("My error",404));
    const resultPage=4;
    const productCount=await Product.countDocuments()

    const apiFeatures=new APIFeatures(Product.find(),req.query).search().filter().pagination(resultPage)


    const products=await apiFeatures.query;
    setTimeout(()=>{

       return res.status(200).json({

            success:true,
            count:products.length,
            productCount,
            products
        })

    },1000)
   

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

//create and update new review /api/v1/reviews

exports.createReview=handleAsyncErrors( async (req,res,next)=>{

    //get request data
    const {rating,comment,productId}=req.body

    //create rerview object

    const review={

        user: req.User._id,
        name: req.User.name,
        rating:Number(rating),
        comment
    }

    //get product

    const product=await Product.findById(productId)

    const isReviewed=product.reviews.find( r=> r.user.toString()===req.User._id.toString())

    if(isReviewed){

        product.reviews.forEach(item=>{if(item.user.toString()===req.User._id.toString())
        {
            item.rating=rating
            item.comment=comment

        }
        
        })

    }
    else{

        product.reviews.push(review)
        product.numOfReviews=product.reviews.length


    }

    product.ratings=product.reviews.reduce((acc,item)=>{

        return acc+item.rating

    },0)/product.reviews.length

    await product.save({validateBeforeSave:false})


    res.status(200).json({

        success:true,
        message: 'Product Review updated',

    })
})

//get all review of specific product /api/v1/reviews

exports.getAllReview=handleAsyncErrors(async (req,res,next) => {

const product=await Product.findById(req.query.id)

    res.status(200).json({

        success:true,
        reviews:product.reviews

    })


})
//Delete  review of specific product /api/v1/reviews
exports.deleteReview=handleAsyncErrors(async (req,res,next) => {

    const product=await Product.findById(req.query.productId)


    //filter reviews that not requested reviews

    const reviews=product.reviews.filter((review)=>review._id.toString()!==req.query.id.toString())


    //update new number of reviews
    const numOfReviews = reviews.length

    //update new ratings
    const ratings=reviews.reduce((acc,item)=>{

        return acc+item.rating

    },0)/reviews.length


    await Product.findByIdAndUpdate(req.query.productId,{

        reviews,
        ratings,
        numOfReviews,

    },{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    
        res.status(200).json({
            success:true,
            message:"Review deleted successfully",
            reviews:reviews
    
        })
    
    
    })