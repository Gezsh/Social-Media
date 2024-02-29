const express=require('express')
const app=express();
const mongoose =require('mongoose')
const dotenv=require('dotenv')
const helmet=require('helmet')
const morgan=require('morgan')
const dbConnect=require('./connect/db')
const userRouter=require('./routes/users')
const postRouter=require('./routes/posts')
const core=require('cors')
const multer=require("multer")
const path=require('path')
dotenv.config();

app.use(core({
    origin:"*"
}))

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)

app.use("/images",express.static(path.join(__dirname,'/public/images')))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname, 'public/images'))
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload=multer({storage})

app.use('/api/upload',upload.single('file'),(req,res)=>{
    try{
         return res.status(200).json('file upload succefully!')
    }catch(error){
        console.log(error)
    }
})


app.listen(process.env.PORT,async()=>{
   await dbConnect(process.env.MONGO_URL)
    console.log(`Backend server is listening on port ${process.env.PORT}`)
})