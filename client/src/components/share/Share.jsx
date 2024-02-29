import { useContext,  useState } from 'react'
import './share.css'
import {PermMedia,Label,Room,EmojiEmotions,Cancel} from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
export default function Share() {
  
  const {user} =useContext(AuthContext)
  // const {desc}=useRef()
  const [desc,setDesc]=useState()
  const [file,setFile] =useState()

  const submitHandler=async(e)=>{
    e.preventDefault()
    console.log('done!')
    const newPost={
      userId:user._id,
      desc:desc
    }
    if(file){
      console.log("file",file)
      const data=new FormData();
      const fileName= file.name
      data.append("file",file)
      data.append("name",fileName)
      newPost.img=fileName
      console.log("newPost :",newPost)
      try{
         await axios.post("http://localhost:8800/api/upload",data)
      }catch(error){
        console.log(error)
      }
    }
    try{
      await axios.post("http://localhost:8800/api/post/",newPost)
     // window.location.reload()
    }catch(error){
      console.log(error)
    }
    
  }

  return (
    <div className="share">
        <div className="shareWrapper">
             <div className="shareTop">
                 <img className="shareProfileImg" src={PF + user.profilePicture || PF + "person/noAvatar.png"} alt="" crossOrigin ="anonymous"/>
                 <input 
                 placeholder={"what is in your mind "+ user.username +" ?"} 
                 className="shareInput"
                //  ref={desc}
                value={desc}
                onChange={(e)=>setDesc(e.target.value)}
                 />
             </div>
             <hr className="shareHr"/>
             {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
             <form className="shareBottom"  onSubmit={submitHandler}>
                <div className='shareOptions'>
                    <label className="shareOption">
                         <PermMedia htmlColor='tomato' className="shareIcon"/>
                        <span className="shareOptionText">photo or video</span>
                        <input 
                           style={{display:"none"}}
                           type="file" 
                           id="file" 
                           accept=".png,.jpeg,.jpg"
                           onChange={(e)=>setFile(e.target.files[0])}
                           />
                    </label>
                    <div className="shareOption">
                         <Label htmlColor='blue' className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                         <Room htmlColor='green' className="shareIcon"/>
                        <span className="shareOptionText">Locations</span>
                    </div>
                    <div className="shareOption">
                         <EmojiEmotions htmlColor='gold' className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                  <button className="shareButton" type="submit">Share</button>
             </form>
        </div>
    </div>
  )
}
