import './closeFriends.css'
const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
export default function CloseFriends({user}) {
  return (
    <li className="sidebarFriend">
    <img className="sidebarFriendImg" src={PF + user.profilePicture} alt="" crossOrigin ="anonymous"/>
    <span className="sidebarFriendName">{user.username}</span>
   </li>
  )
}
