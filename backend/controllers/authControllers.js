const User = require('../models/user')
const ErrorHandler=require('../utils/errorHandler')
const handleAsyncErrors = require('../middlewares/catchAsyncErrors')


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


    const token=user.getJwtToken()
    

    res.status(201).json({
        success:true,
        token
        })

})


