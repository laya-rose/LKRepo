const mongoose=require('mongoose');


const productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,'Please enter the product name'],
    trim:true,
    maxlength:[100,'Product name cannot exceed 100 characters']
  },
  price:{
    type:Number,
    required:[true,'Please enter the product price'],
    maxlength:[5,'Product price cannot exceed 5 characters'],
    default:0.0
  },
  description:{
    type:String,
    required:[true,'Please enter the product description']
  },
  ratings:{
    type:Number,
    default:0
  },
  images:[{
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      },
    }],
  category:{
    type:String,
    required:[true,'Please select the category for this product'],
    enum:{
      values:[
        'Hankies',
        'Bridal Hankies',
        'Baby Towels/Swaddles',
        'Crochet Products',
        'Gift Products'
      ],
      message:'Please select correct category for the product'
    }
  },
  seller:{
    type:String,
    required:[true,'Please enter the product seller']
  },
  stock:{
    type:Number,
    required:[true,'Please enter the product stock'],
    maxlength:[5,'Product stock cannot exceed 5 characters'],
    default:0
  },
  numofReviews:{
    type:Number,
    default:0
  },
  reviews:[{
      name:{
        type:String,
        required:true
      },
      rating:{
        type:Number,
        required:true
      },
      comment:{
        type:String,
        required:true
      },
      user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
      }
    }],
  createdAt:{
    type:Date,
    default:Date.now
  }
})

module.exports=mongoose.model('Product',productSchema)
