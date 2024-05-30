import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = ({_id, title, thumbnail}) => {
  return (
    <Link to={`/videos/${_id}`}>
        <img src={thumbnail} alt={title} />
        <h2>{title}</h2>
    </Link>
  )
}

export default PostCard