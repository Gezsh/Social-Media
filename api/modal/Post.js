const mongoose =require('mongoose')
const express=require('express')

const PostSchema=new mongoose.Schema({
   
    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[]
    }

},{timestamp:true})



module.exports=mongoose.model('Post',PostSchema)