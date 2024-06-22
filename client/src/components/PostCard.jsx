import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ _id, title, thumbnail, description }) => {
  return (
    <Link to={`/videos/${_id}`}>
      <section className="border-red-3 border-2 p-4 rounded">
        <img className='h-96' src={thumbnail} alt={title} />
        <section className="flex-col flex text-ellipsis font-semibold">
          <span>{title}</span>
          <span>{description}</span>
          {/* <span>{owner}</span> */}
        </section>
      </section>
    </Link>
  );
};

const HistoryPostCard = ({ ...post }) => {
  // console.log(post?.result[0]?.title);
  return (
    <Link to={`/videos/${post?.result[0]?.videoFile}`}>
      <section className="flex">
        <img className='pl-4 rounded w-44 mr-5' src={post?.result[0]?.thumbnail} alt={post?.result[0]?.title} />
        <section className="font-semibold text-2xl">
          <span className="text-ellipsis">{post?.result[0]?.title}</span>
          {/* <span>{owner}</span> */}
        </section>
       </section>
    </Link>
  );
};

export  {PostCard, HistoryPostCard};
