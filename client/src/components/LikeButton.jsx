import React, { useEffect, useState } from "react";
import { httpGetAllLikes, httpLikeVideo } from "../hooks/userRequest.js";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BiSolidHeart, BiHeart } from "react-icons/bi";

const LikeButton = ({ par, userId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
// console.log(userId);

  useEffect(() => {
    httpGetAllLikes(par).then((data) => {
      const arrayLength = data?.data?.data.length;
      const listOfData = data?.data?.data;
      // console.log(listOfData);

      const userStatus = listOfData.find((data) => data?.likedBy === userId)
      // console.log(userStatus !== undefined)

      // console.log(arrayLength);
      if(userStatus !== undefined){
        setLiked(true)
      }else {
        setLiked(false)
      }
      setLikes(arrayLength)
      

      // if (data) setLikes(data?.data?.data);
    })
    .catch((err) => console.error(err))
  }, [])

  const handleClick = (par) => {
    // console.log(par);
    httpLikeVideo(par)
    .then((data) => {
      if (!(data?.data?.data)) {
        setLiked(false)
        setLikes(likes-1)
      }else{
        setLiked(true)
        setLikes(likes+1)
      }
      
      // console.log(data?.data?.data)
    })
      
  };


  return liked ? (
    <>
      <BiSolidHeart
        color="red"
        size="50"
        onClick={() => handleClick(par)}
      />
      <span>{likes}</span>
    </>
    
  ) : (
    <>
      <BiHeart color="blue" size="50" onClick={() => handleClick(par)} />
        <span>{likes}</span>
    </>
  );
};

export default LikeButton
