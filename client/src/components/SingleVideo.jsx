import React, { useEffect, useRef, useState } from "react";
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
import LikeButton from "./LikeButton.jsx";
import { useForm } from "react-hook-form";
import { Button, CommentPostCard, TextArea } from "../components/index.js";
import { useSelector } from "react-redux";
import {
  httpGetChannelSingleVideo,
  httpGetAllCommentsFromChannel,
  httpCommentVideoFromChannel,
} from "../hooks/channelRequest.js";

const SingleVideo = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [textArea, setTextArea] = useState('');
  const { _id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const inputRef = useRef(null)

  const channelStatus = useSelector((state) => state.channelAuth?.status);

  // console.log(channelState);
  const userStatus = useSelector((state) => state.userAuth?.status);
  const userId = useSelector((state) => state?.userAuth?.userData?.data?.data?._id);
  // console.log(userId);

  // const [click, setClick] = useState(false);


  useEffect(() => {
    // console.log({_id});
    if (userStatus) {
      httpGetSingleVideo({ _id })
        .then((data) => {
          // console.log(data)
          if (data) setPost(data);
        })
        .catch((error) => console.error(error));
    }

    if (channelStatus) {
      // console.log({_id});
      httpGetChannelSingleVideo({ _id })
        .then((data) => {
          // console.log(data)
          if (data) setPost(data);
        })
        .catch((error) => console.error(error));
    }
  }, [_id, navigate]);

  useEffect(() => {
    if (userStatus) {
      httpStoreHistory({ _id }).catch((err) => console.error(err));
    }
  }, [])

  useEffect(() => {
    if (userStatus) {
      httpGetAllCommentsOnVideo({ _id })
        .then((data) => {
          
          setComments(data?.data?.data)
          // console.log(comments?.data)
        })
        .catch((err) => console.error(err));
    }

    // if (channelStatus) {
    //   console.log({ _id });
    //   httpGetAllCommentsFromChannel({ _id })
    //     .then((data) => {
    //       console.log(data);
    //       setComments(data?.data);
    //     })
    //     .catch((err) => console.error(err));
    // }
    
  }, []);



  
// console.log('comments', comments);
  const submitComment = async (data) => {
    try {
      if (userStatus) {
        httpCommentVideo(data)
        .then((response) => {
          console.log(response);
          setComments((prevState) => [...prevState, response?.data?.data])
          // setComments(data?.data)
          setTextArea("")
          
        })
        .catch((err) => console.error(err));
      }
      // console.log(comments);

      if (channelStatus) {
        httpCommentVideoFromChannel(data)
        .then((response) => {
          setComments((prevState) => [...prevState, response?.data?.data])
          
        })
        .catch((err) => console.error(err));
      }
    } catch (error) {
      // setError(error.message);
      console.log(error);
    }
  };

  return post ? (
    <div className="secondary-background-color text-white px-48 py-4">
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

          <LikeButton  par={_id} userId={userId}/>
        </section>
      </div>
      <span className="text-4xl ml-2 font-bold">Comments</span>
      <form
        className="flex flex-col my-4"
        onSubmit={handleSubmit((data) => {
          data.videoId = _id;
          submitComment(data)
          
          reset();
        })}
      >
        <TextArea
          className="p-4 text-black rounded-md font-bold mb-3 w-full text-2xl textarea-lg"
          type="textArea"
          placeholder="Add Comments..."
          {...register("content", { required: true })}
        />
        <Button
          className="text-black font-bold bg-slate-400 w-40 h-10 rounded-md text-xl"
          type="submit"
          children="Add"
        />
      </form>
      <section>
        {comments?.map((comment) => (
          <div className="mb-2" key={comment?._id}>
            <CommentPostCard {...comment} />
          </div>
        ))}
      </section>
    </div>
  ) : (
    <div
      id="loading-overlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60"
    >
      <svg
        class="animate-spin h-8 w-8 text-white mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <span class="text-white text-3xl font-bold">Loading...</span>
    </div>
  );
};

export default SingleVideo;
