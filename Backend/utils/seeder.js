const Product =require('../models/product.js');
const dotenv=require('dotenv');
const connectDatabase=require('../config/database.js');

const products=require('../data/product.json');

//Setting dotenv file and connecting database
dotenv.config({path:'Backend/config/config.env'});
connectDatabase();

const seedProducts = async()=>{
  try{
    await Product.deleteMany();
    console.log('Products are deleted');
    await Product.insertMany(products);
    console.log('All products are added');
    process.exit();
  }catch(error){
    console.log(error.message);
    process.exit();
  }
}

seedProducts();
