<<<<<<< HEAD
const Product=require('../models/product');
const ErrorHandler=require('../utils/errorhandler.js');
const catchAsyncErrors=require('../middlewares/catchasyncerrors.js');
const APIFeatures=require('../utils/apifeatures.js');

//Create new product => /api/v1/admin/product/new
exports.newProduct=catchAsyncErrors(async(req,res,next)=>{

  req.body.user=req.user.id;
  const product=await Product.create(req.body); //gets all data from the body and creates new product using create function
  res.status(201).json({
    success:true,
    product
  })
})

//To get all products => /api/v1/products
//To get all products => /api/v1/products?keyword=hankies&category=Hankies&price[gte]=100&price[lte]=1500
exports.getProducts=catchAsyncErrors(async(req,res,next)=>{
  // return next(new ErrorHandler('My error',400));
  const resPerPage=8;
  const productsCount=await Product.countDocuments();
  const apiFeatures=new APIFeatures(Product.find(),req.query)
                    .search()
                    .filter()
                    .pagination(resPerPage)
  // const products =await Product.find();
  const products=await apiFeatures.query;
  res.status(200).json({
    success: true,
    productsCount,
    products
  })
})

// To get a single product details => /api/v1/product/:id
exports.getSingleProduct=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.params.id);
  if(product){
      res.status(200).json({
      success:true,
      product
    })
  }
  return next(new ErrorHandler("product not found",404));
})

//Update product => /api/v1/admin/product/:id
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
  let product=await Product.findById(req.params.id);
  if(product){
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    });
    return res.status(200).json({
      success:true,
      message:"Product is updated",
      product
    })
  }
  return next(new ErrorHandler("product not found",404));
})

//delete product => /api/v1/admin/product/:id
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
  let product=await Product.findById(req.params.id);
  if(product){
    await Product.deleteOne();
    res.status(200).json({
      success:true,
      message:"Product deleted"
    })
  }
  return next(new ErrorHandler("product not found",404));
})

//Create new review => /api/v1/review
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
  const {rating,comment,productId}=req.body;
  const reviews={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
  const product=await Product.findById(productId);
  const isReviewed=product.reviews.find(
    r=>r.user.toString()===req.user._id.toString()
  )
  if(isReviewed){
    product.reviews.forEach(review=>{
      if(review.user.toString()===req.user._id.toString()){
        review.comment=comment;
        review.rating=rating;
      }
    })
  }else{
    product.reviews.push(reviews);
    product.numOfReviews=product.reviews.length;
  }
  product.ratings=product.reviews.reduce((acc,item)=> item.rating+acc,0)/product.reviews.length
  await product.save({validateBeforeSave:false});
  res.status(200).json({
    success:true
  })
})

// get product reviews =>/api/v1/reviews
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

// Delete product review =>/api/v1/reviews
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  const reviews=product.reviews.filter(review=>review._id.toString()!==req.query.id.toString());
  const numOfReviews=reviews.length;
  const ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success:true
  })
})
=======
const Product=require('../models/product');
const ErrorHandler=require('../utils/errorhandler.js');
const catchAsyncErrors=require('../middlewares/catchasyncerrors.js');
const APIFeatures=require('../utils/apifeatures.js');

//Create new product => /api/v1/admin/product/new
exports.newProduct=catchAsyncErrors(async(req,res,next)=>{

  req.body.user=req.user.id;
  const product=await Product.create(req.body); //gets all data from the body and creates new product using create function
  res.status(201).json({
    success:true,
    product
  })
})

//To get all products => /api/v1/products
//To get all products => /api/v1/products?keyword=hankies&category=Hankies&price[gte]=100&price[lte]=1500
exports.getProducts=catchAsyncErrors(async(req,res,next)=>{
  // return next(new ErrorHandler('My error',400));
  const resPerPage=8;
  const productsCount=await Product.countDocuments();
  const apiFeatures=new APIFeatures(Product.find(),req.query)
                    .search()
                    .filter()
                    .pagination(resPerPage)
  // const products =await Product.find();
  const products=await apiFeatures.query;
  res.status(200).json({
    success: true,
    productsCount,
    products
  })
})

// To get a single product details => /api/v1/product/:id
exports.getSingleProduct=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.params.id);
  if(product){
      res.status(200).json({
      success:true,
      product
    })
  }
  return next(new ErrorHandler("product not found",404));
})

//Update product => /api/v1/admin/product/:id
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
  let product=await Product.findById(req.params.id);
  if(product){
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
      new:true,
      runValidators:true
    });
    return res.status(200).json({
      success:true,
      message:"Product is updated",
      product
    })
  }
  return next(new ErrorHandler("product not found",404));
})

//delete product => /api/v1/admin/product/:id
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
  let product=await Product.findById(req.params.id);
  if(product){
    await Product.deleteOne();
    res.status(200).json({
      success:true,
      message:"Product deleted"
    })
  }
  return next(new ErrorHandler("product not found",404));
})

//Create new review => /api/v1/review
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
  const {rating,comment,productId}=req.body;
  const reviews={
    user:req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment
  }
  const product=await Product.findById(productId);
  const isReviewed=product.reviews.find(
    r=>r.user.toString()===req.user._id.toString()
  )
  if(isReviewed){
    product.reviews.forEach(review=>{
      if(review.user.toString()===req.user._id.toString()){
        review.comment=comment;
        review.rating=rating;
      }
    })
  }else{
    product.reviews.push(reviews);
    product.numOfReviews=product.reviews.length;
  }
  product.ratings=product.reviews.reduce((acc,item)=> item.rating+acc,0)/product.reviews.length
  await product.save({validateBeforeSave:false});
  res.status(200).json({
    success:true
  })
})

// get product reviews =>/api/v1/reviews
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})

// Delete product review =>/api/v1/reviews
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
  const product=await Product.findById(req.query.productId);
  const reviews=product.reviews.filter(review=>review._id.toString()!==req.query.id.toString());
  const numOfReviews=reviews.length;
  const ratings=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length
  await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    numOfReviews
  },{
    new:true,
    runValidators:true
  })
  res.status(200).json({
    success:true
  })
})
>>>>>>> 0f1662f4e147fb237b9a0fdbbffc092c57316954
