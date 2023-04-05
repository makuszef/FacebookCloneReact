import React, { useEffect, useState } from 'react'
import db from './firebase'
import './Comments.css'
import { Avatar, IconButton, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';
import Comment from './Comment';
function Comments({id, userid}) {
    const [{user}, dispatch] = useStateValue();
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState('');
    const sendmessage = (e) => {
        e.preventDefault();
        if(id) {
        db.collection('posts').doc(id).collection('comments').add({
            profilePic: user.photoURL,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: user.displayName,
            senderid: user.uid,
            
        })
        console.log("send")
        setInput('');
    }
    }

    useEffect(() => { //pull data from db
        if(id) {
        db.collection('posts').doc(id).collection('comments').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setComments(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                }
            ) ))
        ))
            }
    }, [id])
    return (
        <div className="comments">
            {comments.map(comment => 
                <Comment
                userid={comment.data.senderid}
                postid={id}
                id={comment.id}
                key={comment.id}
                profilePic={comment.data.profilePic}
                username={comment.data.username}
                message={comment.data.message}
                timestamp={comment.data.timestamp}
                />
                )}
            <div className="comments__sendcomment">
                <form className="comments__form"> 
                <Input className="comments__input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Write..." type="text"/>
                <button className="comments__hiddenbutton" type="submit" onClick={sendmessage}/>
                <IconButton disabled={!input} onClick={sendmessage}>
                    <SendIcon color="primary"/>
                </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Comments
