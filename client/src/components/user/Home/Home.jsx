import React, { useEffect, useState } from 'react'
import { httpGetVideos } from '../../../hooks/userRequest'
import { useSelector } from 'react-redux';
import Container from '../../container/Container';
import {PostCard} from "../../index.js";

const Home = () => {
    const [posts, setPosts] = useState([]);
    
    const userAuth = useSelector((state) => state.userAuth.status);
    // console.log(userAuth);

    
  useEffect(() => {
    httpGetVideos()
    .then((posts) => {
        if(posts) setPosts(posts);
    })
  }, []);

  if(!userAuth) {
    return <div className="flex min-h-96 justify-center items-center">
    <section className='font-bold italic text-5xl'>Login to get videos</section>
  </div>
  }
  

  return <div className="bg-zinc-800">
    <div className='grid grid-cols-4 mx-8'>
        {
          // console.log(posts)
          // <p>{posts}</p>
            posts?.data?.data?.map((post) => (
                <div className='mx-6 my-4 text-white' key={post?._id}>
                    <PostCard {...post}/>
                </div>
            ))
        }
    </div>
  </div>
}

export default Home