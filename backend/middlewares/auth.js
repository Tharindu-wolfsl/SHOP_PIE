const ErrorHanlder = require('../utils/errorHandler')
const handleAsyncErrors=require('./catchAsyncErrors')
const User= require('../models/user')
const JWT= require('jsonwebtoken')
//handle auth users

exports.isUserAuthenticated = handleAsyncErrors( async (req,res,next)=>{


    const {token}=req.cookies


    if(!token){
        
        return  res.status(401).json({
            success:false,
            message:'Login first before access resources!'})

    }

    const decode=JWT.verify(token,process.env.JWT_SECRET)

    req.User=await User.findById(decode.id)

    next()

})

//authorize the roless

exports.authorizeRoles=(...roles)=>{
return (req,res,next)=>{


    
    if(!roles.includes(req.User.role)){

        // return next(new ErrorHanlder(`Role (${req.User.role}) cannot access to this resource!`,403))
       
        return res.status(403).json({

            success:false,
            message:`Role (${req.User.role}) cannot access to this resource!`
        })
        
    }

    next()


}

}