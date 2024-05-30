import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from "react-router-dom"
import {httpGetSingleVideo} from "../hooks/userRequest.js"

const SingleVideo = () => {
    const [post, setPost] = useState();
    const {_id} = useParams();
    const navigate = useNavigate();
    // console.log(_id);

    useEffect(() => {
        httpGetSingleVideo({_id})
        .then((data) => {
            if(data) setPost(data)
        })
    },[_id, navigate])
    // console.log(post?.data?.data?.videoFile);
  return post ? (
    <div>
        <video controls>
            <source src={post?.data?.data?.videoFile}  type='video/mp4' />
        </video>
    </div>
  ) : null
}

export default SingleVideo