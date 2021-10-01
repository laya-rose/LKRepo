const catchAsyncErrors=require('./catchasyncerrors.js');
const jwt=require('jsonwebtoken');
const ErrorHandler=require('../utils/errorhandler.js')
const User=require('../models/user.js');
// check if user is authenticated or not
exports.isAuthenticatedUser=catchAsyncErrors(async (req, res,next)=>{
  const { token}=req.cookies;
  if(!token){
    return next(new ErrorHandler("Login first to access the resource",401));
  }

  const decoded=jwt.verify(token,process.env.JWT_SECRET)
  req.user=await User.findById(decoded.id);
  next();
})

//Handling users roles
exports.authorizeRoles=(...role)=>{
  return(req, res, next)=>{
    if(!role.includes(req.user.role)){
      return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403));
    }
    next();
  }
}
