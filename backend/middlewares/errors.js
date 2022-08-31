const errorHanlder=require('../utils/errorHandler')


module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode  || 500;

    //wrong mongoose object id error
    if(err.name==="CastError"){

        const message=`Resource not found : invalid ${err.path}`
        err=new errorHanlder(message,400)

    }

    //Validate mongoose validation error

    if(err.name="ValidationError"){

        const message=Object.values(err.errors).map(value=>value.message);
        err=new errorHanlder(message,400)
    }

    if(process.env.NODE_ENV==='DEVELOPMENT'){

        res.status(err.statusCode).json({

            success:false,
            error:err,
            message:err.message,
            stack:err.stack
        })
    }


    if(process.env.NODE_ENV==='PRODUCTION'){

        const error={...err}

        error.message=err.message

       

        res.status(error.statusCode).json({

            success:false,
            message:error.message || 'Internal server error'
    
        })


    }


}