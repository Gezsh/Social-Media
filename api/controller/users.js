const express=require('express')
const User=require('../modal/User')
const bcrypt=require('bcrypt')
const { BadRequestError } = require('../error');
const statusCodes=require('http-status-codes')
const register=async(req,res)=>{
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
    console.log("user :",user)
  } catch (err) {
    res.status(500).json(err)
  }
}
    
const login=async(req,res)=>{
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
   
}

const updateUser = async(req,res)=>{
  console.log("userId",req.body.userId)
  console.log("id",req.params.id)
  
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
      
}

const deleteUser=async(req,res)=>{
       
  if (req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
}

const getAUser=async(req,res)=>{
    const userId=req.query.userId
    const username=req.query.username

  try {
    const user =userId ?  await User.findById(userId)
                       : await User.findOne({username:username}) ;
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
}

const followUser=async(req,res)=>{
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }

}



const unfollowUser=async(req,res)=>{
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }

     }

const getFriends=async(req,res)=>{
      try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
          user.followings.map((friendId) => {
            return User.findById(friendId);
          })
        );
        let friendList = [];
        friends.map((friend) => {
          const { _id, username, profilePicture } = friend;
          friendList.push({ _id, username, profilePicture });
        });
        res.status(200).json(friendList)
      } catch (err) {
        res.status(500).json(err);
      }
     }

module.exports={
    register,
    login,
    updateUser,
    deleteUser,
    getAUser,
    followUser,
    unfollowUser,
    getFriends
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY1MDQxNGYyYTJjZWJjMWQ3MzRjYjEiLCJpYXQiOjE3MDExNTg1OTgsImV4cCI6MTcwMzc1MDU5OH0.rlTP4QK1vA_ClJupmdC7NU0DLBsdQlVxD8pSEkZAZiU