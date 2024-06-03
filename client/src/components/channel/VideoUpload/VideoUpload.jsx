import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Input,Button} from '../../index.js'
import {httpUploadVideo} from '../../../hooks/channelRequest.js'

const VideoUpload = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const response = useSelector((state) => state.channelAuth.status);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState([]);
  const [thumb, setThumb] = useState([]);
  const [loader, setLoader] = useState(false)

  const upload = async (e) => {
    // console.log(data);
    e.preventDefault();
    setError("");
    setLoader(true)
    try {
      let formData = new FormData();
      for (let key in video) {
        formData.append("videoFile", video[key]);
      }

      for (let key1 in thumb) {
        formData.append("thumbnail", thumb[key1]);
      }

      formData.append("title", title);
      formData.append("description", desc);

        const res = await httpUploadVideo(formData);
        // if (userData) dispatch(userLogin(userData));
        // console.log(res);
        if(res) navigate("/channel-home")
      // console.log(userData);
    } catch (error) {
      setError(error.message);
      // console.log("login error: ", error);
    }
  };
  
  return !loader ? (
    <div>
      <form
        onSubmit={upload}
        className="flex flex-col items-center"
      >
        <center className="text-5xl mb-4">Upload Video</center>
        <div className="flex flex-col justify-center">
        <div className="pl-2">Upload Video</div>
        <Input
          type="file"
          placeholder="Select video"
          name="videoFile"
          onChange={(e) => {
            setVideo(e.target.files)
          }}
          // {...register("videoFile", {
          //   required: true,
          //   //validate: {matchPatern: () =>}
          // })}
        />
        <div className="pl-2">Upload Image</div>
        <Input
          type="file"
          placeholder="Choose thumbnail"
          accept="image/png, image/jpeg"
          name="thumbnail"
          onChange={(e) => {
            setThumb(e.target.files)
          }}
          // {...register("thumbnail", {
          //   required: true,
          //   //validate: {matchPatern: () =>}
          // })}
        />
        <div className="pl-2">Enter Title</div>
        <Input
          type="text"
          placeholder="Enter Title"
          name="title"
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          // {...register("title", {
          //   required: true,
          //   //validate: {matchPatern: () =>}
          // })}
        />
        <div className="pl-2">Enter Description</div>
        <Input
          type="text"
          placeholder="Enter Description"
          name="description"
          onChange={(e) => {
            setDesc(e.target.value)
          }}
          // {...register("description", {
          //   required: true,
          //   //validate: {matchPatern: () =>}
          // })}
        />
        </div>
        <Button type="submit" children="upload" />
        {/* <Button children="Sign In" /> */}
      </form>
    </div>
  ) : <p>Loading...</p>
}

export default VideoUpload