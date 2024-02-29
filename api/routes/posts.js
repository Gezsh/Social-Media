const express=require('express')
const router=express.Router()
const {auth}=require('../middleware/auth')

const {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getAPost,
    getTimelinePosts,
    getUserAllPosts
}=require('../controller/posts')



router.post('/',createPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/likes',likePost)
router.get('/:id',getAPost)
router.get('/timelines/:userId',getTimelinePosts)
router.get("/profile/:username",getUserAllPosts)
module.exports=router