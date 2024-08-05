import React, { useEffect, useState } from 'react'
import { httpGetVideos } from '../../../hooks/userRequest'
import { useSelector } from 'react-redux';
import Container from '../../container/Container';
import {PostCard} from "../../index.js";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    
    const userAuth = useSelector((state) => state.userAuth.status);
    // console.log(userAuth);

    
  useEffect(() => {
    httpGetVideos()
    .then((posts) => {
        if(posts) setPosts(posts);
    })
  }, []);

  if(!userAuth) {
    return navigate("/login")
  }
  

  return <div className="">
    <div className='grid grid-cols-4 mx-8'>
        {
            posts?.data?.data?.map((post) => (
                <div className='mx-6 my-4 text-white' key={post?._id}>
                    <PostCard { ...post}/>
                </div>
            ))
        }
    </div>
  </div>
}

export default Home