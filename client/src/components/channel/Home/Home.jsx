import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { httpGetVideos } from '../../../hooks/userRequest.js';
import Container from '../../container/Container.jsx';
import {PostCard} from '../../index.js'

const Home = () => {
  const [posts, setPosts] = useState([]);
    const channelAuth = useSelector((state) => state.channelAuth.status);
    // console.log(channelAuth);

    
  useEffect(() => {
    httpGetVideos()
    .then((posts) => {
        if(posts) setPosts(posts);
    })
  }, []);

  if(channelAuth != true) {
    return <div>
    <Container>Login to get videos</Container>
  </div>
  }
  

  return <div>
    <Container>
        {
          // console.log(posts)
          // <p>{posts}</p>
            posts?.data?.data?.map((post) => (
                <div key={post?._id}>
                    <PostCard {...post}/>
                </div>
            ))
        }
    </Container>
  </div>
}

export default Home