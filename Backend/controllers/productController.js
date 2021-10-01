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

  const resPerPage=4;
  const productCount=await Product.currentDocument;
  const apiFeatures=new APIFeatures(Product.find(),req.query)
                    .search()
                    .filter()
                    .pagination(resPerPage)
  // const products =await Product.find();
  const products=await apiFeatures.query;
  res.status(200).json({
    success: true,
    count:products.length,
    productCount,
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
