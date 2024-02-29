const express=require('express')
const router=express.Router();
const {auth}  =require('../middleware/auth')

const {
    register,
    login,
    updateUser,
    deleteUser,
    getAUser,
    followUser,
    unfollowUser,
    getFriends
} =require('../controller/users')

router.post('/login',login)
router.post('/register',register)
router.put('/:id',updateUser)
router.delete('/:id',deleteUser)
router.get('/',getAUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',unfollowUser)
router.get('/friends/:userId',getFriends)

module.exports=router