import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Input, Button } from "../../index.js";
import { httpUploadVideo } from "../../../hooks/channelRequest.js";

const VideoUpload = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const response = useSelector((state) => state.channelAuth.status);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [video, setVideo] = useState([]);
  const [thumb, setThumb] = useState([]);
  const [loader, setLoader] = useState(false);

  const upload = async (e) => {
    // console.log(data);
    e.preventDefault();
    setError("");
    setLoader(true);
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
      if (res) navigate("/channel-home");
      // console.log(userData);
    } catch (error) {
      setError(error.message);
      // console.log("login error: ", error);
    }
  };

  return !loader ? (
    <div className="flex flex-col min-h-96 m-16 rounded justify-center items-center bg-indigo-500">
      <span className="text-6xl my-10 font-semibold">Upload Video</span>
      <form onSubmit={upload} className="flex flex-col mb-4">
        <div className="flex flex-col justify-center">
          <div className="font-semibold text-2xl">Upload Video</div>
          <Input
            className="p-4 rounded-md font-bold mb-3 w-96 bg-white"
            type="file"
            placeholder="Select video"
            name="videoFile"
            onChange={(e) => {
              setVideo(e.target.files);
            }}
            // {...register("videoFile", {
            //   required: true,
            //   //validate: {matchPatern: () =>}
            // })}
          />
          <div className="font-semibold text-2xl">Upload Image</div>
          <Input
            className="p-4 rounded-md font-bold mb-3 w-96 bg-white"
            type="file"
            placeholder="Choose thumbnail"
            accept="image/png, image/jpeg"
            name="thumbnail"
            onChange={(e) => {
              setThumb(e.target.files);
            }}
            // {...register("thumbnail", {
            //   required: true,
            //   //validate: {matchPatern: () =>}
            // })}
          />
          <div className="font-semibold text-2xl">Enter Title</div>
          <Input
            className="p-4 rounded-md font-bold mb-3 w-96"
            type="text"
            placeholder="Enter Title"
            name="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            // {...register("title", {
            //   required: true,
            //   //validate: {matchPatern: () =>}
            // })}
          />
          <div className="font-semibold text-2xl">Enter Description</div>
          <Input
            className="p-4 rounded-md font-bold mb-3 w-96"
            type="text"
            placeholder="Enter Description"
            name="description"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
            // {...register("description", {
            //   required: true,
            //   //validate: {matchPatern: () =>}
            // })}
          />
        </div>
        <Button
          className="border-white w-96 border-2 rounded p-2 mt-3 mb-6 text-xl font-bold text-white"
          type="submit"
          children="upload"
        />
        {/* <Button children="Sign In" /> */}
      </form>
    </div>
  ) : (
    // <p>Loading...</p>
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

export default VideoUpload;
