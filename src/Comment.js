import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import './Comment.css'
import db from './firebase'
import { useStateValue } from './StateProvider'

function Comment({profilePic, message, username, timestamp, id, postid, userid}) {
    
    const [{user}] = useStateValue();
    console.log("current user id=", user.uid, " senderid=", userid)
    const deletemessage = (e) => {
        console.log("deleted")
        if(postid && id) {
        db.collection('posts').doc(postid).collection('comments').doc(id).delete().catch(error => alert("error has occured", error.message))
    }
}
    return (
        <div className="comment">
            
                <div className="comment__left">
                    <Avatar className="comment__avatar" src={profilePic} alt=""/>
                </div>
            <div className="comment__right">
                <div className="comment__userinfo">
                    <h4>{username}</h4>
                <h6>{new Date(timestamp?.toDate()).toUTCString()}</h6>
                
                </div>
                <p>{message}</p>
                </div>
                {user.uid === userid && (<Button onClick={deletemessage} className="comment__delete">Delete</Button>)}
                </div>
    )
}

export default Comment
