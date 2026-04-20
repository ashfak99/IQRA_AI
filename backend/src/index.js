import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./config/connect.js"

dotenv.config();

const port=process.env.PORT || 8000

connectDB()
.then(()=>{
  app.on('error',(err)=>{
    console.error('Connection error',err);
    throw err;
  })
  app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
  })
})
.catch((err)=>{
  console.error('Failed to connect to the database',err);
  process.exit(1);
});