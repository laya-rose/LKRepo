const app = require('./app');
const connectDatabase=require('./config/database.js');
const dotenv=require('dotenv');

//Handling uncaught exceptions
process.on('uncaughtException',err=>{
  console.log(`ERROR: ${err.message}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
})

//Setting up the config file
dotenv.config({path: 'Backend/config/config.env'})

//Connecting to database
connectDatabase();

const server=app.listen(process.env.PORT,()=>{
  console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handle unhandled promise rejectoins
process.on('unhandledRejection',err=>{
  console.log(`ERROR: ${err.message} `);
  console.log("Shutting down the server due to unhandled promise rejections");
  server.close(()=>{
    process.exit(1);
  })
})
