const User=require('../models/user.js');
const ErrorHandler=require('../utils/errorhandler.js');
const catchAsyncErrors=require('../middlewares/catchasyncerrors.js');
const sendToken=require('../utils/jwttoken.js');
const sendEmail=require('../utils/sendEmail.js');
const crypto=require('crypto');
//register user => /api/v1/register

exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
  const {name,email,password}=req.body;
  const user=await User.create({
    name,
    email,
    password,
    avatar:{
      public_id:'id123',
      url:'https://res.cloudinary.com/bookit/image/upload/v1608062030/products/dsvbpny402gelwugv2le.jpg'
    }
  })
  sendToken(user,200,res);
  //previous lecture code
  // const token=user.getJwtToken();
  // res.status(201).json({
  //   success:true,
  //   token
  // });
})

//Login user =>/api/v1/login
exports.loginUser=catchAsyncErrors(async (req,res,next)=>{
  const {email,password}=req.body;
  //checks if email and password is entered by user
  if(!email||!password){
    return next(new ErrorHandler('Please enter email and password',400));
  }

  //Finding user in database
    const user=await User.findOne({email}).select('+password');
    if(!user){
      return next(new ErrorHandler("Invalid Email or Password",400));
    }

    //Checks if password is correct or not
    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
      return next(new ErrorHandler("Invalid Email or Password",400));
    }
    sendToken(user,200,res);
    //previous lecture code
    // const token=user.getJwtToken();
    // res.status(200).json({
    //   success:true,
    //   token
    // });
})

//forgot password =>/api/v1/password/forgot
exports.forgotPassword=catchAsyncErrors(async (req,res,next)=>{
  const user=await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler("User not found with this email ",404));
  }
  //Get reset Token
  const resetToken=user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});
  // Create reset password URL
  const resetUrl=`${req.protocol}://${req.get('host')}/api/v1/reset/${resetToken}`;
  const message=`Yout password reset token is as follows:\n\n${resetUrl}\n\nIf you have not requested this mail then ignore it.`;
  try{
      await sendEmail({
        email:user.email,
        subject:"Little Knitties Password recovery",
        message
    })
      res.status(200).json({
        success:true,
        message:`Email send to: ${user.email}`
    })
  }catch(error){
      user.resetPasswordToken=undefined;
      user.resetPasswordExpire=undefined;
      await user.save({validateBeforeSave:false});
      return next(new ErrorHandler(error.message,500));
  }
})

//reset password =>/api/v1/password/reset/:Token
exports.resetPassword=catchAsyncErrors(async (req,res,next)=>{
  //Hash the url token
  const resetPasswordToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user=await User.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt:Date.now()}
  })
  if(!user){
    return next(new ErrorHandler("Password reset token is invalid or has been expired",404)

  )}
  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match",400))
  }
  //Setup new password
  user.password=req.body.password;
  user.resetPasswordToken=undefined;
  user.resetPasswordExpire=undefined;
  await user.save();
  sendToken(user,200,res);
})
// Get currently logged in user details => /api/v1/me
exports.getUserProfile=catchAsyncErrors(async (req,res,next)=>{
  const user=await User.findById(req.user.id);
  res.status(200).json({
    success:true,
    user
  })
})
//update /change password => /api/v1/password/update
exports.updatePassword=catchAsyncErrors(async(req,res,next)=>{
  const user=await User.findById(req.user.id).select('+password');

  //check the previous user password
  const isMatched=await user.comparePassword(req.body.oldPassword);
  if(!isMatched){
    return next(new ErrorHandler('Old password is incorrect',400));
  }
  user.password=req.body.password;
  await user.save();
  sendToken(user,200,res);
})
//update user profile  => /api/v1/me/update
exports.updateProfile=catchAsyncErrors(async (req,res,next)=>{
  const newUserData={
    name:req.body.name,
    email:req.body.email
  }
  //update avatar // TODO:
  const user=await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success:true
  })
})
// Logout User =>/api/v1/logout
exports.logout=catchAsyncErrors(async(req,res,next)=> {
  res.cookie('token',null,{
    expires:new Date(Date.now()),
    httpOnly:true
  })
  res.status(200).json({
    success:true,
    message:"logged Out"
  });
})
// Admin routes => /api/v1/admin/users
exports.allUsers=catchAsyncErrors(async (req,res,next)=>{
  const users=await User.find();
  res.status(200).json({
    success:true,
    users
  })
})

//Get user details => /api/v1/admin/user/:id
exports.getUserDetails =catchAsyncErrors(async (req,res,next)=>{
  const user=await User.findById(req.params.id);
  console.log(user)
  if(!user){
    console.log(';nsdgfjnshhj')
    return next(new ErrorHandler(`User doesnot found with the id : ${req.params.id}`,400));
  }
  res.status(200).json({
    success:true,
    user
  })
})
