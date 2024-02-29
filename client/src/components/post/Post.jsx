import './post.css'
import { MoreVert } from '@mui/icons-material'
//import {Users} from '../../data'
import { useContext, useEffect, useState } from 'react'
//import {getAllTimeline} from '../../api/userApi'
import axios from 'axios'
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;

export default function Post({post}) {
      console.log("post in the post,jsx :",post)
 const [like,setLike]=useState(post.likes.length)
 const [isLiked,setIsLiked]=useState(false)
 const [user,setUser]=useState({})
 const {user:currentUser} =useContext(AuthContext)
  const handleClick=()=>{
    
      try{
         axios.put("http://localhost:8800/images/post/" + post._id + "/likes",{userId:currentUser._id})
      } catch(erorr){
        console.log(erorr)
      }

      setLike(isLiked ? like -1 : like + 1)
      setIsLiked(!isLiked)
  }
  useEffect(()=>{
    
    setIsLiked(post.likes.includes(currentUser._id))

  },[currentUser._id,post.likes])

   useEffect(()=>{
    
       const fetchUser=async()=>{
          console.log("post userId",post.userId)
        const res= await axios.get(`http://localhost:8800/api/user?userId=${post.userId}`)
            
           console.log("resonse",res.data)
           setUser(res.data)
       }
      fetchUser()
        console.log(user)
   },[post.userId])
       
   return (
    <div className="post">
          <div className="postWrapper">
              <div className="postTop">
                  <div className="postTopLeft">
                    <Link to ={`/profile/${user.username}`}>
                      <img className="postProfileImg" src={ PF + user.profilePicture} alt="" crossOrigin ="anonymous"/></Link> 
                     <span className="postProfileName">{user.username}</span>
                     <span className="postDate">{format(post.createdAt)}</span>
                  </div>
                  <div className="postTopReight">
                       <MoreVert/>
                  </div>
              </div>
              <div className="postCenter">
                 <span className="postText">{post?.desc}</span>
                 <img className="postImg" src={`${PF}${post.img}`} alt="" crossOrigin ="anonymous" />
              </div>
              <div className="postBottom">
                    <div className="postBottomLeft">
                          <img onClick={handleClick} className="likeIcon" src={`${PF}heart.png`} alt="" crossOrigin ="anonymous" />
                          <img  onClick={handleClick} className="likeIcon" src={`${PF}like.png`} alt="" crossOrigin ="anonymous" />
                          <span className="postLikeCounter">{like} people likes it </span>
                    </div>
                    <div className="postBottomReight">
                        <span className="postCommentText">{post.comment} comment</span>
                    </div>
              </div>
          </div>
    </div>
  )
}
