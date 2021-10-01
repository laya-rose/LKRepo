const ErrorHandler=require('../utils/errorhandler.js');

module.exports=(err,req,res,next)=>{
  err.statusCode=err.statusCode||500;

  if(process.env.NODE_ENV.trim()==='DEVELOPMENT'){
    res.status(err.statusCode).json({
      success: false,
      error:err,
      errMessage:err.message,
      stack:err.stack
    });
  }
  if(process.env.NODE_ENV.trim()==='PRODUCTION'){
    let error={...err}
    error.message=err.message;

    //Wrong mongoose object id error
    if(err.name==='CastError'){
      const message = `Resource not found. Invalid: ${err.path} `
      error=new ErrorHandler(message,400)
    }

    //Handling mongoose validation error
    if(err.name==='ValidationError'){
      const message=Object.values(err.errors).map(value=>value.message);
      error=new ErrorHandler(message,400);
    }
    //Hhandling the mongoose duplicate key error
    if(err.code=11000){
      const message=`Duplicate ${Object.keys(err.keyValue)} entered.`
      error=new ErrorHandler(message,400);
    }
    //Handling JWT error
    if(err.name==='JsonWebTokenError'){
      const message='JSON Web Token is invalid. Try again!!'
      error=new ErrorHandler(message,400);
    }
    //Handling expired JWT error
    if(err.name==='TokenExpiredError'){
      const message='JSON Web Token is expired.Try again!! '
      error=new ErrorHandler(message,400);
    }
    res.status(error.statusCode).json({
      success:false,
      message:error.message||"Internal Server Error"
    });
  }
  //this has been commented because seperate messages has to be shown while in production mode or developmen mode
  // err.message=err.message||"Internal Server Error";
  // res.status(err.statusCode).json({
  //   success:false,
  //   error:err.stack
  // })

}
