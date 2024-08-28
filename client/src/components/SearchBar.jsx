import React, { useState } from "react";
import { Input } from "./Input";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { httpSearchVideo } from "../hooks/userRequest";
import { useSelector } from "react-redux";

const SearchBar = () => {
  const { register, handleSubmit, reset } = useForm();
  const [searchedItem, setSearchedItem] = useState();

  const channelStatus = useSelector((state) => state.channelAuth?.status);
  const userStatus = useSelector((state) => state.userAuth?.status);

  const searchVideo = async(data) => {
    try {
        if (userStatus) {
            httpSearchVideo(data)
            .then((response) => {
                console.log(response?.data?.data)
                setSearchedItem(response?.data?.data)
            })
            .catch((err) => console.error(err))
        }

        if (channelStatus) {
            
        }
    } catch (error) {
        
    }
  }
  return (
    <div className="flex mr-4">
      <form 
      onSubmit={handleSubmit((data) => {
        console.log(data)
        searchVideo(data);
        reset();
      })}
      >
      <Input
        type="text"
        placeholder="Search here..."
        className="text-black font-bold text-2xl inline w-[30rem] rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        {...register("content", {required: true})}
      ></Input>
      <button className="bg-white primary-color w-[5rem] h-[3rem] font-bold px-3 py-1 rounded-md ml-4">
        Search
      </button>
      </form>
    </div>
  );
};

export { SearchBar };
