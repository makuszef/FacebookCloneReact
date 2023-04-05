import React from 'react'
import "./Header.css"
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StoreIcon from '@material-ui/icons/Store';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useStateValue } from './StateProvider';
function Header() {
    const [{user}, dispatch] = useStateValue();
    return (
        <div className="header">
            <div className="header__left">
                <img src="https://lh3.googleusercontent.com/proxy/Z1JoyZQp7mLxTQ91F1rYL1JbTDZWVOQmIKVp8esYEJCl_imbqPegiGZv96swPZVuYcleiI27HgjhaQd3D6cJRUpGoWpLVtyi3LEQZK3Rnm1dC_rvoYfmJv0Z2x5qno96" alt=""/>
            <div className="header__input">
                <SearchIcon/>
                <input placeholder="search Facebook" type="text"/>
            </div>
            </div>
            <div className="header__center">
                <div className="header__option
                header__option--active">
        <HomeIcon fontSize="large"/>
                </div>
                <div className="header__option">
        <FlagIcon fontSize="large"/>
                </div>
                <div className="header__option">
        <SubscriptionsIcon fontSize="large"/>
                </div>
                <div className="header__option">
        <StoreIcon fontSize="large"/>
                </div>
                <div className="header__option">
        <SupervisedUserCircleIcon fontSize="large"/>
                </div>
                
            </div>
            <div className="header__right">
                <div className="header__info">
                    <Avatar src={user.photoURL}/>
                    <h4>{user.displayName}</h4>
                </div>
                <IconButton>
                <AddIcon/>
                </IconButton>
                <IconButton>
                <ForumIcon/>
                </IconButton>
                <IconButton>
                <NotificationsIcon/>
                </IconButton>
                <IconButton>
                <ExpandMoreIcon/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header
