import './topbar.css'
import {Search,Person,Chat,Notifications} from '@mui/icons-material'

import { Link } from 'react-router-dom';
import {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
const PF = import.meta.env.VITE_REACT_APP_PUBLIC_FOLDER;
export default function Topbar(){
  
    const {user} =useContext(AuthContext)
    return (
      
        <>
           <div className='topbarContainer'>
                 <div className='topbarLeft'>
                    <Link to="/" style={{textDecoration:"none"}}>
                        <span  className="logo">facebook</span>
                    </Link>    
                 </div>
                 <div className='topbarCenter'>
                         <div className="searchbar"><Search className='searchIcon' />
                         <input  placeholder='search for friends,posts or videos' className='searchInput'/>
                         </div>
                 </div>
                 <div className='topbarRight'>
                        <div className="topbarLinks">
                            <span className='topbarLink'>Homepages</span>
                            <span className='topbarLink'>Timelines</span>
                        </div>
                        <div className='topbarIcons'>
                             <div className='topbarIconsItems'>
                                <Person/>
                                <span className='topbarIconsBadge'>1</span>
                             </div>
                             <div className='topbarIconsItems'>
                                <Chat/>
                                <span className='topbarIconsBadge'>1</span>
                             </div>
                             <div className='topbarIconsItems'>
                                <Notifications/> 
                                <span className='topbarIconsBadge'>1</span>
                             </div>
                               <Link to={`/profile/${user.username}`}><img  src={user.profilePicture ? PF + user.profilePicture :PF +"person/noAvatar.png" } alt='' className='topbarImg' crossOrigin ="anonymous"/></Link>  
                        </div>
                 </div>

           </div>
        </>

    )

}