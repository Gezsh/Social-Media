const mongoose=require('mongoose')

const dbConnect=(url)=>{
    mongoose.connect(url)
                        .then(()=>console.log("database connected"))
                        .catch((error)=>console.log(error))
}

module.exports=dbConnect