const errorHanlder=require('../utils/errorHandler')


module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode  || 500;
    err.message=err.message || 'Internal error';

    res.status(err.statusCode).json({

        success:false,
        message:err.stack

    })

}