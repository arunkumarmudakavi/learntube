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

  if(userAuth != true) {
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