import './online.css'
const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
export default function Online({user}) {
    console.log("online",user)
    console.log("profilePicture",user.profilePicture)
    console.log("username",user.username)
  return (
    <li className="rightbarFriend">
    <div className="rightbarProfileImgContainer">
        <img src={PF + user.profilePicture} alt="" className="rightbarProfileImg" crossOrigin ="anonymous"/>
        <span className="rightbarOnline"></span>
    </div>
    <span className="rightbarUserName">{user.username}</span>
    </li>
  )
}