import React, { useState } from "react";
// import { useLocation } from 'react-router-dom'
// import {searchedItem} from "./user/Header/Header"
import { httpSearchVideo } from "../hooks/userRequest.js";
import { httpSearchVideoFromChannel } from "../hooks/channelRequest.js"
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Input } from "./Input";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const channelStatus = useSelector((state) => state.channelAuth?.status);
  const userStatus = useSelector((state) => state.userAuth?.status);
  const { register, handleSubmit, reset } = useForm();
  const [info, setInfo] = useState([]);
  console.log(info);

  const searchVideo = async (data) => {
    try {
      if (userStatus) {
        httpSearchVideo(data)
          .then((response) => {
            console.log(response);
            setInfo(response);
          })
          .catch((err) => console.error(err));
      }

      if (channelStatus) {
        httpSearchVideoFromChannel(data)
          .then((response) => {
            console.log(response);
            setInfo(response);
          })
          .catch((err) => console.error(err));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center mt-8">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            searchVideo(data);
            reset();
          })}
        >
          <Input
            type="text"
            placeholder="Search here..."
            className="text-black font-bold text-3xl inline w-[40rem] h-[4rem] rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            {...register("content", { required: true })}
          ></Input>
          <button className="primary-background-color text-white w-[8rem] h-[4rem] text-2xl font-bold px-3 py-1 rounded-md ml-4">
            Search
          </button>
        </form>
      </div>
      <div className="flex flex-col">
        {info?.data?.data.map((i) => {
          return (
            <section className="flex justify-center mt-6">
              <section key={i?._id}>
                <Link to={`/videos/${i?._id}`}>
                  <img
                    src={i?.thumbnail}
                    className="w-[40vw] rounded-md"
                    alt="thumbnail"
                  />
                  <span className="text-3xl font-bold">{i?.title}</span>
                </Link>
              </section>
            </section>
          );
        })}
      </div>
    </>
  );
};

export { SearchResult };
