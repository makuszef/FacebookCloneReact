import { Avatar, Button } from '@material-ui/core'
import React from 'react'
import './MessageSender.css'
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoIcon from '@material-ui/icons/Photo';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useState } from 'react';
import { useStateValue } from './StateProvider';
import db, { storage } from './firebase';
import firebase from 'firebase';
function MessageSender() {
    const [{user}, dispatch] = useStateValue();
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploadUrl, setUploadUrl] = useState(null);

    const handleChange = (e) => { //take first Image
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        
    };

    const handleUpload = (e) => {
        const uploadTask = storage.ref(`images/${image?.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //logic
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error funtion
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref('images')
                .child(image.name)
                .getDownloadURL() //getURL
                .then(url => {
                    //post image inside db
                    setUploadUrl(url);
                })
            }
        )
        setImage(null);
        setProgress(0);
    
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        /*if (image) {
            const uploadTask = storage.ref(`images/${image?.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //logic
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                //error funtion
                console.log(error);
                alert(error.message);
            },
            () => {
                storage.ref('images')
                .child(image.name)
                .getDownloadURL() //getURL
                .then(url => {
                    //post image inside db
                    setUploadUrl(url);
                    db.collection('posts').add({
                        profilePic: user.photoURL,
                        message: input,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        username: user.displayName,
                        image: uploadUrl,
                        likes: 0,
                        userid: user.uid,
                    })
                    
                    setInput('');
                    setImageUrl('');
                })
            }
        )
        setImage(null);
        setProgress(0);
        }*/
        if(progress >= 100 && user && uploadUrl) {
        db.collection('posts').add({
            profilePic: user.photoURL,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            username: user.displayName,
            image: uploadUrl,
            likes: 0,
            userid: user.uid,
        })
        
        setInput('');
        setImageUrl('');
        
    }
    }
    return (
        
        <div className="messageSender">
            <div className="messageSender__top">
                <Avatar src={user.photoURL}/>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className="messageSender__input" placeholder={`What's up ${user.displayName}`} type="text"/>
                    <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL (Optional)" />
                    <button onClick={handleSubmit} type="submit"/>
                </form>
            </div>
            <div className="messageSender__bottom">
                <div className="messageSender__option">
                    <VideocamIcon style={{ color: "red"}}/>
                    <h3>Live</h3>
                </div>
                <div className="messageSender__option">
                    <PhotoIcon style={{ color: "green"}}/>
                    <input 
                    
                    className="messageSender__uploadinput"
                    accept="image/*"
            type="file" 
            onChange={handleChange}/>
            <Button type="button" onClick={handleUpload}>Upload</Button>
                </div>
                <div className="messageSender__option">
                    <InsertEmoticonIcon style={{ color: "orange"}}/>
                    <h3>Feeling/Avtivity</h3>
                </div>
            </div>
        </div>
    )
}

export default MessageSender
