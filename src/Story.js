import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { storage } from './firebase';
import './Story.css'
function Story({reelimage, profileSrc, title, createReel}) {

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [uploadUrl, setUploadUrl] = useState(null);

    const handleChange = (e) => { //take first Image
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
        handleUpload();
        
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

    if(createReel) {
        let mydiv = document.getElementById('story');
        mydiv.onclick=function(){
            console.log('story');
            document.getElementById("story__hiddeninput").click();
        }
    }
    return (
        <div id="story" className="story" style={{backgroundImage: `url(${reelimage})`}} className="story">
            <Avatar className="story__avatar" src={profileSrc}/>
            <h4>{title}</h4>
            <input id="story__hiddeninput" className="story__hiddeninput" type="file" onChange={handleChange} accept="image/*"/>
        </div>
    )
}

export default Story
