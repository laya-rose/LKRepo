const express=require('express');
const app = express();
const cookieParser=require('cookie-parser');

app.use(express.json());
app.use(cookieParser());
const errorMiddleware=require('./middlewares/errors.js');

//Import all routes
const products=require('./routes/product.js');
const auth=require('./routes/auth.js');
app.use('/api/v1',products);
app.use('/api/v1',auth);

//Middleware to handle errors
app.use(errorMiddleware);

module.exports=app
