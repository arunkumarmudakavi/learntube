import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  httpGetSingleVideo,
  httpLikeVideo,
  httpCommentVideo,
  httpGetAllLikes,
  httpStoreHistory,
  httpGetAllCommentsOnVideo,
} from "../hooks/userRequest.js";
import ReactPlayer from "react-player";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import LikeButton from "./LikeButton.jsx";
import { useForm } from "react-hook-form";
import { Input, Button, CommentPostCard, TextArea } from "../components/index.js";
import { useSelector } from "react-redux";

const SingleVideo = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const { _id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const userName = useSelector(
    (state) => state.userAuth?.userData?.data?.data?.userName
  );
  const userId = useSelector(
    (state) => state.userAuth?.userData?.data?.data?._id
  );
  // console.log(userName);

  const [click, setClick] = useState(false);

  function likeButtonClick({ _id }) {
    httpLikeVideo({ _id })
      // .then(() => setClick(true))
      .then((data) => console.log(data));
  }

  useEffect(() => {
    httpGetSingleVideo({ _id }).then((data) => {
      if (data) setPost(data);
    });
  }, [_id, navigate]);

  useEffect(() => {
    httpStoreHistory({ _id }).catch((err) => console.error(err));
    httpGetAllCommentsOnVideo({ _id })
    .then((data) => setComments(data?.data))
    .catch((err) => console.error(err));
  }, []);

  // console.log(comments);

  const submitComment = async (data) => {
    try {
      // console.log({...data});
      const response = await httpCommentVideo(data);
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
    <div className="  mx-48 my-4">
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
      <span className="text-4xl ml-2 font-bold">Comments</span>
      <form
        className="flex flex-col my-4"
        onSubmit={handleSubmit((data) => {
          data.videoId = _id
          submitComment(data);
        })}
      >
        <TextArea
          className="p-4 rounded-md font-bold mb-3 w-full textarea-lg border-2"
          type="textArea"
          placeholder="Add Comments..."
          {...register("content", { required: true })}
        />
        <Button className="" type="submit" children="Add" />
      </form>
      <section>
      {comments?.data?.map((comment) => (
            <div className="mb-2" key={comment?._id}>
              <CommentPostCard {...comment}/>
            </div>
          ))}
        
      </section>
    </div>
  ) : null;
};

export default SingleVideo;
