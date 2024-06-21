import React, { useEffect, useState } from "react";
import { httpGetAllLikes, httpLikeVideo } from "../hooks/userRequest.js";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiSolidHeart, BiHeart } from "react-icons/bi";

const LikeButton = ({ par }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
// console.log(par);
  const handleClick = (par) => {
    console.log(par);
    httpLikeVideo(par)
    .then((data) => console.log(data))
      .then(() => setLiked(!liked))

      httpGetAllLikes(par).then((data) => {
        if (data) setLikes(data?.data?.data);
        console.log(data);
      })
      .catch((err) => console.error(err))
  };


  return liked ? (
    <>
      <BiHeart color="blue" size="50" onClick={() => handleClick(par)} />;
        <span>{likes}</span>
    </>
  ) : (
    <>
      <BiSolidHeart
        color="red"
        size="50"
        onClick={() => handleClick(par)}
      />
      <span>{likes}</span>
    </>
  );
};

export default LikeButton;
