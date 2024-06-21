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

export default PostCard;
