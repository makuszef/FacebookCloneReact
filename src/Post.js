import { Avatar, Button } from '@material-ui/core'
import React, { useState } from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import NearMeIcon from '@material-ui/icons/NearMe';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Post.css'
import db from './firebase';
import Comments from './Comments';
import { useStateValue } from './StateProvider';
function Post({profilePic, image, username, timestamp, message, likes, id, userid}) {
    const [{user}] = useStateValue();
    const [arecommentshidden, setArecommentsHidden] = useState(true);
    

    const like = () => { //mainly add 1 to likes
        

        if(id) {
            let node = document.getElementById('ThumbUpIcon');
            node.style.color = "blue";
        db.collection('posts').doc(id).update({
        likes: likes + 1,
    })
}
}
const deletepost = (e) => {
    e.preventDefault();
    if(id) {
        db.collection('posts').doc(id).delete().catch(error => (alert("error has occured", error.message)))
    }
}
    return (
        <div className="post">
            
            <div className="post__top">
                <Avatar src={profilePic}
                className="post__avatar"/>
                <div className="post__infbutton">
                <div className="post__topInfo">
                    <h3>{username}</h3>
                    <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
                    
                </div>
                {user.uid === userid && <Button onClick={deletepost} className="post__deletebutton">Delete</Button>} {/* Check if current userid is equal to post sender id*/}
                </div>
            </div>
            
            <div className="post__bottom">
                <p>{message}</p>
            </div>
            <div className="post__image">
                <img src={image} alt=""/>
            </div>
            <div className="post__options">
                <div onClick={like}  className="post__option">
                    <ThumbUpIcon id="ThumbUpIcon"/>
    <p>Like {likes}</p>
                    
                </div>
                {arecommentshidden && <div className="post__option" onClick={() => setArecommentsHidden(false)}>
                    <ChatBubbleIcon/>
                    <p>Comments</p>
                </div>}
                {!arecommentshidden && <div className="post__option" onClick={() => setArecommentsHidden(true)}>
                    <ChatBubbleIcon/>
                    <p> Hide comments</p>
                </div>}
                
                <div className="post__option">
                    <NearMeIcon/>
                    <p>Share</p>
                </div>
                <div className="post__option">
                    <AccountCircleIcon/>
                    <ExpandMoreIcon/>
                </div>
            </div>
            {!arecommentshidden && <Comments userid={userid} id={id}/>}
            
        </div>
    )
}

export default Post
