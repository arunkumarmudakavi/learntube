import React, { useEffect, useState } from "react";
import {
  httpGetProfile,
  httpGetHistory,
  httpRemoveFromHistory,
} from "../../../hooks/userRequest.js";
import { Button, HistoryPostCard } from "../../index.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [details, setDetails] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const userStatus = useSelector((state) => state.userAuth?.status);
  const channelStatus = useSelector((state) => state.channelAuth?.status);

  useEffect(() => {
    if (userStatus) {
      httpGetProfile()
        .then((res) => setDetails(res?.data))
        .catch((err) => console.error(err));

      httpGetHistory()
        .then((res) => {
          setHistory(res?.data);
          console.log(res?.data);
        })
        .catch((err) => console.error(err));
    }
  }, [history]);

  const removeHistory = () => {
    httpRemoveFromHistory()
      .then(() => {
        setHistory([])
        navigate("/profile")
      })
      .catch((err) => console.error(err));
  };

  const changePassword = () => {
    navigate("/changePassword");
  };

  return (
    <section className="flex justify-evenly h-lvh bg-zinc-800 text-white">
      <section className="flex-col flex p-6 m-6 w-full rounded bg-zinc-700 border-opacity-25">
        <center className="text-4xl font-semibold mb-6">Profile</center>
        <label htmlFor="firstName" id="firstName" className="font-bold text-3xl">
          First Name:{" "}
        </label>
        <input
          className="bg-gray-200 text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.firstName}
          disabled
        />
        <label htmlFor="lastName" id="lastName" className="font-bold text-3xl">
          Last Name:{" "}
        </label>
        <input
          className="bg-gray-200 text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.lastName}
          disabled
        />
        <label htmlFor="email" id="email" className="font-bold text-3xl">
          Email:{" "}
        </label>
        <input
          className="bg-gray-200 text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.email}
          disabled
        />
        <label htmlFor="mobileNumber" id="mobileNumber" className="font-bold text-3xl">
          Mobile Number:{" "}
        </label>
        <input
          className="bg-gray-200  text-black p-3 mb-6 rounded font-semibold text-2xl"
          type="text"
          value={details?.data?.mobileNumber}
          disabled
        />
        <Button
        className="text-white bg-slate-400 w-60 h-16 font-semibold text-2xl rounded-md"
          onClick={() => changePassword()}
          type="submit"
          children="change password"
        />
      </section>
      <span className=" border-r-2 border-opacity-25 border-slate-400"></span>
      { history?.data?.length === 0 ? (
        <section className="w-full p-6">
          <center className="text-4xl font-semibold">History</center>
          <section className="bg-gray-200 m-6 p-6 text-black rounded-sm">No History!</section>
        </section>
      ) : (
        <section className="w-full p-6 ">
          <center className="text-4xl font-semibold">History</center>
          {history?.data?.length === 0 ? null : (
            <button className="ml-2 text-xl font-semibold" onClick={() => removeHistory()}>Remove All</button>
          )}
          {history?.data?.map((post) => (
            <div
              className="py-2 rounded m-2 bg-zinc-700"
              key={post?._id}
            >
              <HistoryPostCard {...post} />
            </div>
          ))}
        </section>
      )}
    </section>
  );
};

export default Profile;
