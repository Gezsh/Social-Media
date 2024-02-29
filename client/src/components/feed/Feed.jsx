import { AuthContext } from '../../context/AuthContext'
import Post from '../post/Post'
import Share from '../share/Share'
//import { Posts } from '../../data'
import './feed.css'
import axios from 'axios'
import { useState,useEffect, useContext } from 'react'
export default function Feed({username}){
       const [posts,setPosts]=useState([])
       const {user} =useContext(AuthContext)
       console.log("feed.username",username)
       console.log("feed.user",user)
     useEffect(()=>{
        
        const fetchPost= async()=>{
         const res=username ? await axios.get("http://localhost:8800/api/post/profile/" + username) 
                            : await axios.get("http://localhost:8800/api/post/timelines/" + user._id)
           console.log("response",res.data)
           setPosts(res.data.sort((p1,p2)=>{
             return new Date(p2.createdAt) - new Date(p1.createdAt)
           }))
           console.log("posts",posts)
          
        }  
        fetchPost()

     },[username,user._id])
     
     return (
        <div className="feed">
          <div className="feedWrapper">
            <Share />
           
             { posts.map((p) => {
                return <Post key={p._id} post={p} />;
              })
            }
          </div>
        </div>
      );

}