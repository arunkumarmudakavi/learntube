import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { httpGetOwnVideos } from "../../../hooks/channelRequest.js";
import Container from "../../container/Container.jsx";
import { PostCard } from "../../index.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const channelAuth = useSelector((state) => state.channelAuth.status);
  // console.log(channelAuth);

  useEffect(() => {
    httpGetOwnVideos().then((posts) => {
      if (posts) setPosts(posts);
    });
  }, []);

  if (!channelAuth) {
    return (
      <div>
        <Container>Login to get videos</Container>
      </div>
    );
  }

  return (
    <div className="">
      <div className="grid grid-cols-4 mx-8">
        {posts?.data?.data?.map((post) => (
          <div className="mx-6 my-4 text-white" key={post?._id}>
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
