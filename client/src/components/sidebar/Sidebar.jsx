import './sidebar.css'
import {Users} from '../../data'
import {RssFeed,Chat,PlayCircle,Group,Bookmark,Help,WorkOutline,Event,School} from '@mui/icons-material'
import CloseFriends from '../closeFriends/closeFriends'
export default function Sidebar(){

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                  <ul className="sidebarList">
                      <li className="sidebarListItem">
                          <RssFeed className="sidebarIcon"/>
                          <span className="sidebarListItemText">Feed</span>
                     </li>  
                      <li className="sidebarListItem">
                          <Chat className="sidebarIcon"/>
                          <span className="sidebarListItemText">Chat</span>
                     </li>  
                      <li className="sidebarListItem">
                          <PlayCircle className="sidebarIcon"/>
                          <span className="sidebarListItemText">PlayCircle</span>
                     </li>  
                      <li className="sidebarListItem">
                          <Group className="sidebarIcon"/>
                          <span className="sidebarListItemText">Group</span>
                     </li>  
                      <li className="sidebarListItem">
                          <Bookmark className="sidebarIcon"/>
                          <span className="sidebarListItemText">Bookmark</span>
                     </li>  
                      <li className="sidebarListItem">
                          <Help className="sidebarIcon"/>
                          <span className="sidebarListItemText">Help</span>
                     </li>  
                      <li className="sidebarListItem">
                          <WorkOutline className="sidebarIcon"/>
                          <span className="sidebarListItemText">WorkOutline</span>
                     </li>  
                      <li className="sidebarListItem">
                          <Event className="sidebarIcon"/>
                          <span className="sidebarListItemText">Event</span>
                     </li>  
                      <li className="sidebarListItem">
                          <School className="sidebarIcon"/>
                          <span className="sidebarListItemText">Course</span>
                     </li>  
                  </ul>
                  <button className="sidebarButton">Show more</button>
                  <hr className="sidebarHr" />
                  <ul className="sidebarFriendList">

                   {Users.map((u)=>{
                    return <CloseFriends key={u.id} user={u}/>
                   })}
                   
                  </ul>
            </div>
        </div>
    )

}











































































































































