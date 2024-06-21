import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGetSingleVideo, httpLikeVideo, httpCommentVideo, httpGetAllLikes } from "../hooks/userRequest.js";
import ReactPlayer from "react-player";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import LikeButton from "./LikeButton.jsx";
import { useForm } from "react-hook-form";
import { Input, Button } from "../components/index.js"
import { useSelector } from "react-redux";

const SingleVideo = () => {
  const [post, setPost] = useState();
  const { _id } = useParams();
  const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const userName = useSelector((state) => state.userAuth?.userData?.data?.data?.userName)
  const userId = useSelector((state) => state.userAuth?.userData?.data?.data?._id)
  // console.log(userName);

  
  const [click, setClick] = useState(false);
  
    function likeButtonClick({_id}) {
      httpLikeVideo({ _id })
      // .then(() => setClick(true))
      .then((data) => console.log(data))
    }

  useEffect(() => {
    httpGetSingleVideo({ _id }).then((data) => {
      if (data) setPost(data);
    });

    
  }, [_id, navigate]);

  // console.log(likes);

  const submitComment = async ({...data}) => {
    try {
      // console.log({...data});
      const response = await httpCommentVideo({...data});
      // console.log(response);
      // if (response?.data?.success) {
      //   navigate("/login");
      // }
    } catch (error) {
      // setError(error.message);
      console.log(error);
    }
  };

  return post ? (
    <div className="">
      <div className="p-8 ">
        <ReactPlayer
          className=""
          width="100%"
          height="38rem"
          url={post?.data?.data?.videoFile}
          controls={true}
        />
        <section>
          <section className="font-semibold text-5xl">
            {post?.data?.data?.title}
          </section>
          <section className="font-semibold text-3xl">
            {post?.data?.data?.description}
          </section>
          {/* <button onClick={() => likeButtonClick({_id}) }>Like</button> */}

          <LikeButton par={_id} />
        </section>
      </div>
      <form
        className="flex flex-col mb-4"
        onSubmit={handleSubmit((data) => {
          data.userName = userName
          data.commentedBy = userId
          data.videoId = _id
          submitComment(data)
        })}
      >
        <Input
          className="p-4 rounded-md font-bold mb-3 w-96"
          type="multitext"
          placeholder="Add Comments..."
          {...register("content", { required: true })}
        />
        <Button
          type="submit"
          children="Add"
        />
      </form>
    </div>
  ) : null;
};

export default SingleVideo;
