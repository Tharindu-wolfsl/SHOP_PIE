const User = require('../models/user')
const ErrorHandler=require('../utils/errorHandler')
const handleAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendEmail=require('../utils/sendEmail')
const crypto=require('crypto')
const ErrorHanlder = require('../utils/errorHandler')


exports.registerUser=handleAsyncErrors( async (req,res,next)=>{

    const {name, email, password} = req.body;
    const user =await User.create({

        name,
        email,
        password,
        avatar:{
            public_id: 'samples/people/kitchen-bar',
            url:'https://res.cloudinary.com/lonewolfsl/image/upload/c_thumb,w_200,g_face/v1661962381/samples/people/kitchen-bar.jpg'
        }

    })


    // const token=user.getJwtToken()
   
    sendToken(user,200,res)

    // res.status(201).json({
    //     success:true,
    //     token
    //     })

})

//login user =/api/v1/login


exports.loginUser=handleAsyncErrors(async (req, res, next) => {

    const {email, password} = req.body;
   
    if(!email || !password){

        //return next(new ErrorHandler('Please enter email and password!',400));
        return res.status(400).json({
            success:false,
            message: 'Please enter email and password!',
        })
    }
    
    const user=await User.findOne({email}).select('+password');

    if(!user){

        //return next(new ErrorHandler('Invalid email or password!',401));
        return res.status(401).json({
            success:false,
            message: 'Invalid email or password!',
        })
    }
   
    const isPasswordMatch = await user.comparePassword(password)
   
    if(!isPasswordMatch){

        //return next(new ErrorHandler('Invalid email or password!',401));
        return res.status(401).json({
            success:false,
            message: 'Invalid  password!',
        })

    }

    // const token=user.getJwtToken()


    sendToken(user,200,res)
    // res.status(200).json({
    //     success:true,
    //     token
    // });

})

//forgot password in api/v1/password/forgot

exports.forgotPassword=handleAsyncErrors(async (req,res,next) => { 

    //check given email is exist and get it

    const user=await User.findOne({email:req.body.email});
    
    if(!user){

        // return next(new ErrorHandler(`Use not found in given email`,404));
        return res.status(404).json({

            success:false,
            message: 'Email not found!',

        })

    }
    
    
    const resetToken=user.getResetPasswordToken();
   
    
    await user.save({validateBeforeSave:false});

    const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message =`Your password reset url is given as follows: ${resetUrl}\n\nIf younot request this email you can ignore it`;
   
    try {

        await sendEmail({

            email:user.email,
            subject: 'ShopPIE password Reset',
            message,

        })

        res.status(200).json({
            success:true,
            message:`Recovery email sen to : ${user.email}`
        })
        
    } catch (error) {
        
        user.resetPasswordToken=undefined
        user.resetPasswordExpires=undefined

        await user.save({validateBeforeSave:false})

        console.log(error)

        return next(new ErrorHandler(error.message,500))
    }

})

//reset password in api/v1/password/reset/:token

exports.resetPassword = handleAsyncErrors(async (req, res, next) => {

    //hash password reset token
    
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');

    //find user

    

    const user =await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: {$gt: Date.now()}
    })
   

    if(!user){

        return res.status(403).json({

            success:false,
            message:`You don't have a valid reset password token or token expired!`
        })
    }
    //setup new password
    if(req.body.password!=req.body.confirmPassword){

        return res.status(401).json({

            success:false,
            message:`Passwprd does not match !`
        })

    }
    
    user.password=req.body.password

    user.resetPasswordToken=undefined
    user.resetPasswordExpires=undefined


    await user.save()

    sendToken(user,200,res)

})

//current user details in api/v1/me

exports.getCurrentUser = handleAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.User.id)

    res.status(200).json({
        success:true,
        user

    })
})


//update password

exports.updatePassword=handleAsyncErrors(async (req, res, next) => {

    //check user
    const user=await User.findById(req.User.id).select('+password');

    //check with old password

    const isMatch=await user.comparePassword(req.body.oldPassword)

    if(!isMatch){
        return next(new ErrorHandler(`Old password not correct!`,400))
    }

    user.password=req.body.password;

    await user.save()

    sendToken(user,200,res)

})


//update user profile

exports.updateUserProfile=handleAsyncErrors(async (req, res, next) => {

    //Get new profile data

    const newContent={
        name: req.body.name,
        email:req.body.email
    }

    //update user
    const user=await User.findByIdAndUpdate(req.User.id,newContent, {
        new: true,
        runValidators:true,
        useFindAndModify:false

    })

    //send token

    res.status(200).json({

        success:true,

    })


})


//logout user in api/v1/logout


exports.logoutUser = handleAsyncErrors(async (req,res,next)=>{

    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
        
    })

    res.status(200).json({
        success: true,
        message:'Logout user successfully completed'
    })

})

//Get all users aadmin in api/v1/admin/users

exports.getAllUsers = handleAsyncErrors(async (req, res,next) => {

    //Get alll users

    const user=await User.find()

    res.status(200).json({
        success:true,
        user
    })
})


//get sepcific user in api/v1/admin/user:id

exports.getUser = handleAsyncErrors(async (req, res,next) => {

    //Get alll users

    const user=await User.findById(req.params.id)

    if(!user){

        return next(new ErrorHanlder('User not exist!',404))
    }
    res.status(200).json({

        success:true,
        user
    })
})


//update specific user in api/v1/admin/user/:id
exports.updateUser=handleAsyncErrors(async (req, res, next) => {

    //Get new profile data

    const newContent={
        name: req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    //update user
    const user=await User.findByIdAndUpdate(req.params.id,newContent, {
        new: true,
        runValidators:true,
        useFindAndModify:false

    })
    if(!user){
        return next(new ErrorHanlder('User not exist!',404))
    }
    //send token

    res.status(200).json({

        success:true,
        message: 'User updated!',
        user

    })


})
//delete user api/v1/admin/user/delete
exports.deleteUser = handleAsyncErrors(async (req, res,next) => {

    //Get alll users

    const user=await User.findById(req.params.id)

    if(!user){

        return next(new ErrorHanlder('User not exist!',404))
    }


    await user.remove()

    res.status(200).json({

        success:true,
        message: 'User deleted!',
        
    })
})

